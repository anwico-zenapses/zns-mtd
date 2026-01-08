/**
 * Comando: init
 * Inicializa el proyecto con ZNS-MTD y analiza contexto
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { analyzeProject } = require('../utils/project-analyzer');
const { loadConfig, updateConfig } = require('../utils/file-utils');
const { displayLogo } = require('../utils/console-logger');

async function initCommand(options = {}) {
  const cwd = process.cwd();
  const awcDir = path.join(cwd, '.awc');

  displayLogo();

  console.log(chalk.cyan('\n🎯 Inicialización de Proyecto ZNS-MTD\n'));

  // Verificar instalación
  if (!(await fs.pathExists(awcDir))) {
    console.log(chalk.red('❌ AWC ZNS-MTD no está instalado.'));
    console.log(chalk.yellow(`\n💡 Ejecuta primero ${chalk.green('awc install')}\n`));
    return;
  }

  const spinner = ora('Analizando proyecto...').start();

  try {
    // Analizar proyecto
    const analysis = await analyzeProject(cwd);

    spinner.succeed(chalk.green('✅ Análisis completado'));

    // Mostrar resultados
    console.log(chalk.cyan('\n📊 Resultados del Análisis:\n'));
    console.log(chalk.gray('─'.repeat(60)));

    console.log(chalk.cyan('Tecnologías Detectadas:'));
    if (analysis.technologies.length > 0) {
      analysis.technologies.forEach(tech => {
        console.log(`  ${chalk.green('✓')} ${tech}`);
      });
    } else {
      console.log(chalk.yellow('  No se detectaron tecnologías conocidas'));
    }

    console.log(chalk.cyan('\nEstructura del Proyecto:'));
    console.log(`  Archivos totales:   ${chalk.yellow(analysis.fileCount)}`);
    console.log(`  Directorios:        ${chalk.yellow(analysis.directoryCount)}`);
    console.log(`  Lenguajes:          ${chalk.yellow(analysis.languages.join(', ') || 'N/A')}`);

    console.log(chalk.cyan('\nComplejidad Estimada:'));
    console.log(`  Nivel:              ${getComplexityColor(analysis.complexity)}`);
    console.log(`  Tamaño:             ${getSizeColor(analysis.size)}`);

    console.log(chalk.gray('─'.repeat(60)));

    // Recomendación de workflow
    console.log(chalk.cyan('\n🎯 Workflow Recomendado:\n'));

    const recommendedWorkflow = getRecommendedWorkflow(analysis);

    console.log(`  ${chalk.green('→')} ${chalk.bold(recommendedWorkflow.name)}`);
    console.log(`     ${chalk.gray(recommendedWorkflow.description)}`);
    console.log(`     ${chalk.gray('Duración estimada:')} ${chalk.yellow(recommendedWorkflow.duration)}\n`);

    // Guardar análisis en configuración
    const config = await loadConfig(awcDir);
    config.lastAnalysis = {
      date: new Date().toISOString(),
      ...analysis,
      recommendedWorkflow: recommendedWorkflow.id
    };
    await updateConfig(awcDir, config);

    // Próximos pasos
    console.log(chalk.cyan('📚 Próximos Pasos:\n'));
    console.log(`  1. Carga el agente ${chalk.green('ZEN MASTER')} en tu IDE`);
    console.log(`  2. Ejecuta ${chalk.green('*' + recommendedWorkflow.command)} para comenzar`);
    console.log(`  3. Sigue las recomendaciones del workflow\n`);

  } catch (error) {
    spinner.fail(chalk.red('❌ Error en el análisis'));
    throw error;
  }
}

/**
 * Determina el workflow recomendado basado en el análisis
 */
function getRecommendedWorkflow(analysis) {
  const { complexity, size, fileCount } = analysis;

  // Enterprise Flow
  if (complexity === 'high' || size === 'large' || fileCount > 1000) {
    return {
      id: 'enterprise-flow',
      name: 'Enterprise Flow',
      command: 'zns-enterprise-flow',
      description: 'Para sistemas complejos con múltiples stakeholders',
      duration: '< 2 horas'
    };
  }

  // Quick Flow
  if (complexity === 'low' && size === 'small' && fileCount < 50) {
    return {
      id: 'quick-flow',
      name: 'Quick Flow',
      command: 'zns-quick-flow',
      description: 'Para cambios rápidos y bugs menores',
      duration: '< 10 minutos'
    };
  }

  // Standard Flow (default)
  return {
    id: 'standard-flow',
    name: 'Standard Flow',
    command: 'zns-standard-flow',
    description: 'Para features medias y refactorizaciones',
    duration: '< 30 minutos'
  };
}

function getComplexityColor(complexity) {
  const colors = {
    'low': chalk.green('Baja'),
    'medium': chalk.yellow('Media'),
    'high': chalk.red('Alta')
  };
  return colors[complexity] || chalk.gray('Desconocida');
}

function getSizeColor(size) {
  const colors = {
    'small': chalk.green('Pequeño'),
    'medium': chalk.yellow('Mediano'),
    'large': chalk.red('Grande')
  };
  return colors[size] || chalk.gray('Desconocido');
}

module.exports = { initCommand };
