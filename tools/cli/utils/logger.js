/**
 * Logger - Sistema de logging estructurado
 * Utiliza Winston para logging centralizado
 */

const winston = require('winston');
const path = require('path');
const fs = require('fs-extra');
const ConfigManager = require('../../config/config-manager');

// Asegurar que existe el directorio de logs
const logsDir = path.join(process.cwd(), ConfigManager.LOGS_DIR);
fs.ensureDirSync(logsDir);

/**
 * Formatos personalizados
 */
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
  })
);

/**
 * Crear logger
 */
const logger = winston.createLogger({
  level: ConfigManager.DEFAULT_LOG_LEVEL,
  format: customFormat,
  defaultMeta: { service: 'awc-zns-mtd' },
  transports: [
    // Logs de error
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),

    // Logs combinados
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5
    }),

    // Logs de comandos (solo info y superior)
    new winston.transports.File({
      filename: path.join(logsDir, 'commands.log'),
      level: 'info',
      maxsize: 5242880,
      maxFiles: 3
    })
  ],

  // Manejo de excepciones
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log')
    })
  ],

  // Manejo de rechazos de promesas
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log')
    })
  ]
});

// En desarrollo, también loguear a consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'debug'
    })
  );
}

/**
 * Wrapper para comandos CLI
 */
class CLILogger {
  /**
   * Log de inicio de comando
   * @param {string} command - Nombre del comando
   * @param {Object} options - Opciones del comando
   */
  static commandStart(command, options = {}) {
    logger.info('Command started', {
      command,
      options,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log de finalización de comando
   * @param {string} command - Nombre del comando
   * @param {boolean} success - Si fue exitoso
   * @param {number} duration - Duración en ms
   */
  static commandEnd(command, success = true, duration = 0) {
    const level = success ? 'info' : 'error';
    logger[level]('Command finished', {
      command,
      success,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log de error de comando
   * @param {string} command - Nombre del comando
   * @param {Error} error - Error ocurrido
   */
  static commandError(command, error) {
    logger.error('Command error', {
      command,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log de operación de archivo
   * @param {string} operation - Tipo de operación
   * @param {string} filePath - Path del archivo
   * @param {boolean} success - Si fue exitoso
   */
  static fileOperation(operation, filePath, success = true) {
    logger.info('File operation', {
      operation,
      filePath,
      success,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log de validación
   * @param {string} type - Tipo de validación
   * @param {boolean} valid - Si es válido
   * @param {Array<string>} errors - Errores encontrados
   */
  static validation(type, valid, errors = []) {
    const level = valid ? 'info' : 'warn';
    logger[level]('Validation', {
      type,
      valid,
      errors,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = {
  logger,
  CLILogger
};
