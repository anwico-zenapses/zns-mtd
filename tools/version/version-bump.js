#!/usr/bin/env node

/**
 * Version Bump Script
 * Script para incrementar versión del proyecto AWC ZNS-MTD
 * 
 * Uso:
 *   node version-bump.js <major|minor|patch> [--message "mensaje"]
 */

const fs = require('fs-extra');
const path = require('path');
const versionManager = require('./version-manager');
const changelogManager = require('./changelog-manager');

async function bumpVersion() {
  // Parsear argumentos
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Uso: node version-bump.js <major|minor|patch> [--message "mensaje"]');
    process.exit(1);
  }

  const bumpType = args[0];
  const validTypes = ['major', 'minor', 'patch'];

  if (!validTypes.includes(bumpType)) {
    console.error(`❌ Tipo inválido: ${bumpType}`);
    console.error(`   Tipos válidos: ${validTypes.join(', ')}`);
    process.exit(1);
  }

  // Obtener mensaje personalizado si existe
  const messageIndex = args.indexOf('--message');
  const customMessage = messageIndex !== -1 ? args[messageIndex + 1] : null;

  try {
    console.log('🚀 Incrementando versión...\n');

    // Obtener versión actual
    const currentVersion = versionManager.getCurrentVersion();
    console.log(`   Versión actual: ${currentVersion}`);

    // Calcular nueva versión
    const newVersion = versionManager.incrementVersion(bumpType);
    console.log(`   Nueva versión:  ${newVersion}`);
    console.log(`   Tipo de cambio: ${bumpType}\n`);

    // Actualizar package.json
    const packageJsonPath = path.join(__dirname, '../../package.json');
    const packageJson = await fs.readJSON(packageJsonPath);
    packageJson.version = newVersion;
    await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
    console.log('✓ package.json actualizado');

    // Generar entrada de changelog
    const date = new Date().toISOString().split('T')[0];
    const changes = {
      added: [],
      changed: [`Versión incrementada de ${currentVersion} a ${newVersion}`],
      deprecated: [],
      removed: [],
      fixed: [],
      security: []
    };

    if (customMessage) {
      changes.added.push(customMessage);
    }

    await changelogManager.addVersion(newVersion, date, changes);
    console.log('✓ CHANGELOG.md actualizado');

    // Resumen
    console.log('\n✅ Versión incrementada exitosamente\n');
    console.log('📋 Próximos pasos:');
    console.log('   1. Revisa los cambios en CHANGELOG.md');
    console.log('   2. Commit: git add . && git commit -m "chore: bump version to ' + newVersion + '"');
    console.log('   3. Tag: git tag -a v' + newVersion + ' -m "Release v' + newVersion + '"');
    console.log('   4. Push: git push && git push --tags\n');

  } catch (error) {
    console.error('❌ Error al incrementar versión:', error.message);
    process.exit(1);
  }
}

// Ejecutar
bumpVersion();
