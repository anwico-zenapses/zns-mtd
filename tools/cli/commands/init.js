/**
 * Comando: init
 * Inicializa el tipo de proyecto y crea estructura específica según necesidades
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { displayLogo } = require('../utils/console-logger');
const { loadConfig, updateConfig } = require('../utils/file-utils');

async function initCommand(options = {}) {
  const cwd = process.cwd();
  const awcDir = path.join(cwd, '.awc');

  displayLogo();

  console.log(chalk.cyan('\n🎯 Inicialización de Proyecto ZΞNAPSΞS\n'));

  // Verificar que existe .awc
  if (!(await fs.pathExists(awcDir))) {
    console.log(chalk.red('❌ Este directorio no es un proyecto ZNS.'));
    console.log(chalk.yellow(`\n💡 Ejecuta primero ${chalk.green('zns new <proyecto>')}\n`));
    return;
  }

  // Cargar configuración
  const config = await loadConfig(awcDir);

  if (config.initialized) {
    console.log(chalk.yellow('⚠️  Este proyecto ya fue inicializado.'));
    const { reinit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'reinit',
        message: '¿Deseas reinicializar? (Se mantendrán archivos existentes)',
        default: false
      }
    ]);
    if (!reinit) return;
  }

  // Preguntas de inicialización
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: '📋 ¿Qué tipo de proyecto es?',
      choices: [
        { name: '🔍 Auditoría de Código Existente', value: 'code-audit' },
        { name: '🆕 Desarrollo Desde Cero', value: 'greenfield' },
        { name: '🔄 Migración/Modernización', value: 'migration' },
        { name: '🛠️  Mantenimiento/Soporte', value: 'maintenance' },
        { name: '📱 Aplicación Móvil', value: 'mobile' },
        { name: '🌐 API/Microservicios', value: 'api' },
        { name: '🏢 Sistema Empresarial', value: 'enterprise' }
      ]
    },
    {
      type: 'list',
      name: 'workflow',
      message: '⚡ ¿Qué workflow deseas usar?',
      choices: [
        { name: '⚡ Quick (1-2 semanas)', value: 'quick' },
        { name: '📊 Standard (1-3 meses)', value: 'standard' },
        { name: '🏢 Enterprise (3+ meses)', value: 'enterprise' }
      ]
    },
    {
      type: 'checkbox',
      name: 'technologies',
      message: '🛠️  Selecciona las tecnologías del proyecto (usa espacio para seleccionar):',
      choices: [
        { name: 'Java', value: 'java' },
        { name: '.NET Core', value: 'dotnet' },
        { name: 'Python', value: 'python' },
        { name: 'PHP', value: 'php' },
        { name: 'Node.js', value: 'nodejs' },
        { name: 'React', value: 'react' },
        { name: 'Angular', value: 'angular' },
        { name: 'Vue', value: 'vue' },
        { name: 'React Native', value: 'react-native' },
        { name: 'SQL Database', value: 'sql' },
        { name: 'NoSQL Database', value: 'nosql' }
      ]
    }
  ]);

  const spinner = ora('Creando estructura del proyecto...').start();

  try {
    // Crear estructura según tipo de proyecto
    const structure = getProjectStructure(answers.projectType);
    
    for (const dir of structure.directories) {
      await fs.ensureDir(path.join(cwd, dir));
    }
    spinner.text = 'Estructura de directorios creada';

    // Crear guías START_HERE.md para fases activas
    await createPhaseGuides(cwd, structure.phases);
    spinner.text = 'Guías de fase creadas';

    // Crear README de client-docs para fases activas
    await createClientDocsReadmes(cwd, structure.phases);
    spinner.text = 'README de client-docs creados';

    // Actualizar configuración
    config.initialized = true;
    config.projectType = answers.projectType;
    config.workflow = answers.workflow;
    config.technologies = answers.technologies;
    config.structure = structure;
    config.workflows.current_phase = structure.startPhase;
    
    await updateConfig(awcDir, config);
    spinner.text = 'Configuración actualizada';

    spinner.succeed(chalk.green('✅ Proyecto inicializado exitosamente'));

    // Mostrar resumen
    console.log(chalk.cyan('\n' + '═'.repeat(60)));
    console.log(chalk.cyan('📊 Resumen de Inicialización'));
    console.log(chalk.cyan('═'.repeat(60) + '\n'));

    console.log(`${chalk.gray('Tipo de Proyecto:')}  ${chalk.green(getProjectTypeName(answers.projectType))}`);
    console.log(`${chalk.gray('Workflow:')}          ${chalk.yellow(answers.workflow.toUpperCase())}`);
    console.log(`${chalk.gray('Tecnologías:')}       ${chalk.blue(answers.technologies.join(', ') || 'Ninguna')}`);
    console.log(`${chalk.gray('Fases creadas:')}     ${chalk.yellow(structure.phases.length)}\n`);

    // Mostrar fases creadas
    console.log(chalk.cyan('📂 Estructura Creada:\n'));
    structure.phases.forEach((phase, index) => {
      const icon = phase === structure.startPhase ? '👉' : '  ';
      console.log(`  ${icon} ${chalk.green(phase)} ${phase === structure.startPhase ? chalk.yellow('← INICIAR AQUÍ') : ''}`);
    });

    // Próximos pasos
    console.log(chalk.cyan('\n📚 Próximos Pasos:\n'));
    console.log(`  ${chalk.green('1.')} Ir a ${chalk.yellow(structure.startPhase + '/')}`);
    console.log(`  ${chalk.green('2.')} Leer ${chalk.yellow('START_HERE.md')}`);
    console.log(`  ${chalk.green('3.')} Colocar documentación del cliente en ${chalk.yellow('docs/client-docs/')}`);
    console.log(`  ${chalk.green('4.')} Comenzar a trabajar con los agentes especializados\n`);

    // Mostrar agentes recomendados
    const recommendedAgents = getRecommendedAgents(answers.projectType, answers.technologies);
    console.log(chalk.cyan('🤖 Agentes Recomendados para este Proyecto:\n'));
    recommendedAgents.forEach(agent => {
      console.log(`  ${chalk.green('→')} ${agent}`);
    });
    console.log();

  } catch (error) {
    spinner.fail(chalk.red('❌ Error inicializando proyecto'));
    throw error;
  }
}

/**
 * Obtiene la estructura de directorios según tipo de proyecto
 */
