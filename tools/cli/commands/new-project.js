/**
 * Comando: new
 * Crea un nuevo directorio de proyecto con configuración base AWC ZNS-MTD
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { displayLogo } = require('../utils/console-logger');
const { getVersion } = require('../utils/version');

/**
 * Comando principal para crear nuevo proyecto
 */
async function newProjectCommand(projectName, options = {}) {
  displayLogo();

  console.log(chalk.cyan('\n🚀 Crear Nuevo Proyecto AWC ZNS-MTD\n'));

  // Preguntar nombre del proyecto si no se proporcionó
  if (!projectName) {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '📦 Nombre del proyecto:',
        validate: (input) => {
          if (!input.trim()) return 'El nombre del proyecto es requerido';
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Solo se permiten letras, números, guiones y guiones bajos';
          }
          return true;
        }
      }
    ]);
    projectName = name;
  }

  // Verificar si el directorio ya existe
  const projectPath = path.join(process.cwd(), projectName);
  if (await fs.pathExists(projectPath)) {
    console.log(chalk.red(`\n❌ El directorio '${projectName}' ya existe.\n`));
    process.exit(1);
  }

  // Preguntar responsable del proyecto
  const { responsible, description, gitInit } = await inquirer.prompt([
    {
      type: 'input',
      name: 'responsible',
      message: '👤 Responsable del proyecto:',
      validate: (input) => {
        if (!input.trim()) return 'El responsable es requerido';
        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: '📝 Descripción breve (opcional):',
      default: `Proyecto ${projectName}`
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: '🔧 Inicializar repositorio Git?',
      default: true
    }
  ]);

  const spinner = ora('Creando estructura base del proyecto...').start();

  try {
    // 1. Crear directorio raíz del proyecto
    await fs.ensureDir(projectPath);
    spinner.text = `Directorio ${projectName} creado`;

    // 2. Crear estructura base mínima
    const baseDirectories = [
      '.awc/agents',
      '.awc/workflows',
      '.awc/templates',
      'docs'
    ];

    for (const dir of baseDirectories) {
      await fs.ensureDir(path.join(projectPath, dir));
    }
    spinner.text = 'Estructura base creada';

    // 3. Copiar agentes base (4 agentes core)
    const srcAgentsPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/agents');
    const destAgentsPath = path.join(projectPath, '.awc/agents');
    
    if (await fs.pathExists(srcAgentsPath)) {
      await fs.copy(srcAgentsPath, destAgentsPath);
      spinner.text = 'Agentes base copiados';
    }

    // 4. Copiar agentes especializados (22 agentes)
    const srcCustomAgentsPath = path.join(__dirname, '../../../src/modules/custom-agents/cli/.awc-agents');
    const destCustomAgentsPath = path.join(projectPath, '.awc/agents/specialized');
    
    if (await fs.pathExists(srcCustomAgentsPath)) {
      await fs.copy(srcCustomAgentsPath, destCustomAgentsPath);
      spinner.text = 'Agentes especializados copiados';
    }

    // 5. Copiar workflows
    const srcWorkflowsPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/workflows');
    const destWorkflowsPath = path.join(projectPath, '.awc/workflows');
    
    if (await fs.pathExists(srcWorkflowsPath)) {
      await fs.copy(srcWorkflowsPath, destWorkflowsPath);
      spinner.text = 'Workflows copiados';
    }

    // 6. Copiar templates
    const srcTemplatesPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/templates');
    const destTemplatesPath = path.join(projectPath, '.awc/templates');
    
    if (await fs.pathExists(srcTemplatesPath)) {
      await fs.copy(srcTemplatesPath, destTemplatesPath);
      spinner.text = 'Templates copiados';
    }

    // 7. Crear archivo de configuración AWC
    const awcConfig = {
      version: getVersion(),
      createdAt: new Date().toISOString(),
      project: {
        name: projectName,
        description: description,
        responsible: responsible
      },
      projectType: null,
      initialized: false,
      preferences: {
        communication_language: 'Spanish',
        document_output_language: 'Spanish',
        code_language: 'English'
      },
      workflows: {
        current_phase: null,
        completed_phases: []
      }
    };

    await fs.writeJson(
      path.join(projectPath, '.awc/config.json'),
      awcConfig,
      { spaces: 2 }
    );
    spinner.text = 'Configuración AWC creada';

    // 8. Crear README.md del proyecto
    const readme = createReadmeContent(projectName, responsible, description);
    await fs.writeFile(path.join(projectPath, 'README.md'), readme);
    spinner.text = 'README.md creado';

    // 9. Crear .gitignore
    const gitignore = createGitignoreContent();
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
    spinner.text = '.gitignore creado';

    // 10. Crear configuración de VS Code
    await createVSCodeConfig(projectPath, projectName);
    spinner.text = 'Configuración VS Code creada';

    // 11. Copiar copilot-instructions.md
    const githubDir = path.join(projectPath, '.github');
    await fs.ensureDir(githubDir);
    const templateCopilotPath = path.join(__dirname, '../../../templates/.github/copilot-instructions.md');
    if (await fs.pathExists(templateCopilotPath)) {
      await fs.copy(templateCopilotPath, path.join(githubDir, 'copilot-instructions.md'));
      spinner.text = 'GitHub Copilot instructions creadas';
    }

    // 12. Crear archivo NEXT_STEPS.md
    const nextSteps = createNextStepsContent(projectName);
    await fs.writeFile(path.join(projectPath, 'NEXT_STEPS.md'), nextSteps);
    spinner.text = 'Guía de próximos pasos creada';

    // 13. Inicializar Git si se solicitó
    if (gitInit) {
      const { execSync } = require('child_process');
      try {
        execSync('git init', { cwd: projectPath, stdio: 'ignore' });
        execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
        execSync(`git commit -m "feat: Inicializar proyecto ${projectName} con AWC ZNS-MTD"`, {
          cwd: projectPath,
          stdio: 'ignore'
        });
        spinner.text = 'Repositorio Git inicializado';
      } catch (error) {
        // Git no está disponible o fallo, continuar sin git
      }
    }

    spinner.succeed(chalk.green('✅ Proyecto creado exitosamente'));

    // Mostrar resumen
    console.log(chalk.cyan('\n' + '═'.repeat(60)));
    console.log(chalk.cyan('📦 Proyecto Creado'));
    console.log(chalk.cyan('═'.repeat(60) + '\n'));

    console.log(`${chalk.gray('Nombre:')}        ${chalk.green(projectName)}`);
    console.log(`${chalk.gray('Responsable:')}   ${chalk.yellow(responsible)}`);
    console.log(`${chalk.gray('Ubicación:')}     ${chalk.blue(projectPath)}`);
    console.log(`${chalk.gray('AWC Versión:')}   ${chalk.yellow(getVersion())}\n`);

    // Próximos pasos
    console.log(chalk.cyan('📚 Próximos Pasos:\n'));
    console.log(`  ${chalk.green('1.')} cd ${projectName}`);
    console.log(`  ${chalk.green('2.')} awc init ${chalk.gray('# Inicializar tipo de proyecto')}`);
    console.log(`  ${chalk.green('3.')} Leer ${chalk.yellow('NEXT_STEPS.md')} para más detalles\n`);

    console.log(chalk.yellow('⚠️  La estructura de fases se creará al ejecutar') + chalk.green(' awc init\n'));

  } catch (error) {
    spinner.fail(chalk.red('❌ Error creando proyecto'));
    console.error(error);
    throw error;
  }
}

