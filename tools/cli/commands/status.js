/**
 * Comando: status
 * Muestra el estado actual del proyecto ZNS-MTD
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { loadConfig } = require('../utils/file-utils');
const { displayLogo } = require('../utils/console-logger');

async function statusCommand(options = {}) {
  const cwd = process.cwd();
  const awcDir = path.join(cwd, '.awc');
  const verbose = options.verbose || false;

  displayLogo();

  console.log(chalk.cyan('\n📊 Estado del Proyecto AWC ZNS-MTD\n'));

  // Verificar si está instalado
  if (!(await fs.pathExists(awcDir))) {
    console.log(chalk.red('❌ AWC ZNS-MTD no está instalado en este proyecto.'));
    console.log(chalk.yellow(`\n💡 Ejecuta ${chalk.green('zns install')} para comenzar.\n`));
    return;
  }

  // Cargar configuración
  const config = await loadConfig(awcDir);

  if (!config) {
    console.log(chalk.red('❌ Error al cargar configuración.'));
    return;
  }

  // Información básica
  console.log(chalk.cyan('🔧 Configuración:'));
  console.log(chalk.gray('─'.repeat(60)));
  console.log(`  Versión instalada:     ${chalk.yellow(config.version || 'N/A')}`);
  console.log(`  Instalado el:          ${chalk.yellow(config.installedAt ? new Date(config.installedAt).toLocaleString('es-ES') : 'N/A')}`);
  console.log(`  Tipo de proyecto:      ${chalk.yellow(config.projectType || 'N/A')}`);
  console.log(`  Tamaño de equipo:      ${chalk.yellow(config.teamSize || 'N/A')}`);
  console.log(`  Nivel técnico:         ${chalk.yellow(config.skillLevel || 'N/A')}`);
  console.log(chalk.gray('─'.repeat(60)));

  // Verificar estructura
  console.log(chalk.cyan('\n📁 Estructura:'));
  console.log(chalk.gray('─'.repeat(60)));

  const agentsPath = path.join(awcDir, 'agents');
  const workflowsPath = path.join(awcDir, 'workflows');
  const docsPath = path.join(cwd, 'docs');

  const agentsExist = await fs.pathExists(agentsPath);
  const workflowsExist = await fs.pathExists(workflowsPath);
  const docsExist = await fs.pathExists(docsPath);

  console.log(`  Agentes:    ${agentsExist ? chalk.green('✓') : chalk.red('✗')} ${agentsPath}`);
  console.log(`  Workflows:  ${workflowsExist ? chalk.green('✓') : chalk.red('✗')} ${workflowsPath}`);
  console.log(`  Docs:       ${docsExist ? chalk.green('✓') : chalk.red('✗')} ${docsPath}`);

  if (verbose) {
    // Contar agentes
    if (agentsExist) {
      const agentFiles = await fs.readdir(agentsPath);
      const yamlAgents = agentFiles.filter(f => f.endsWith('.yaml'));
      console.log(chalk.gray(`    → ${yamlAgents.length} agentes disponibles`));
    }

    // Contar workflows
    if (workflowsExist) {
      const workflowDirs = await fs.readdir(workflowsPath);
      console.log(chalk.gray(`    → ${workflowDirs.length} workflows disponibles`));
    }
  }

  console.log(chalk.gray('─'.repeat(60)));

  // Análisis de documentación
  if (docsExist) {
    console.log(chalk.cyan('\n📝 Documentación:'));
    console.log(chalk.gray('─'.repeat(60)));

    const adrPath = path.join(docsPath, 'adr');
    const storiesPath = path.join(docsPath, 'stories');
    const archPath = path.join(docsPath, 'architecture');

    if (await fs.pathExists(adrPath)) {
      const adrFiles = await fs.readdir(adrPath);
      console.log(`  ADRs:           ${chalk.yellow(adrFiles.length)} documentos`);
    }

    if (await fs.pathExists(storiesPath)) {
      const storyFiles = await fs.readdir(storiesPath);
      console.log(`  User Stories:   ${chalk.yellow(storyFiles.length)} historias`);
    }

    if (await fs.pathExists(archPath)) {
      const archFiles = await fs.readdir(archPath);
      console.log(`  Arquitectura:   ${chalk.yellow(archFiles.length)} documentos`);
    }

    console.log(chalk.gray('─'.repeat(60)));
  }

  // Estado general
  const allGood = agentsExist && workflowsExist && docsExist;

  console.log(chalk.cyan('\n✨ Estado General:'));
  console.log(chalk.gray('─'.repeat(60)));

  if (allGood) {
    console.log(chalk.green('  ✅ Sistema AWC ZNS-MTD funcionando correctamente'));
  } else {
    console.log(chalk.yellow('  ⚠️  Algunos componentes están faltando'));
    console.log(chalk.gray(`     Ejecuta ${chalk.green('zns install --force')} para reparar`));
  }

  console.log(chalk.gray('─'.repeat(60)));

  // Comandos sugeridos
  console.log(chalk.cyan('\n💡 Comandos útiles:\n'));
  console.log(`  ${chalk.green('zns init')}       - Analizar proyecto y recomendar workflow`);
  console.log(`  ${chalk.green('zns config')}     - Configurar preferencias`);
  console.log(`  ${chalk.green('zns validate')}   - Validar estructura del proyecto\n`);
}

module.exports = { statusCommand };
