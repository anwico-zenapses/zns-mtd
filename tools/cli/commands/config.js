/**
 * Comando: config
 * Configurar preferencias del método ZNS-MTD
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { loadConfig, updateConfig } = require('../utils/file-utils');
const { displayLogo } = require('../utils/console-logger');

async function configCommand(options = {}) {
  const cwd = process.cwd();
  const awcDir = path.join(cwd, '.awc');

  displayLogo();

  // Verificar instalación
  if (!(await fs.pathExists(awcDir))) {
    console.log(chalk.red('\n❌ AWC ZNS-MTD no está instalado.'));
    console.log(chalk.yellow(`💡 Ejecuta primero ${chalk.green('awc install')}\n`));
    return;
  }

  const config = await loadConfig(awcDir);

  if (!config) {
    console.log(chalk.red('❌ Error al cargar configuración.\n'));
    return;
  }

  // Mostrar configuración actual
  if (options.show) {
    showConfig(config);
    return;
  }

  // Editar configuración
  if (options.edit) {
    await editConfig(awcDir, config);
    return;
  }

  // Por defecto, mostrar y preguntar si desea editar
  showConfig(config);

  const { shouldEdit } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldEdit',
      message: '¿Deseas editar la configuración?',
      default: false
    }
  ]);

  if (shouldEdit) {
    await editConfig(awcDir, config);
  }
}

function showConfig(config) {
  console.log(chalk.cyan('\n⚙️  Configuración Actual\n'));
  console.log(chalk.gray('─'.repeat(60)));
  console.log(`  Versión:                ${chalk.yellow(config.version || 'N/A')}`);
  console.log(`  Tipo de proyecto:       ${chalk.yellow(config.projectType || 'N/A')}`);
  console.log(`  Tamaño de equipo:       ${chalk.yellow(config.teamSize || 'N/A')}`);
  console.log(`  Nivel técnico:          ${chalk.yellow(config.skillLevel || 'N/A')}`);
  console.log(`  Nivel de detalle:       ${chalk.yellow(config.verbosity || 'N/A')}`);

  if (config.preferences) {
    console.log(chalk.cyan('\n  Preferencias:'));
    console.log(`    Idioma comunicación:  ${chalk.yellow(config.preferences.communication_language || 'Spanish')}`);
    console.log(`    Idioma documentos:    ${chalk.yellow(config.preferences.document_output_language || 'Spanish')}`);
    console.log(`    Idioma código:        ${chalk.yellow(config.preferences.code_language || 'English')}`);
  }

  console.log(chalk.gray('─'.repeat(60)));
  console.log();
}

async function editConfig(awcDir, config) {
  console.log(chalk.cyan('\n✏️  Editar Configuración\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'Tipo de proyecto:',
      default: config.projectType,
      choices: [
        { name: 'Web Application', value: 'web' },
        { name: 'API/Microservices', value: 'api' },
        { name: 'Mobile Application', value: 'mobile' },
        { name: 'Enterprise System', value: 'enterprise' },
        { name: 'Otro', value: 'other' }
      ]
    },
    {
      type: 'list',
      name: 'teamSize',
      message: 'Tamaño del equipo:',
      default: config.teamSize,
      choices: [
        { name: 'Individual', value: 'solo' },
        { name: 'Pequeño (2-5)', value: 'small' },
        { name: 'Mediano (6-15)', value: 'medium' },
        { name: 'Grande (16+)', value: 'large' }
      ]
    },
    {
      type: 'list',
      name: 'skillLevel',
      message: 'Nivel técnico del equipo:',
      default: config.skillLevel,
      choices: [
        { name: 'Junior', value: 'beginner' },
        { name: 'Intermedio', value: 'intermediate' },
        { name: 'Senior', value: 'advanced' }
      ]
    },
    {
      type: 'list',
      name: 'verbosity',
      message: 'Nivel de detalle en docs:',
      default: config.verbosity,
      choices: [
        { name: 'Mínimo', value: 'minimal' },
        { name: 'Normal', value: 'normal' },
        { name: 'Detallado', value: 'detailed' }
      ]
    }
  ]);

  // Actualizar configuración
  const updatedConfig = {
    ...config,
    ...answers,
    updatedAt: new Date().toISOString()
  };

  await updateConfig(awcDir, updatedConfig);

  console.log(chalk.green('\n✅ Configuración actualizada exitosamente\n'));
  showConfig(updatedConfig);
}

module.exports = { configCommand };
