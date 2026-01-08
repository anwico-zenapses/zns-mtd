/**
 * Comando: validate
 * Valida la estructura y configuración del proyecto ZNS-MTD
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { loadConfig } = require('../utils/file-utils');
const { displayLogo } = require('../utils/console-logger');

async function validateCommand() {
  const cwd = process.cwd();
  const awcDir = path.join(cwd, '.zns-mtd');

  displayLogo();

  console.log(chalk.cyan('\n🔍 Validación del Proyecto ZNS-MTD\n'));

  const errors = [];
  const warnings = [];
  let checksCount = 0;
  let passedCount = 0;

  // Check 1: Instalación
  checksCount++;
  if (await fs.pathExists(awcDir)) {
    passedCount++;
    console.log(`${chalk.green('✓')} Directorio .awc existe`);
  } else {
    errors.push('Directorio .awc no encontrado');
    console.log(`${chalk.red('✗')} Directorio .awc no encontrado`);
  }

  // Check 2: Configuración
  checksCount++;
  const config = await loadConfig(awcDir);
  if (config) {
    passedCount++;
    console.log(`${chalk.green('✓')} Archivo de configuración válido`);
  } else {
    errors.push('Archivo de configuración inválido o faltante');
    console.log(`${chalk.red('✗')} Archivo de configuración inválido`);
  }

  // Check 3: Agentes
  checksCount++;
  const agentsPath = path.join(awcDir, 'agents');
  if (await fs.pathExists(agentsPath)) {
    const agentFiles = await fs.readdir(agentsPath);
    const yamlAgents = agentFiles.filter((f) => f.endsWith('.yaml'));

    if (yamlAgents.length >= 4) {
      passedCount++;
      console.log(`${chalk.green('✓')} ${yamlAgents.length} agentes encontrados`);
    } else {
      warnings.push(`Solo ${yamlAgents.length} agentes encontrados (se esperan 4)`);
      console.log(`${chalk.yellow('⚠')} Solo ${yamlAgents.length} agentes (se esperan 4)`);
    }
  } else {
    errors.push('Directorio de agentes no encontrado');
    console.log(`${chalk.red('✗')} Directorio de agentes no encontrado`);
  }

  // Check 4: Workflows
  checksCount++;
  const workflowsPath = path.join(awcDir, 'workflows');
  if (await fs.pathExists(workflowsPath)) {
    const workflowDirs = await fs.readdir(workflowsPath);

    if (workflowDirs.length >= 3) {
      passedCount++;
      console.log(`${chalk.green('✓')} ${workflowDirs.length} workflows encontrados`);
    } else {
      warnings.push(`Solo ${workflowDirs.length} workflows encontrados (se esperan 3)`);
      console.log(`${chalk.yellow('⚠')} Solo ${workflowDirs.length} workflows (se esperan 3)`);
    }
  } else {
    errors.push('Directorio de workflows no encontrado');
    console.log(`${chalk.red('✗')} Directorio de workflows no encontrado`);
  }

  // Check 5: Documentación
  checksCount++;
  const docsPath = path.join(cwd, 'docs');
  if (await fs.pathExists(docsPath)) {
    passedCount++;
    console.log(`${chalk.green('✓')} Directorio de documentación existe`);

    // Sub-checks de documentación
    const adrPath = path.join(docsPath, 'adr');
    const storiesPath = path.join(docsPath, 'stories');
    const archPath = path.join(docsPath, 'architecture');

    if (!(await fs.pathExists(adrPath))) {
      warnings.push('Directorio de ADRs no encontrado');
    }
    if (!(await fs.pathExists(storiesPath))) {
      warnings.push('Directorio de stories no encontrado');
    }
    if (!(await fs.pathExists(archPath))) {
      warnings.push('Directorio de architecture no encontrado');
    }
  } else {
    warnings.push('Directorio de documentación no encontrado');
    console.log(`${chalk.yellow('⚠')} Directorio de documentación no encontrado`);
  }

  // Resumen
  console.log(chalk.cyan('\n📊 Resumen de Validación:\n'));
  console.log(chalk.gray('─'.repeat(60)));
  console.log(`  Total de checks:    ${chalk.yellow(checksCount)}`);
  console.log(`  Pasados:            ${chalk.green(passedCount)}`);
  console.log(`  Errores:            ${chalk.red(errors.length)}`);
  console.log(`  Advertencias:       ${chalk.yellow(warnings.length)}`);
  console.log(chalk.gray('─'.repeat(60)));

  // Errores
  if (errors.length > 0) {
    console.log(chalk.red('\n❌ Errores Encontrados:\n'));
    errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }

  // Advertencias
  if (warnings.length > 0) {
    console.log(chalk.yellow('\n⚠️  Advertencias:\n'));
    warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
  }

  // Resultado final
  console.log();
  if (errors.length === 0 && warnings.length === 0) {
    console.log(chalk.green('✅ ¡Proyecto ZΞNAPSΞS totalmente válido!\n'));
  } else if (errors.length === 0) {
    console.log(chalk.yellow('⚠️  Proyecto válido con algunas advertencias\n'));
    console.log(chalk.gray(`   Ejecuta ${chalk.green('zns install --force')} para reparar\n`));
  } else {
    console.log(chalk.red('❌ Proyecto tiene errores que requieren atención\n'));
    console.log(chalk.gray(`   Ejecuta ${chalk.green('zns install --force')} para reparar\n`));
  }
}

module.exports = { validateCommand };
