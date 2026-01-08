/**
 * Console Logger
 * Utilidades para mostrar mensajes formateados en consola
 */

const chalk = require('chalk');

/**
 * Muestra el logo de ZΞNAPSΞS
 */
function displayLogo() {
  console.log('');
  console.log(chalk.cyan('╔═══════════════════════════════════════════════════════════╗'));
  console.log(
    chalk.cyan('║') +
      chalk.bold.white('                  ZΞNAPSΞS by ΛNWICO                    ') +
      chalk.cyan('║')
  );
  console.log(
    chalk.cyan('║') +
      chalk.gray('            Minimalismo Estratégico Method                 ') +
      chalk.cyan('║')
  );
  console.log(chalk.cyan('╚═══════════════════════════════════════════════════════════╝'));
  console.log();
}

/**
 * Muestra un mensaje de éxito
 */
function logSuccess(message) {
  console.log(`${chalk.green('✓')} ${message}`);
}

/**
 * Muestra un mensaje de error
 */
function logError(message) {
  console.log(`${chalk.red('✗')} ${message}`);
}

/**
 * Muestra un mensaje de advertencia
 */
function logWarning(message) {
  console.log(`${chalk.yellow('⚠')} ${message}`);
}

/**
 * Muestra un mensaje informativo
 */
function logInfo(message) {
  console.log(`${chalk.blue('ℹ')} ${message}`);
}

/**
 * Muestra un separador
 */
function logSeparator(length = 60) {
  console.log(chalk.gray('─'.repeat(length)));
}

/**
 * Muestra un título de sección
 */
function logSection(title) {
  console.log();
  console.log(chalk.cyan.bold(title));
  logSeparator();
}

/**
 * Muestra un mensaje de progreso
 */
function logProgress(current, total, message) {
  const percentage = Math.round((current / total) * 100);
  const bar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
  console.log(`[${chalk.cyan(bar)}] ${percentage}% ${message}`);
}

/**
 * Muestra una tabla simple
 */
function logTable(data) {
  const maxKeyLength = Math.max(...data.map((item) => item.key.length));

  data.forEach((item) => {
    const paddedKey = item.key.padEnd(maxKeyLength + 2);
    console.log(`  ${chalk.gray(paddedKey)} ${chalk.yellow(item.value)}`);
  });
}

/**
 * Muestra un mensaje de bienvenida
 */
function displayWelcome(projectName) {
  console.log();
  console.log(chalk.cyan('╔═══════════════════════════════════════════════════════════╗'));
  console.log(
    chalk.cyan('║') + chalk.bold.white(`  Bienvenido a ${projectName}`.padEnd(58)) + chalk.cyan('║')
  );
  console.log(chalk.cyan('╚═══════════════════════════════════════════════════════════╝'));
  console.log();
}

/**
 * Muestra comandos disponibles
 */
function displayCommands(commands) {
  console.log(chalk.cyan('\n💡 Comandos disponibles:\n'));

  commands.forEach((cmd) => {
    const command = chalk.green(cmd.command.padEnd(20));
    const description = chalk.gray(cmd.description);
    console.log(`  ${command} ${description}`);
  });

  console.log();
}

/**
 * Muestra filosofía ZNS
 */
function displayZnsPhilosophy() {
  console.log(chalk.cyan('\n📖 Filosofía ZNS-MTD:\n'));
  console.log(
    chalk.yellow('  ZEN') + chalk.gray('         → Claridad, simplicidad deliberada, ruido mínimo')
  );
  console.log(
    chalk.yellow('  NEUTRO') + chalk.gray('     → Objetividad, decisiones basadas en evidencia')
  );
  console.log(
    chalk.yellow('  SISTEMÁTICO') + chalk.gray(' → Procesos repetibles, documentación rigurosa')
  );
  console.log();
}

/**
 * Muestra banner de finalización
 */
function displayCompletionBanner(success = true) {
  console.log();
  if (success) {
    console.log(chalk.green('╔═══════════════════════════════════════════════════════════╗'));
    console.log(
      chalk.green('║') +
        chalk.bold.white('              ✅ PROCESO COMPLETADO                       ') +
        chalk.green('║')
    );
    console.log(chalk.green('╚═══════════════════════════════════════════════════════════╝'));
  } else {
    console.log(chalk.red('╔═══════════════════════════════════════════════════════════╗'));
    console.log(
      chalk.red('║') +
        chalk.bold.white('              ❌ PROCESO FALLIDO                          ') +
        chalk.red('║')
    );
    console.log(chalk.red('╚═══════════════════════════════════════════════════════════╝'));
  }
  console.log();
}

module.exports = {
  displayLogo,
  logSuccess,
  logError,
  logWarning,
  logInfo,
  logSeparator,
  logSection,
  logProgress,
  logTable,
  displayWelcome,
  displayCommands,
  displayZnsPhilosophy,
  displayCompletionBanner
};