function getProjectStructure(projectType) {
  const structures = {
    'code-audit': {
      phases: ['01-comercial', '03-analysis', '04-planning', '08-support'],
      startPhase: '01-comercial',
      directories: [
        // Comercial
        '01-comercial/01-prospection',
        '01-comercial/02-technical-proposal',
        '01-comercial/03-quotation',
        '01-comercial/04-contract',
        '01-comercial/docs/client-docs/requerimientos',
        '01-comercial/docs/client-docs/presentaciones',
        '01-comercial/docs/client-docs/contratos',
        
        // Analysis (PRINCIPAL para auditoría)
        '03-analysis/01-code-audit',
        '03-analysis/02-architecture-review',
        '03-analysis/03-technical-debt',
        '03-analysis/04-recommendations',
        '03-analysis/docs/client-docs/arquitectura',
        '03-analysis/docs/client-docs/databases',
        '03-analysis/docs/client-docs/codigo-fuente',
        '03-analysis/reports',
        
        // Planning (plan de mejoras)
        '04-planning/01-improvement-plan',
        '04-planning/02-priorities',
        '04-planning/docs/client-docs/estimaciones',
        
        // Support (recomendaciones)
        '08-support/recommendations',
        '08-support/docs/client-docs/seguimiento'
      ]
    },
    
    'greenfield': {
      phases: ['01-comercial', '02-inception', '04-planning', '05-development', '06-qa', '07-deployment', '08-support'],
      startPhase: '01-comercial',
      directories: [
        // Comercial
        '01-comercial/01-prospection',
        '01-comercial/02-technical-proposal',
        '01-comercial/03-quotation',
        '01-comercial/04-contract',
        '01-comercial/docs/client-docs/requerimientos',
        '01-comercial/docs/client-docs/presentaciones',
        
        // Inception (PRINCIPAL)
        '02-inception/01-kickoff',
        '02-inception/02-prd',
        '02-inception/03-backlog',
        '02-inception/04-release-planning',
        '02-inception/docs/client-docs/procesos',
        '02-inception/docs/client-docs/manuales',
        '02-inception/docs/client-docs/imagenes',
        
        // Planning
        '04-planning/01-sprint-planning',
        '04-planning/02-backlog-refinement',
        '04-planning/docs/client-docs/historias',
        
        // Development (PRINCIPAL)
        '05-development/src',
        '05-development/tests',
        '05-development/docs',
        '05-development/docs/client-docs/recursos',
        
        // QA
        '06-qa/test-plans',
        '06-qa/test-cases',
        '06-qa/test-results',
        '06-qa/docs/client-docs/criterios-aceptacion',
        
        // Deployment
        '07-deployment/environments',
        '07-deployment/scripts',
        '07-deployment/docs/client-docs/infraestructura',
        
        // Support
        '08-support/incidents',
        '08-support/maintenance',
        '08-support/docs/client-docs/incidentes'
      ]
    },
    
    'migration': {
      phases: ['01-comercial', '03-analysis', '04-planning', '05-development', '07-deployment'],
      startPhase: '01-comercial',
      directories: [
        // Comercial
        '01-comercial/01-prospection',
        '01-comercial/02-technical-proposal',
        '01-comercial/03-quotation',
        '01-comercial/docs/client-docs/requerimientos',
        
        // Analysis (PRINCIPAL - analizar sistema legacy)
        '03-analysis/01-legacy-assessment',
        '03-analysis/02-migration-plan',
        '03-analysis/03-risk-assessment',
        '03-analysis/docs/client-docs/arquitectura',
        '03-analysis/docs/client-docs/databases',
        '03-analysis/docs/client-docs/codigo-existente',
        
        // Planning (plan de migración)
        '04-planning/01-migration-phases',
        '04-planning/02-data-migration',
        '04-planning/03-rollback-plan',
        '04-planning/docs/client-docs/cronograma',
        
        // Development (nuevo sistema)
        '05-development/src',
        '05-development/migration-scripts',
        '05-development/tests',
        '05-development/docs/client-docs/apis',
        
        // Deployment (ejecución de migración)
        '07-deployment/pre-migration',
        '07-deployment/migration',
        '07-deployment/post-migration',
        '07-deployment/docs/client-docs/infraestructura',
        '07-deployment/docs/client-docs/accesos'
      ]
    },
    
    'maintenance': {
      phases: ['01-comercial', '03-analysis', '08-support'],
      startPhase: '08-support',
      directories: [
        // Comercial (contrato de mantenimiento)
        '01-comercial/01-contract',
        '01-comercial/02-sla',
        '01-comercial/docs/client-docs/contratos',
        
        // Analysis (entender sistema)
        '03-analysis/01-system-documentation',
        '03-analysis/docs/client-docs/arquitectura',
        '03-analysis/docs/client-docs/codigo',
        
        // Support (PRINCIPAL)
        '08-support/incidents',
        '08-support/bug-fixes',
        '08-support/maintenance',
        '08-support/change-requests',
        '08-support/docs/client-docs/incidentes',
        '08-support/docs/client-docs/cambios'
      ]
    },
    
    'mobile': {
      phases: ['01-comercial', '02-inception', '04-planning', '05-development', '06-qa', '07-deployment'],
      startPhase: '02-inception',
      directories: [
        // Comercial
        '01-comercial/01-prospection',
        '01-comercial/docs/client-docs/requerimientos',
        
        // Inception (PRINCIPAL - diseño UX/UI)
        '02-inception/01-ux-design',
        '02-inception/02-ui-design',
        '02-inception/03-prototypes',
        '02-inception/04-backlog',
        '02-inception/docs/client-docs/mockups',
        '02-inception/docs/client-docs/branding',
        
        // Planning
        '04-planning/01-sprint-planning',
        
        // Development
        '05-development/src/ios',
        '05-development/src/android',
        '05-development/src/shared',
        '05-development/tests',
        '05-development/docs/client-docs/assets',
        
        // QA
        '06-qa/device-testing',
        '06-qa/automation',
        
        // Deployment
        '07-deployment/app-store',
        '07-deployment/play-store'
      ]
    },
    
    'api': {
      phases: ['01-comercial', '02-inception', '05-development', '06-qa', '07-deployment'],
      startPhase: '02-inception',
      directories: [
        // Comercial
        '01-comercial/01-prospection',
        
        // Inception (diseño API)
        '02-inception/01-api-design',
        '02-inception/02-swagger',
        '02-inception/docs/client-docs/integraciones',
        
        // Development (PRINCIPAL)
        '05-development/src/controllers',
        '05-development/src/services',
        '05-development/src/models',
        '05-development/tests/integration',
        '05-development/tests/unit',
        '05-development/docs/api',
        
        // QA
        '06-qa/api-testing',
        '06-qa/performance',
        
        // Deployment
        '07-deployment/kubernetes',
        '07-deployment/docker'
      ]
    },
    
    'enterprise': {
      phases: ['01-comercial', '02-inception', '03-analysis', '04-planning', '05-development', '06-qa', '07-deployment', '08-support'],
      startPhase: '01-comercial',
      directories: [
        // Todas las fases con estructura completa
        '01-comercial/01-prospection',
        '01-comercial/02-technical-proposal',
        '01-comercial/03-quotation',
        '01-comercial/04-contract',
        '01-comercial/docs/client-docs/requerimientos',
        '01-comercial/docs/client-docs/presentaciones',
        '01-comercial/docs/client-docs/contratos',
        
        '02-inception/01-kickoff',
        '02-inception/02-prd',
        '02-inception/03-backlog',
        '02-inception/04-release-planning',
        '02-inception/docs/client-docs/procesos',
        '02-inception/docs/client-docs/manuales',
        
        '03-analysis/01-code-audit',
        '03-analysis/02-architecture-review',
        '03-analysis/docs/client-docs/arquitectura',
        '03-analysis/docs/client-docs/databases',
        
        '04-planning/01-sprint-planning',
        '04-planning/02-backlog-refinement',
        '04-planning/03-release-planning',
        '04-planning/docs/client-docs/historias',
        
        '05-development/src',
        '05-development/tests',
        '05-development/docs',
        '05-development/docs/client-docs/apis',
        '05-development/docs/client-docs/integraciones',
        
        '06-qa/test-plans',
        '06-qa/test-cases',
        '06-qa/automation',
        '06-qa/docs/client-docs/criterios-aceptacion',
        
        '07-deployment/environments',
        '07-deployment/scripts',
        '07-deployment/docs/client-docs/infraestructura',
        '07-deployment/docs/client-docs/accesos',
        
        '08-support/incidents',
        '08-support/maintenance',
        '08-support/docs/client-docs/incidentes'
      ]
    }
  };

  return structures[projectType] || structures.greenfield;
}

