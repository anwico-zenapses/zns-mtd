/**
 * Update Checker
 * Verifica actualizaciones disponibles del método AWC ZNS-MTD
 */

const semver = require('semver');
const versionManager = require('./version-manager');

class UpdateChecker {
  constructor() {
    this.currentVersion = versionManager.getCurrentVersion();
    this.updateCheckInterval = 24 * 60 * 60 * 1000; // 24 horas
  }

  /**
   * Verifica si hay actualizaciones disponibles
   * @param {object} options - Opciones de verificación
   */
  async checkForUpdates(options = {}) {
    const { registry = 'https://registry.npmjs.org', timeout = 5000 } = options;

    try {
      // En producción, esto consultaría el registro de npm
      // Por ahora, simulamos la verificación
      const latestVersion = await this.fetchLatestVersion(registry, timeout);

      if (!latestVersion) {
        return {
          hasUpdate: false,
          currentVersion: this.currentVersion,
          latestVersion: this.currentVersion,
          updateAvailable: false,
          error: 'No se pudo obtener información de versión'
        };
      }

      const hasUpdate = semver.gt(latestVersion, this.currentVersion);
      const changeType = versionManager.getChangeType(this.currentVersion, latestVersion);

      return {
        hasUpdate,
        currentVersion: this.currentVersion,
        latestVersion,
        updateAvailable: hasUpdate,
        changeType,
        severity: this.getUpdateSeverity(changeType),
        releaseNotes: await this.getReleaseNotes(latestVersion)
      };
    } catch (error) {
      return {
        hasUpdate: false,
        currentVersion: this.currentVersion,
        latestVersion: this.currentVersion,
        updateAvailable: false,
        error: error.message
      };
    }
  }

  /**
   * Obtiene la última versión disponible
   * @private
   */
  async fetchLatestVersion(_registry, _timeout) {
    // Simulación - en producción haría fetch real al registro
    // const url = `${registry}/${versionManager.packageName}/latest`;

    // Por ahora retornamos la versión actual
    return this.currentVersion;
  }

  /**
   * Obtiene las notas de lanzamiento de una versión
   * @private
   */
  async getReleaseNotes(version) {
    // En producción, esto obtendría las notas reales del changelog o GitHub releases
    return {
      version,
      date: new Date().toISOString(),
      notes: 'Consulta CHANGELOG.md para detalles completos',
      breaking: [],
      features: [],
      fixes: []
    };
  }

  /**
   * Determina la severidad de la actualización
   * @private
   */
  getUpdateSeverity(changeType) {
    const severities = {
      major: 'critical', // Breaking changes
      minor: 'important', // New features
      patch: 'low', // Bug fixes
      none: 'none'
    };

    return severities[changeType] || 'none';
  }

  /**
   * Verifica si debe realizar check de actualización
   * @param {Date} lastCheck - Última vez que se verificó
   */
  shouldCheckForUpdates(lastCheck) {
    if (!lastCheck) {
      return true;
    }

    const now = new Date();
    const timeSinceLastCheck = now - new Date(lastCheck);

    return timeSinceLastCheck >= this.updateCheckInterval;
  }

  /**
   * Genera mensaje de actualización para el usuario
   */
  async generateUpdateMessage() {
    const updateInfo = await this.checkForUpdates();

    if (!updateInfo.hasUpdate) {
      return {
        hasMessage: false,
        message: '',
        type: 'info'
      };
    }

    const messages = {
      critical:
        `🚨 ACTUALIZACIÓN CRÍTICA DISPONIBLE: v${updateInfo.latestVersion}\n` +
        `   Versión actual: v${updateInfo.currentVersion}\n` +
        '   Esta actualización incluye cambios importantes (breaking changes).\n' +
        '   Actualiza con: npm install -g awc-zns-mtd@latest',

      important:
        `⚡ Nueva versión disponible: v${updateInfo.latestVersion}\n` +
        `   Versión actual: v${updateInfo.currentVersion}\n` +
        '   Incluye nuevas funcionalidades.\n' +
        '   Actualiza con: npm install -g awc-zns-mtd@latest',

      low:
        `💡 Actualización disponible: v${updateInfo.latestVersion}\n` +
        `   Versión actual: v${updateInfo.currentVersion}\n` +
        '   Incluye correcciones de bugs.\n' +
        '   Actualiza con: npm install -g awc-zns-mtd@latest'
    };

    return {
      hasMessage: true,
      message: messages[updateInfo.severity] || messages['low'],
      type: updateInfo.severity,
      updateInfo
    };
  }

  /**
   * Verifica compatibilidad antes de actualizar
   */
  async checkUpdateCompatibility(targetVersion) {
    const changeType = versionManager.getChangeType(this.currentVersion, targetVersion);

    const compatibility = {
      canUpdate: true,
      warnings: [],
      breaking: [],
      recommendations: []
    };

    // Verificar breaking changes en actualizaciones major
    if (changeType === 'major') {
      compatibility.warnings.push(
        'Esta es una actualización major que puede incluir breaking changes'
      );
      compatibility.recommendations.push(
        'Revisa el CHANGELOG.md antes de actualizar',
        'Considera hacer backup de tu configuración actual',
        'Prueba en un entorno de desarrollo primero'
      );
    }

    // Verificar compatibilidad de Node.js
    const requiredNode = versionManager.getVersionInfo().compatibility?.minimumNodeVersion;
    if (requiredNode) {
      compatibility.recommendations.push(`Asegúrate de tener Node.js ${requiredNode} o superior`);
    }

    return compatibility;
  }

  /**
   * Obtiene historial de versiones
   */
  async getVersionHistory() {
    // En producción, esto consultaría el registro real
    return {
      current: this.currentVersion,
      history: [
        {
          version: '1.0.0',
          date: '2026-01-07',
          type: 'major',
          notes: 'Lanzamiento inicial'
        }
      ],
      total: 1
    };
  }

  /**
   * Verifica si la versión actual está deprecada
   */
  async isVersionDeprecated() {
    const updateInfo = await this.checkForUpdates();

    if (!updateInfo.hasUpdate) {
      return false;
    }

    // Versión deprecada si hay 2+ major versions de diferencia
    const majorDiff = semver.major(updateInfo.latestVersion) - semver.major(this.currentVersion);

    return majorDiff >= 2;
  }
}

// Singleton instance
const updateChecker = new UpdateChecker();

module.exports = updateChecker;
module.exports.UpdateChecker = UpdateChecker;
