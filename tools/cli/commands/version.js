/**
 * Comando: version
 * Verifica la versión instalada y actualizaciones disponibles
 */

const chalk = require('chalk');
// const semver = require('semver');
const { getVersion, checkForUpdates } = require('../utils/version');
const { displayLogo } = require('../utils/console-logger');

async function versionCommand() {
  displayLogo();

  console.log(chalk.cyan('\n🔍 Información de Versión\n'));

  const currentVersion = getVersion();

  console.log(chalk.gray('─'.repeat(60)));
  console.log(`  Versión actual:     ${chalk.yellow(currentVersion)}`);
  console.log(`  Método:             ${chalk.cyan('ZΞNAPSΞS by ΛNWICO')}`);
  console.log(`  Inspirado en:       ${chalk.gray('BMAD Core V6')}`);
  console.log(chalk.gray('─'.repeat(60)));

  // Verificar actualizaciones
  console.log(chalk.cyan('\n🔄 Verificando actualizaciones...'));

  try {
    const updateInfo = await checkForUpdates(currentVersion);

    if (updateInfo.hasUpdate) {
      console.log(chalk.yellow('\n⚠️  Nueva versión disponible!\n'));
      console.log(`  Actual:      ${chalk.red(currentVersion)}`);
      console.log(`  Disponible:  ${chalk.green(updateInfo.latestVersion)}`);
      console.log(`\n💡 Actualiza con: ${chalk.green('npm install -g awc-zns-mtd@latest')}\n`);
    } else {
      console.log(chalk.green('\n✅ Estás usando la versión más reciente\n'));
    }
  } catch {
    console.log(chalk.gray('\n  No se pudo verificar actualizaciones (sin conexión)\n'));
  }

  // Información adicional
  console.log(chalk.cyan('📚 Más información:\n'));
  console.log(`  Documentación:  ${chalk.blue('https://github.com/awc/awc-zns-mtd')}`);
  console.log(`  Issues:         ${chalk.blue('https://github.com/awc/awc-zns-mtd/issues')}`);
  console.log(
    `  Changelog:      ${chalk.blue('https://github.com/awc/awc-zns-mtd/blob/main/CHANGELOG.md')}\n`
  );
}

module.exports = { versionCommand };