/**
 * Crea guías START_HERE.md para las fases activas
 */
async function createPhaseGuides(projectPath, phases) {
  // TODO: Crear START_HERE.md específicos para cada fase
  // según el tipo de proyecto
  console.log('Creando guías para:', phases);
}

/**
 * Crea README en client-docs para las fases activas
 */
async function createClientDocsReadmes(projectPath, phases) {
  // TODO: Crear README.md en client-docs/ de cada fase
  console.log('Creando client-docs README para:', phases);
}

/**
 * Obtiene nombre del tipo de proyecto
 */
function getProjectTypeName(projectType) {
  const names = {
    'code-audit': 'Auditoría de Código Existente',
    'greenfield': 'Desarrollo Desde Cero',
    'migration': 'Migración/Modernización',
    'maintenance': 'Mantenimiento/Soporte',
    'mobile': 'Aplicación Móvil',
    'api': 'API/Microservicios',
    'enterprise': 'Sistema Empresarial'
  };
  return names[projectType] || projectType;
}

/**
 * Obtiene agentes recomendados según tipo de proyecto y tecnologías
 */
function getRecommendedAgents(projectType, technologies) {
  const baseAgents = [];
  
  // Agentes según tipo de proyecto
  if (projectType === 'code-audit') {
    baseAgents.push('backend-audit-master', 'frontend-audit-master', 'obsolescence-analyst-senior');
  } else if (projectType === 'greenfield') {
    baseAgents.push('product-owner-business-analyst', 'solution-architect-senior', 'technical-stories-architect');
  } else if (projectType === 'migration') {
    baseAgents.push('backend-audit-master', 'solution-architect-senior', 'database-engineer-senior');
  } else if (projectType === 'mobile') {
    baseAgents.push('react-native-senior', 'frontend-react-senior');
  } else if (projectType === 'api') {
    baseAgents.push('solution-architect-senior', 'database-engineer-senior');
  }
  
  // Agentes según tecnología
  if (technologies.includes('java')) {
    baseAgents.push('backend-java-senior');
  }
  if (technologies.includes('dotnet')) {
    baseAgents.push('dotnet-core-senior', 'aspnet-core-architect-senior');
  }
  if (technologies.includes('python')) {
    baseAgents.push('python-senior');
  }
  if (technologies.includes('react')) {
    baseAgents.push('frontend-react-senior');
  }
  if (technologies.includes('sql') || technologies.includes('nosql')) {
    baseAgents.push('database-engineer-senior');
  }
  
  // Agregar agentes base si aún no hay
  if (baseAgents.length === 0) {
    baseAgents.push('zen-master', 'architect-senior', 'developer-pro');
  }
  
  // Remover duplicados
  return [...new Set(baseAgents)];
}

module.exports = { initCommand };