/**
 * Crea el contenido del README.md
 */
function createReadmeContent(projectName, responsible, description) {
  return `# ${projectName}

> ${description}

## 📋 Información del Proyecto

- **Responsable**: ${responsible}
- **Metodología**: AWC ZNS-MTD (Zen, Neutro, Sistemático)
- **Estado**: Pendiente de inicialización

## 🚀 Próximos Pasos

Este proyecto ha sido creado con la estructura base de AWC ZNS-MTD.

### 1. Inicializar Tipo de Proyecto

\`\`\`bash
awc init
\`\`\`

El comando \`awc init\` te preguntará:
- Tipo de proyecto (auditoría, desarrollo nuevo, migración, etc.)
- Tecnologías a utilizar
- Tipo de workflow (quick, standard, enterprise)

Basado en tus respuestas, creará automáticamente:
- ✅ Estructura de directorios por fase
- ✅ Directorios client-docs específicos
- ✅ Templates relevantes para tu proyecto
- ✅ Workflows configurados

### 2. Comenzar a Trabajar

Una vez inicializado, seguir las guías en cada fase del proyecto.

## 🔧 Configuración AWC

El directorio \`.awc/\` contiene:

- \`agents/\` - 4 agentes base + 22 agentes especializados
- \`workflows/\` - 8 workflows completos
- \`templates/\` - 7 templates profesionales
- \`config.json\` - Configuración del proyecto

## 📝 Comandos Disponibles

\`\`\`bash
# Inicializar proyecto (siguiente paso)
awc init

# Ver estado del proyecto
awc status

# Validar estructura
awc validate

# Ver configuración
awc config
\`\`\`

---

Generado con ❤️ usando AWC ZNS-MTD Method v${getVersion()}
`;
}

