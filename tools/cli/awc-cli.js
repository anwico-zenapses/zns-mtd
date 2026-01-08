#!/usr/bin/env node

/**
 * AWC ZNS-MTD CLI
 * Interfaz de línea de comandos para el método AWC ZNS-MTD
 *
 * Comandos disponibles:
 * - awc install    : Instalar el método en el proyecto actual
 * - awc init       : Inicializar proyecto con ZNS-MTD
 * - awc status     : Ver estado actual del proyecto
 * - awc version    : Ver versión del método instalado
 */

const { Command } = require('commander');
const chalk = require('chalk');
const packageJson = require('../../package.json');

const program = new Command();

// Configuración del programa
program
  .name('awc')
  .description('AWC ZNS-MTD Method - Metodología de Transformación Digital')
  .version(packageJson.version);

// Comando: install
program
  .command('install')
  .description('Instalar el método AWC ZNS-MTD en el proyecto actual')
  .option('-f, --force', 'Forzar reinstalación')
  .option('-d, --dir <directory>', 'Directorio de instalación (default: .awc)')
  .action(async (options) => {
    try {
      const { installCommand } = require('./commands/install');
      await installCommand(options);
    } catch (error) {
      console.error(chalk.red('Error en instalación:'), error.message);
      process.exit(1);
    }
  });

// Comando: new (crear nuevo proyecto)
program
  .command('new [project-name]')
  .description('Crear un nuevo proyecto con estructura completa AWC ZNS-MTD')
  .option('-t, --type <type>', 'Tipo de proyecto (web, api, mobile, enterprise)')
  .action(async (projectName, options) => {
    try {
      const { newProjectCommand } = require('./commands/new-project');
      await newProjectCommand(projectName, options);
    } catch (error) {
      console.error(chalk.red('Error creando proyecto:'), error.message);
      process.exit(1);
    }
  });

// Comando: init
program
  .command('init')
  .description('Inicializar proyecto existente con ZNS-MTD')
  .option('-t, --type <type>', 'Tipo de proyecto (web, api, mobile, enterprise)')
  .action(async (options) => {
    try {
      const { initCommand } = require('./commands/init');
      await initCommand(options);
    } catch (error) {
      console.error(chalk.red('Error en inicialización:'), error.message);
      process.exit(1);
    }
  });

// Comando: status
program
  .command('status')
  .description('Mostrar estado actual del proyecto ZNS-MTD')
  .option('-v, --verbose', 'Mostrar información detallada')
  .action(async (options) => {
    try {
      const { statusCommand } = require('./commands/status');
      await statusCommand(options);
    } catch (error) {
      console.error(chalk.red('Error al obtener estado:'), error.message);
      process.exit(1);
    }
  });

// Comando: version
program
  .command('check-version')
  .alias('version')
  .description('Verificar versión instalada y actualizaciones disponibles')
  .action(async () => {
    try {
      const { versionCommand } = require('./commands/version');
      await versionCommand();
    } catch (error) {
      console.error(chalk.red('Error al verificar versión:'), error.message);
      process.exit(1);
    }
  });

// Comando: config
program
  .command('config')
  .description('Configurar preferencias del método ZNS-MTD')
  .option('-s, --show', 'Mostrar configuración actual')
  .option('-e, --edit', 'Editar configuración interactivamente')
  .action(async (options) => {
    try {
      const { configCommand } = require('./commands/config');
      await configCommand(options);
    } catch (error) {
      console.error(chalk.red('Error en configuración:'), error.message);
      process.exit(1);
    }
  });

// Comando: validate
program
  .command('validate')
  .description('Validar estructura y configuración del proyecto ZNS-MTD')
  .action(async () => {
    try {
      const { validateCommand } = require('./commands/validate');
      await validateCommand();
    } catch (error) {
      console.error(chalk.red('Error en validación:'), error.message);
      process.exit(1);
    }
  });

// Manejo de comandos inválidos
program.on('command:*', (operands) => {
  console.error(chalk.red(`\nComando inválido: ${operands[0]}`));
  console.log(chalk.yellow('\nComandos disponibles:'));
  console.log('  awc install      - Instalar el método ZNS-MTD');
  console.log('  awc init         - Inicializar proyecto');
  console.log('  awc status       - Ver estado del proyecto');
  console.log('  awc version      - Verificar versión');
  console.log('  awc config       - Configurar preferencias');
  console.log('  awc validate     - Validar proyecto');
  console.log('\nUsa "awc --help" para más información');
  process.exit(1);
});

// Parsear argumentos
program.parse(process.argv);

// Mostrar help si no hay comandos
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
