/**
 * Version Manager
 * Gestor central de versiones del sistema AWC ZNS-MTD
 */

const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const packageJson = require('../../package.json');

class VersionManager {
  constructor() {
    this.currentVersion = packageJson.version;
    this.packageName = packageJson.name;
  }

  /**
   * Obtiene la versión actual
   */
  getCurrentVersion() {
    return this.currentVersion;
  }

  /**
   * Obtiene información completa de la versión
   */
  getVersionInfo() {
    return {
      version: this.currentVersion,
      major: semver.major(this.currentVersion),
      minor: semver.minor(this.currentVersion),
      patch: semver.patch(this.currentVersion),
      name: this.packageName,
      description: packageJson.description,
      license: packageJson.license,
      author: packageJson.author
    };
  }

  /**
   * Compara versiones
   * @param {string} v1 - Primera versión
   * @param {string} v2 - Segunda versión
   * @returns {number} -1 si v1 < v2, 0 si iguales, 1 si v1 > v2
   */
  compareVersions(v1, v2) {
    if (!semver.valid(v1) || !semver.valid(v2)) {
      throw new Error('Versiones inválidas');
    }

    if (semver.lt(v1, v2)) return -1;
    if (semver.gt(v1, v2)) return 1;
    return 0;
  }

  /**
   * Verifica si una versión es compatible
   * @param {string} requiredVersion - Versión requerida (puede ser rango)
   * @param {string} currentVersion - Versión actual (opcional)
   */
  isCompatible(requiredVersion, currentVersion = null) {
    const version = currentVersion || this.currentVersion;

    try {
      return semver.satisfies(version, requiredVersion);
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el tipo de cambio entre dos versiones
   * @param {string} oldVersion - Versión anterior
   * @param {string} newVersion - Versión nueva
   * @returns {string} 'major' | 'minor' | 'patch' | 'none'
   */
  getChangeType(oldVersion, newVersion) {
    if (!semver.valid(oldVersion) || !semver.valid(newVersion)) {
      return 'none';
    }

    const diff = semver.diff(oldVersion, newVersion);

    if (diff === 'major' || diff === 'premajor') return 'major';
    if (diff === 'minor' || diff === 'preminor') return 'minor';
    if (diff === 'patch' || diff === 'prepatch') return 'patch';

    return 'none';
  }

  /**
   * Valida si una cadena es una versión válida
   */
  isValidVersion(version) {
    return semver.valid(version) !== null;
  }

  /**
   * Limpia una versión (remueve prefijos v, etc)
   */
  cleanVersion(version) {
    return semver.clean(version);
  }

  /**
   * Incrementa la versión
   * @param {string} type - Tipo: 'major', 'minor', 'patch'
   * @param {string} version - Versión base (opcional)
   */
  incrementVersion(type, version = null) {
    const baseVersion = version || this.currentVersion;

    if (!['major', 'minor', 'patch'].includes(type)) {
      throw new Error('Tipo de incremento inválido. Use: major, minor, patch');
    }

    return semver.inc(baseVersion, type);
  }

  /**
   * Obtiene la versión instalada en un proyecto
   * @param {string} projectPath - Ruta del proyecto
   */
  async getInstalledVersion(projectPath) {
    const awcDir = path.join(projectPath, '.awc');
    const configPath = path.join(awcDir, 'config.yaml');

    if (!(await fs.pathExists(configPath))) {
      return null;
    }

    try {
      const yaml = require('js-yaml');
      const content = await fs.readFile(configPath, 'utf8');
      const config = yaml.load(content);
      return config.version || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Actualiza la versión en un proyecto
   * @param {string} projectPath - Ruta del proyecto
   * @param {string} newVersion - Nueva versión
   */
  async updateProjectVersion(projectPath, newVersion) {
    const awcDir = path.join(projectPath, '.awc');
    const configPath = path.join(awcDir, 'config.yaml');

    if (!(await fs.pathExists(configPath))) {
      throw new Error('Proyecto AWC ZNS-MTD no encontrado');
    }

    try {
      const yaml = require('js-yaml');
      const content = await fs.readFile(configPath, 'utf8');
      const config = yaml.load(content);

      config.version = newVersion;
      config.updatedAt = new Date().toISOString();

      const yamlContent = yaml.dump(config, {
        indent: 2,
        lineWidth: 80,
        noRefs: true
      });

      await fs.writeFile(configPath, yamlContent, 'utf8');

      return true;
    } catch (error) {
      throw new Error(`Error al actualizar versión: ${error.message}`);
    }
  }

  /**
   * Verifica compatibilidad con versión mínima requerida
   */
  checkMinimumVersion(minimumVersion) {
    return semver.gte(this.currentVersion, minimumVersion);
  }

  /**
   * Obtiene el rango de versiones compatibles
   */
  getCompatibleRange() {
    const major = semver.major(this.currentVersion);
    return `^${major}.0.0`;
  }

  /**
   * Genera reporte de versión
   */
  generateVersionReport() {
    const info = this.getVersionInfo();

    return {
      current: info.version,
      breakdown: {
        major: info.major,
        minor: info.minor,
        patch: info.patch
      },
      compatibility: {
        range: this.getCompatibleRange(),
        minimumNodeVersion: packageJson.engines?.node || 'N/A',
        minimumNpmVersion: packageJson.engines?.npm || 'N/A'
      },
      metadata: {
        name: info.name,
        description: info.description,
        license: info.license,
        author: info.author
      }
    };
  }
}

// Singleton instance
const versionManager = new VersionManager();

module.exports = versionManager;
module.exports.VersionManager = VersionManager;
