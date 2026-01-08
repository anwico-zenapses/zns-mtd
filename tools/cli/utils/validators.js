/**
 * Utilidades de validación
 * Validadores para inputs del usuario y paths del filesystem
 */

const path = require('path');

/**
 * Valida un nombre de proyecto
 * @param {string} name - Nombre del proyecto
 * @returns {boolean} - true si es válido
 */
function validateProjectName(name) {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Verificar que no esté vacío
  if (trimmed.length === 0) {
    return false;
  }

  // Solo letras, números, guiones y guiones bajos
  const validPattern = /^[a-zA-Z0-9-_]+$/;
  if (!validPattern.test(trimmed)) {
    return false;
  }

  // Nombres reservados
  const reserved = [
    'node_modules',
    'package.json',
    'package-lock.json',
    '.git',
    '.awc',
    'test',
    'dist',
    'build'
  ];

  if (reserved.includes(trimmed.toLowerCase())) {
    return false;
  }

  // No debe contener path traversal
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) {
    return false;
  }

  return true;
}

/**
 * Valida que un path sea seguro
 * @param {string} filePath - Path a validar
 * @returns {boolean} - true si es seguro
 */
function validatePath(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    return false;
  }

  // Normalizar el path
  const normalized = path.normalize(filePath);

  // Detectar path traversal
  if (normalized.includes('..')) {
    return false;
  }

  // Paths del sistema prohibidos (lista básica)
  const forbiddenPaths = [
    '/etc',
    '/sys',
    '/proc',
    'C:\\Windows',
    'C:\\Program Files',
    '/usr/bin',
    '/usr/sbin'
  ];

  for (const forbidden of forbiddenPaths) {
    if (normalized.startsWith(forbidden)) {
      return false;
    }
  }

  return true;
}

/**
 * Sanitiza un path removiendo caracteres peligrosos
 * @param {string} filePath - Path a sanitizar
 * @returns {string} - Path sanitizado
 */
function sanitizePath(filePath) {
  if (!filePath) {
    return '';
  }

  let sanitized = filePath;

  // Normalizar separadores
  sanitized = sanitized.replace(/\\/g, '/');

  // Eliminar múltiples slashes
  sanitized = sanitized.replace(/\/+/g, '/');

  // Eliminar path traversal
  sanitized = sanitized.replace(/\.\.\//g, '');
  sanitized = sanitized.replace(/\.\//g, '');

  return path.normalize(sanitized);
}

/**
 * Valida opciones del comando
 * @param {Object} options - Opciones a validar
 * @param {Array<string>} required - Campos requeridos
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
function validateCommandOptions(options, required = []) {
  const errors = [];

  for (const field of required) {
    if (!options[field]) {
      errors.push(`Campo requerido: ${field}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateProjectName,
  validatePath,
  sanitizePath,
  validateCommandOptions
};