/**
 * Crea el contenido del .gitignore
 */
function createGitignoreContent() {
  return `# Dependencies
node_modules/
vendor/
bower_components/

# Build outputs
dist/
build/
out/
target/
*.exe
*.dll
*.so
*.dylib

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.*.local

# OS
Thumbs.db
.DS_Store

# Temporary files
tmp/
temp/
*.tmp

# Coverage
coverage/
*.lcov
.nyc_output/

# Confidential (keep locally, never commit)
**/client-docs/contratos/
**/client-docs/accesos/
**/*-confidential.*
`;
}

/**
 * Crea contenido de NEXT_STEPS.md
 */
function createNextStepsContent(projectName) {
  return `# 🎯 Próximos Pasos - ${projectName}

## ¿Qué hacer ahora?

Tu proyecto ha sido creado con la **estructura base** de AWC ZNS-MTD.

### 📌 Paso 1: Inicializar el Proyecto

Ejecuta el comando de inicialización:

\`\`\`bash
awc init
\`\`\`

### 🔍 ¿Qué hace \`awc init\`?

El comando \`awc init\` te preguntará:

#### 1️⃣ Tipo de Proyecto
- **🔍 Auditoría de Código Existente**: Evaluar sistema legacy
- **🆕 Desarrollo Desde Cero**: Nuevo proyecto desde cero
- **🔄 Migración/Modernización**: Migrar sistema existente
- **🛠️ Mantenimiento/Soporte**: Dar soporte a sistema existente
- **📱 Aplicación Móvil**: App iOS/Android
- **🌐 API/Microservicios**: Backend services
- **🏢 Sistema Empresarial**: ERP, CRM, etc.

#### 2️⃣ Workflow Recomendado
- **⚡ Quick**: Proyectos pequeños (1-2 semanas)
- **📊 Standard**: Proyectos medianos (1-3 meses)
- **🏢 Enterprise**: Proyectos grandes (3+ meses)

#### 3️⃣ Stack Tecnológico
- Backend: Java, .NET, Python, PHP, Node.js
- Frontend: React, Angular, Vue
- Base de datos: SQL, NoSQL

### ✅ Resultado de \`awc init\`

Basado en tus respuestas, creará automáticamente:

- ✅ **Estructura de fases** (01-comercial, 02-inception, 03-analysis, etc.)
- ✅ **Directorios client-docs/** específicos para tu tipo de proyecto
- ✅ **Templates** relevantes copiados a cada fase
- ✅ **Agentes especializados** cargados según tu stack
- ✅ **Guías START_HERE.md** en cada fase

### 📂 Ejemplos de Estructura Según Tipo

**Auditoría de Código**:
\`\`\`
proyecto/
├── 01-comercial/          # Discovery y contrato
├── 03-analysis/           # PRINCIPAL: Auditoría completa
│   ├── docs/client-docs/  # Código existente del cliente
│   └── reports/           # Reportes de auditoría
├── 04-planning/           # Plan de mejoras
└── 08-support/            # Recomendaciones
\`\`\`

**Desarrollo Desde Cero**:
\`\`\`
proyecto/
├── 01-comercial/          # Discovery
├── 02-inception/          # PRINCIPAL: PRD y diseño
├── 04-planning/           # Sprints
├── 05-development/        # PRINCIPAL: Implementación
│   ├── src/
│   └── tests/
├── 06-qa/                 # Testing
└── 07-deployment/         # Despliegue
\`\`\`

**Migración/Modernización**:
\`\`\`
proyecto/
├── 01-comercial/          # Análisis de viabilidad
├── 03-analysis/           # PRINCIPAL: Análisis de sistema legacy
│   ├── docs/client-docs/  # Documentación sistema actual
│   └── migration-plan/
├── 05-development/        # Desarrollo nuevo sistema
└── 07-deployment/         # Plan de migración
\`\`\`

### 🎯 Comandos Útiles

\`\`\`bash
# Inicializar proyecto
awc init

# Ver estado actual
awc status

# Validar estructura
awc validate

# Ver configuración
awc config
\`\`\`

### 📚 Más Información

- **Documentación**: [README.md](./README.md)
- **Agentes**: Revisa \`.awc/agents/\` para ver los 26 agentes disponibles
- **Workflows**: Consulta \`.awc/workflows/\` para ver los 8 workflows
- **Templates**: Usa \`.awc/templates/\` para documentos profesionales

---

🚀 **¡Listo para empezar!** Ejecuta \`awc init\` ahora.
`;
}

