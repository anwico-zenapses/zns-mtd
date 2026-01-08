/**
 * Version Utilities
 * Utilidades para manejo de versiones y actualizaciones
 */

const semver = require('semver');
const packageJson = require('../../../package.json');

/**
 * Obtiene la versión actual del paquete
 */
function getVersion() {
  return packageJson.version;
}

/**
 * Verifica si hay actualizaciones disponibles
 * @param {string} currentVersion - Versión actual
 * @returns {Promise<{hasUpdate: boolean, latestVersion: string}>}
 */
async function checkForUpdates(currentVersion) {
  try {
    // En producción, esto consultaría el registro de npm
    // Por ahora, simulamos que no hay actualización
    const latestVersion = currentVersion;

    const hasUpdate = semver.gt(latestVersion, currentVersion);

    return {
      hasUpdate,
      latestVersion,
      currentVersion
    };
  } catch (error) {
    // Si falla la verificación (ej: sin internet), retornamos sin actualización
    return {
      hasUpdate: false,
      latestVersion: currentVersion,
      currentVersion,
      error: error.message
    };
  }
}

/**
 * Compara dos versiones
 * @returns {number} -1 si v1 < v2, 0 si v1 === v2, 1 si v1 > v2
 */
function compareVersions(v1, v2) {
  if (semver.lt(v1, v2)) return -1;
  if (semver.gt(v1, v2)) return 1;
  return 0;
}

/**
 * Valida si una versión es válida según semver
 */
function isValidVersion(version) {
  return semver.valid(version) !== null;
}

/**
 * Obtiene la versión mayor (major)
 */
function getMajorVersion(version) {
  return semver.major(version);
}

/**
 * Obtiene la versión menor (minor)
 */
function getMinorVersion(version) {
  return semver.minor(version);
}

/**
 * Obtiene la versión de parche (patch)
 */
function getPatchVersion(version) {
  return semver.patch(version);
}

/**
 * Verifica si la versión satisface un rango
 */
function satisfiesRange(version, range) {
  return semver.satisfies(version, range);
}

/**
 * Incrementa la versión
 * @param {string} version - Versión actual
 * @param {string} type - Tipo de incremento: 'major', 'minor', 'patch'
 */
function incrementVersion(version, type = 'patch') {
  return semver.inc(version, type);
}

/**
 * Obtiene información detallada de la versión
 */
function getVersionInfo() {
  const version = getVersion();

  return {
    version,
    major: getMajorVersion(version),
    minor: getMinorVersion(version),
    patch: getPatchVersion(version),
    name: packageJson.name,
    description: packageJson.description
  };
}

module.exports = {
  getVersion,
  checkForUpdates,
  compareVersions,
  isValidVersion,
  getMajorVersion,
  getMinorVersion,
  getPatchVersion,
  satisfiesRange,
  incrementVersion,
  getVersionInfo
};
