/**
 * ConfigManager - Gestión centralizada de configuración
 * Centraliza paths, constantes y configuración del framework
 */

const path = require('path');
const os = require('os');

class ConfigManager {
  /**
   * Directorios principales
   */
  static get AWC_DIR() {
    return '.zns-mtd';
  }

  static get AGENTS_DIR() {
    return path.join(this.AWC_DIR, 'agents');
  }

  static get WORKFLOWS_DIR() {
    return path.join(this.AWC_DIR, 'workflows');
  }

  static get TEMPLATES_DIR() {
    return path.join(this.AWC_DIR, 'templates');
  }

  static get RESOURCES_DIR() {
    return path.join(this.AWC_DIR, 'resources');
  }

  static get LOGS_DIR() {
    return path.join(this.AWC_DIR, 'logs');
  }

  static get CONFIG_FILE() {
    return path.join(this.AWC_DIR, 'config.yaml');
  }

  /**
   * Módulos del framework
   */
  static get CORE_MODULE_PATH() {
    return 'src/modules/awc-zns-mtd';
  }

  static get CUSTOM_MODULE_PATH() {
    return 'src/modules/custom-agents';
  }

  /**
   * Configuración de agentes
   */
  static get CORE_AGENTS() {
    return ['zen-master', 'architect-senior', 'developer-pro', 'qa-specialist'];
  }

  static get AGENT_CATEGORIES() {
    return [
      'core',
      'development',
      'qa_testing',
      'product_strategy',
      'support_maintenance',
      'frontend',
      'backend',
      'infrastructure',
      'architecture',
      'quality',
      'business',
      'ai',
      'documentation'
    ];
  }

  /**
   * Configuración de workflows
   */
  static get WORKFLOW_TYPES() {
    return [
      'quick',
      'standard',
      'enterprise',
      'comercial-flow',
      'inception-flow',
      'development-flow',
      'qa-flow',
      'deployment-flow',
      'support-flow'
    ];
  }

  /**
   * Tipos de proyecto
   */
  static get PROJECT_TYPES() {
    return ['code-audit', 'greenfield', 'migration', 'maintenance', 'mobile', 'api', 'enterprise'];
  }

  /**
   * Tecnologías soportadas
   */
  static get SUPPORTED_TECHNOLOGIES() {
    return [
      'java',
      'dotnet',
      'python',
      'php',
      'nodejs',
      'react',
      'angular',
      'vue',
      'react-native',
      'sql',
      'nosql'
    ];
  }

  /**
   * Configuración de logs
   */
  static get LOG_LEVELS() {
    return ['error', 'warn', 'info', 'debug', 'verbose'];
  }

  static get DEFAULT_LOG_LEVEL() {
    return process.env.LOG_LEVEL || 'info';
  }

  /**
   * Configuración de versiones
   */
  static get SEMVER_TYPES() {
    return ['major', 'minor', 'patch'];
  }

  /**
   * Límites y validaciones
   */
  static get MAX_PROJECT_NAME_LENGTH() {
    return 50;
  }

  static get MIN_PROJECT_NAME_LENGTH() {
    return 3;
  }

  static get RESERVED_NAMES() {
    return [
      'node_modules',
      'package.json',
      'package-lock.json',
      '.git',
      '.zns-mtd',
      'test',
      'dist',
      'build',
      'coverage'
    ];
  }

  /**
   * Paths del sistema
   */
  static get HOME_DIR() {
    return os.homedir();
  }

  static get TEMP_DIR() {
    return os.tmpdir();
  }

  /**
   * Obtiene la ruta completa a un directorio del proyecto
   * @param {string} cwd - Directorio actual
   * @param {string} subPath - Subdirectorio
   * @returns {string} - Path completo
   */
  static getProjectPath(cwd, subPath = '') {
    return path.join(cwd, this.AWC_DIR, subPath);
  }

  /**
   * Obtiene la ruta a los agentes del proyecto
   * @param {string} cwd - Directorio actual
   * @returns {string} - Path a agentes
   */
  static getAgentsPath(cwd) {
    return this.getProjectPath(cwd, 'agents');
  }

  /**
   * Obtiene la ruta a workflows del proyecto
   * @param {string} cwd - Directorio actual
   * @returns {string} - Path a workflows
   */
  static getWorkflowsPath(cwd) {
    return this.getProjectPath(cwd, 'workflows');
  }

  /**
   * Obtiene la configuración del entorno
   * @returns {Object} - Configuración de entorno
   */
  static getEnvironmentConfig() {
    return {
      nodeVersion: process.version,
      platform: os.platform(),
      arch: os.arch(),
      cwd: process.cwd(),
      env: process.env.NODE_ENV || 'development'
    };
  }

  /**
   * Valida la configuración del proyecto
   * @param {Object} config - Configuración a validar
   * @returns {Object} - { valid: boolean, errors: string[] }
   */
  static validateConfig(config) {
    const errors = [];

    if (!config.projectName) {
      errors.push('projectName es requerido');
    }

    if (!config.version) {
      errors.push('version es requerida');
    }

    if (config.workflow && !this.WORKFLOW_TYPES.includes(config.workflow)) {
      errors.push(`workflow inválido: ${config.workflow}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

module.exports = ConfigManager;