/**
 * Crea configuración de VS Code para cargar AWC automáticamente
 */
async function createVSCodeConfig(projectPath, projectName) {
  const vscodeDir = path.join(projectPath, '.vscode');
  await fs.ensureDir(vscodeDir);

  // settings.json
  const settings = {
    "github.copilot.enable": {
      "*": true
    },
    "github.copilot.advanced": {},
    "files.associations": {
      "*.agent.yaml": "yaml",
      "copilot-instructions.md": "markdown"
    },
    "files.exclude": {
      "**/.git": true,
      "**/.DS_Store": true,
      "**/node_modules": true
    },
    "search.exclude": {
      "**/node_modules": true,
      "**/bower_components": true,
      "**/*.code-search": true
    },
    "awc-zns-mtd.enabled": true,
    "awc-zns-mtd.autoLoadInstructions": true
  };

  await fs.writeJson(
    path.join(vscodeDir, 'settings.json'),
    settings,
    { spaces: 2 }
  );

  // extensions.json
  const extensions = {
    "recommendations": [
      "github.copilot",
      "github.copilot-chat",
      "redhat.vscode-yaml",
      "yzhang.markdown-all-in-one"
    ]
  };

  await fs.writeJson(
    path.join(vscodeDir, 'extensions.json'),
    extensions,
    { spaces: 2 }
  );

  // workspace file
  const workspace = {
    "folders": [
      {
        "path": ".",
        "name": projectName
      }
    ],
    "settings": {
      "github.copilot.enable": {
        "*": true
      },
      "awc-zns-mtd.enabled": true
    },
    "extensions": {
      "recommendations": [
        "github.copilot",
        "github.copilot-chat"
      ]
    }
  };

  await fs.writeJson(
    path.join(projectPath, `${projectName}.code-workspace`),
    workspace,
    { spaces: 2 }
  );
}

module.exports = { newProjectCommand };
