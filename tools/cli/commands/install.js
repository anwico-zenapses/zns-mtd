/**
 * Comando: install
 * Instala el método AWC ZNS-MTD en el proyecto actual
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { copyAgents, copyWorkflows, createConfigFile } = require('../utils/file-utils');
const { displayLogo } = require('../utils/console-logger');
const { getVersion } = require('../utils/version');

/**
 * Comando principal de instalación
 */
async function installCommand(options = {}) {
  const cwd = process.cwd();
  const awcDir = path.join(cwd, '.awc');
  const force = options.force || false;

  // Mostrar logo AWC ZNS-MTD
  displayLogo();

  console.log(chalk.cyan('\n🚀 Instalación del Método AWC ZNS-MTD\n'));

  // Verificar si ya existe instalación
  if (await fs.pathExists(awcDir) && !force) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'Ya existe una instalación de AWC ZNS-MTD. ¿Deseas sobrescribirla?',
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('\n⚠️  Instalación cancelada.'));
      return;
    }
  }

  // Preguntas de configuración
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: '¿Qué tipo de proyecto es?',
      choices: [
        { name: 'Web Application (Frontend + Backend)', value: 'web' },
        { name: 'API/Microservices', value: 'api' },
        { name: 'Mobile Application', value: 'mobile' },
        { name: 'Enterprise System', value: 'enterprise' },
        { name: 'Otro', value: 'other' }
      ]
    },
    {
      type: 'list',
      name: 'teamSize',
      message: '¿Cuál es el tamaño del equipo?',
      choices: [
        { name: 'Individual (1 persona)', value: 'solo' },
        { name: 'Pequeño (2-5 personas)', value: 'small' },
        { name: 'Mediano (6-15 personas)', value: 'medium' },
        { name: 'Grande (16+ personas)', value: 'large' }
      ]
    },
    {
      type: 'list',
      name: 'skillLevel',
      message: '¿Nivel técnico promedio del equipo?',
      choices: [
        { name: 'Junior/Aprendizaje', value: 'beginner' },
        { name: 'Intermedio', value: 'intermediate' },
        { name: 'Senior/Avanzado', value: 'advanced' }
      ]
    },
    {
      type: 'list',
      name: 'verbosity',
      message: '¿Nivel de detalle en la documentación?',
      choices: [
        { name: 'Mínimo (solo lo esencial)', value: 'minimal' },
        { name: 'Normal (balanceado)', value: 'normal' },
        { name: 'Detallado (exhaustivo)', value: 'detailed' }
      ]
    }
  ]);

  // Proceso de instalación
  const spinner = ora('Instalando AWC ZNS-MTD...').start();

  try {
    // 1. Crear directorio .awc
    await fs.ensureDir(awcDir);
    spinner.text = 'Directorio .awc creado';

    // 2. Copiar agentes
    const srcAgentsPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/agents');
    const destAgentsPath = path.join(awcDir, 'agents');
    await copyAgents(srcAgentsPath, destAgentsPath);
    spinner.text = 'Agentes copiados';

    // 3. Copiar workflows
    const srcWorkflowsPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/workflows');
    const destWorkflowsPath = path.join(awcDir, 'workflows');
    await copyWorkflows(srcWorkflowsPath, destWorkflowsPath);
    spinner.text = 'Workflows copiados';

    // 4. Crear archivo de configuración
    const config = {
      version: getVersion(),
      installedAt: new Date().toISOString(),
      projectType: answers.projectType,
      teamSize: answers.teamSize,
      skillLevel: answers.skillLevel,
      verbosity: answers.verbosity,
      preferences: {
        communication_language: 'Spanish',
        document_output_language: 'Spanish',
        code_language: 'English'
      }
    };

    await createConfigFile(awcDir, config);
    spinner.text = 'Configuración creada';

    // 5. Crear directorio de documentación
    const docsDir = path.join(cwd, 'docs');
    await fs.ensureDir(path.join(docsDir, 'architecture'));
    await fs.ensureDir(path.join(docsDir, 'adr'));
    await fs.ensureDir(path.join(docsDir, 'stories'));
    spinner.text = 'Estructura de documentación creada';

    // 5.1. Copiar copilot-instructions.md si no existe
    const githubDir = path.join(cwd, '.github');
    const copilotInstructionsPath = path.join(githubDir, 'copilot-instructions.md');
    if (!(await fs.pathExists(copilotInstructionsPath))) {
      await fs.ensureDir(githubDir);
      const templatePath = path.join(__dirname, '../../../templates/.github/copilot-instructions.md');
      if (await fs.pathExists(templatePath)) {
        await fs.copy(templatePath, copilotInstructionsPath);
        spinner.text = 'Instrucciones de GitHub Copilot creadas';
      }
    }

    // 6. Crear archivo .gitignore si no existe
    const gitignorePath = path.join(cwd, '.gitignore');
    if (!(await fs.pathExists(gitignorePath))) {
      await fs.writeFile(gitignorePath, '# AWC ZNS-MTD\n.awc/\n');
    } else {
      const gitignoreContent = await fs.readFile(gitignorePath, 'utf8');
      if (!gitignoreContent.includes('.awc')) {
        await fs.appendFile(gitignorePath, '\n# AWC ZNS-MTD\n.awc/\n');
      }
    }
    spinner.text = '.gitignore actualizado';

    spinner.succeed(chalk.green('✅ Instalación completada exitosamente'));

    // Resumen de instalación
    console.log(chalk.cyan('\n📊 Resumen de Instalación:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(`  Versión:           ${chalk.yellow(config.version)}`);
    console.log(`  Tipo de proyecto:  ${chalk.yellow(answers.projectType)}`);
    console.log(`  Tamaño de equipo:  ${chalk.yellow(answers.teamSize)}`);
    console.log(`  Nivel técnico:     ${chalk.yellow(answers.skillLevel)}`);
    console.log(`  Detalle docs:      ${chalk.yellow(answers.verbosity)}`);
    console.log(chalk.gray('─'.repeat(50)));

    // Próximos pasos
    console.log(chalk.cyan('\n🎯 Próximos pasos:\n'));
    console.log(`  1. Ejecuta ${chalk.green('awc init')} para analizar tu proyecto`);
    console.log(`  2. Ejecuta ${chalk.green('awc status')} para ver el estado`);
    console.log(`  3. Carga un agente en tu IDE y comienza con ${chalk.green('*help')}\n`);

    console.log(chalk.cyan('📚 Documentación disponible en:'));
    console.log(chalk.gray(`   ${path.join(cwd, 'docs')}\n`));

  } catch (error) {
    spinner.fail(chalk.red('❌ Error durante la instalación'));
    throw error;
  }
}

module.exports = { installCommand };
