/**
 * Changelog Manager
 * Gestor de changelog automático para AWC ZNS-MTD
 */

const fs = require('fs-extra');
const path = require('path');

class ChangelogManager {
  constructor(changelogPath = null) {
    this.changelogPath = changelogPath || path.join(__dirname, '../../CHANGELOG.md');
    this.changeTypes = {
      added: 'Añadido',
      changed: 'Cambiado',
      deprecated: 'Obsoleto',
      removed: 'Eliminado',
      fixed: 'Corregido',
      security: 'Seguridad'
    };
  }

  /**
   * Lee el contenido del changelog
   */
  async readChangelog() {
    if (!(await fs.pathExists(this.changelogPath))) {
      return null;
    }

    try {
      return await fs.readFile(this.changelogPath, 'utf8');
    } catch (error) {
      throw new Error(`Error al leer changelog: ${error.message}`);
    }
  }

  /**
   * Obtiene las notas de una versión específica
   */
  async getVersionNotes(version) {
    const content = await this.readChangelog();

    if (!content) {
      return null;
    }

    // Buscar sección de la versión
    const versionRegex = new RegExp(`## \\[${version}\\]([\\s\\S]*?)(?=## \\[|$)`, 'i');
    const match = content.match(versionRegex);

    if (!match) {
      return null;
    }

    return this.parseVersionSection(match[1]);
  }

  /**
   * Parsea una sección de versión del changelog
   * @private
   */
  parseVersionSection(section) {
    const parsed = {
      added: [],
      changed: [],
      deprecated: [],
      removed: [],
      fixed: [],
      security: []
    };

    // Buscar cada tipo de cambio
    Object.keys(this.changeTypes).forEach((type) => {
      const typeRegex = new RegExp(`### ${this.changeTypes[type]}([\\s\\S]*?)(?=###|$)`, 'i');
      const match = section.match(typeRegex);

      if (match) {
        // Extraer items (líneas que empiezan con -)
        const items = match[1].match(/^- (.+)$/gm) || [];
        parsed[type] = items.map((item) => item.replace(/^- /, '').trim());
      }
    });

    return parsed;
  }

  /**
   * Obtiene el último cambio registrado
   */
  async getLatestRelease() {
    const content = await this.readChangelog();

    if (!content) {
      return null;
    }

    // Buscar primera versión (ignorando Unreleased)
    const versionRegex = /## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})/;
    const match = content.match(versionRegex);

    if (!match) {
      return null;
    }

    const [, version, date] = match;
    const notes = await this.getVersionNotes(version);

    return {
      version,
      date,
      notes
    };
  }

  /**
   * Agrega una nueva versión al changelog
   */
  async addVersion(version, date, changes) {
    const content = await this.readChangelog();

    if (!content) {
      throw new Error('Changelog no encontrado');
    }

    // Generar sección de la nueva versión
    const versionSection = this.generateVersionSection(version, date, changes);

    // Insertar después de "## [Unreleased]"
    const unreleasedRegex = /(## \[Unreleased\][\s\S]*?)(?=## \[|$)/;
    const newContent = content.replace(unreleasedRegex, `$1\n${versionSection}\n`);

    await fs.writeFile(this.changelogPath, newContent, 'utf8');
  }

  /**
   * Genera sección de versión en formato markdown
   * @private
   */
  generateVersionSection(version, date, changes) {
    let section = `## [${version}] - ${date}\n\n`;

    // Agregar cada tipo de cambio si tiene items
    Object.keys(this.changeTypes).forEach((type) => {
      if (changes[type] && changes[type].length > 0) {
        section += `### ${this.changeTypes[type]}\n\n`;
        changes[type].forEach((item) => {
          section += `- ${item}\n`;
        });
        section += '\n';
      }
    });

    return section;
  }

  /**
   * Obtiene todos los cambios no liberados (Unreleased)
   */
  async getUnreleasedChanges() {
    const content = await this.readChangelog();

    if (!content) {
      return null;
    }

    const unreleasedRegex = /## \[Unreleased\]([\s\S]*?)(?=## \[|$)/;
    const match = content.match(unreleasedRegex);

    if (!match) {
      return null;
    }

    return this.parseVersionSection(match[1]);
  }

  /**
   * Verifica si hay cambios breaking en una versión
   */
  async hasBreakingChanges(version) {
    const notes = await this.getVersionNotes(version);

    if (!notes) {
      return false;
    }

    // Buscar indicadores de breaking changes
    const breakingIndicators = [
      'BREAKING CHANGE',
      'breaking change',
      'incompatible',
      'removed',
      'deprecated'
    ];

    const allChanges = Object.values(notes).flat().join(' ').toLowerCase();

    return breakingIndicators.some((indicator) => allChanges.includes(indicator.toLowerCase()));
  }

  /**
   * Genera resumen de cambios entre dos versiones
   */
  async getChangesSummary(fromVersion, toVersion) {
    const content = await this.readChangelog();

    if (!content) {
      return null;
    }

    const summary = {
      from: fromVersion,
      to: toVersion,
      changes: {
        added: [],
        changed: [],
        deprecated: [],
        removed: [],
        fixed: [],
        security: []
      },
      breakingChanges: false
    };

    // Parsear todas las versiones entre fromVersion y toVersion
    const versionRegex = /## \[(\d+\.\d+\.\d+)\]/g;
    const versions = [];
    let match;

    while ((match = versionRegex.exec(content)) !== null) {
      versions.push(match[1]);
    }

    // Filtrar versiones en el rango
    const fromIndex = versions.indexOf(fromVersion);
    const toIndex = versions.indexOf(toVersion);

    if (fromIndex === -1 || toIndex === -1) {
      return null;
    }

    const versionsInRange = versions.slice(toIndex, fromIndex);

    // Agregar cambios de cada versión
    for (const version of versionsInRange) {
      const notes = await this.getVersionNotes(version);

      if (notes) {
        Object.keys(notes).forEach((type) => {
          summary.changes[type].push(...notes[type]);
        });

        if (await this.hasBreakingChanges(version)) {
          summary.breakingChanges = true;
        }
      }
    }

    return summary;
  }

  /**
   * Valida formato del changelog
   */
  async validateChangelog() {
    const content = await this.readChangelog();

    if (!content) {
      return {
        valid: false,
        errors: ['Changelog no encontrado']
      };
    }

    const errors = [];

    // Verificar formato de versiones
    const versionRegex = /## \[\d+\.\d+\.\d+\] - \d{4}-\d{2}-\d{2}/g;
    if (!versionRegex.test(content)) {
      errors.push('Formato de versión inválido');
    }

    // Verificar sección Unreleased
    if (!content.includes('## [Unreleased]')) {
      errors.push('Falta sección [Unreleased]');
    }

    // Verificar tipos de cambio
    // No es obligatorio tener todas las secciones, solo verificar que las que existan sean válidas

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Singleton instance
const changelogManager = new ChangelogManager();

module.exports = changelogManager;
module.exports.ChangelogManager = ChangelogManager;
