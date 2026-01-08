/**
 * Comando: new
 * Crea un nuevo proyecto con estructura completa AWC ZNS-MTD
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
      ],
      default: options.type
    },
    {
      type: 'input',
      name: 'description',
      message: '📝 Descripción breve del proyecto:',
      default: `Proyecto ${projectName}`
    },
    {
      type: 'list',
      name: 'teamSize',
      message: '👥 Tamaño del equipo:',
      choices: [
        { name: 'Individual (1 persona)', value: 'solo' },
        { name: 'Pequeño (2-5 personas)', value: 'small' },
        { name: 'Mediano (6-15 personas)', value: 'medium' },
        { name: 'Grande (16+ personas)', value: 'large' }
      ]
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: '🔧 Inicializar repositorio Git?',
      default: true
    }
  ]);

  const spinner = ora('Creando estructura del proyecto...').start();

  try {
    // 1. Crear directorio raíz del proyecto
    await fs.ensureDir(projectPath);
    spinner.text = `Directorio ${projectName} creado`;

    // 2. Crear estructura estándar de directorios
    const directories = [
      // Fase 0: Comercial
      '01-comercial/01-prospection',
      '01-comercial/02-technical-proposal',
      '01-comercial/03-quotation',
      '01-comercial/04-contract',
      '01-comercial/docs/client-docs/requerimientos',
      '01-comercial/docs/client-docs/presentaciones',
      '01-comercial/docs/client-docs/contratos',
      
      // Fase 1: Inception
      '02-inception/01-kickoff',
      '02-inception/02-prd',
      '02-inception/03-backlog',
      '02-inception/04-release-planning',
      '02-inception/docs/client-docs/procesos',
      '02-inception/docs/client-docs/manuales',
      '02-inception/docs/client-docs/imagenes',
      
      // Fase 2: Análisis
      '03-analysis/01-code-audit',
      '03-analysis/02-architecture-review',
      '03-analysis/03-technical-debt',
      '03-analysis/04-recommendations',
      '03-analysis/docs/client-docs/arquitectura',
      '03-analysis/docs/client-docs/databases',
      '03-analysis/docs/client-docs/especificaciones',
      
      // Fase 3: Planificación
      '04-planning/01-sprint-planning',
      '04-planning/02-backlog-refinement',
      '04-planning/03-release-planning',
      '04-planning/04-roadmap',
      '04-planning/docs/client-docs/historias',
      '04-planning/docs/client-docs/estimaciones',
      
      // Fase 4: Desarrollo
      '05-development/src',
      '05-development/tests',
      '05-development/docs',
      '05-development/docs/client-docs/apis',
      '05-development/docs/client-docs/integraciones',
      '05-development/docs/client-docs/recursos',
      
      // Fase 5: QA
      '06-qa/test-plans',
      '06-qa/test-cases',
      '06-qa/test-results',
      '06-qa/bug-reports',
      '06-qa/docs/client-docs/criterios-aceptacion',
      '06-qa/docs/client-docs/escenarios-prueba',
      
      // Fase 6: Deployment
      '07-deployment/environments',
      '07-deployment/scripts',
      '07-deployment/logs',
      '07-deployment/docs/client-docs/infraestructura',
      '07-deployment/docs/client-docs/accesos',
      
      // Fase 7: Soporte
      '08-support/incidents',
      '08-support/bug-fixes',
      '08-support/maintenance',
      '08-support/docs/client-docs/incidentes',
      '08-support/docs/client-docs/cambios',
      
      // Documentación general
      'docs/architecture',
      'docs/adr',
      'docs/api',
      'docs/guides',
      
      // Configuración AWC
      '.awc/agents',
      '.awc/workflows',
      '.awc/templates'
    ];

    for (const dir of directories) {
      await fs.ensureDir(path.join(projectPath, dir));
    }
    spinner.text = 'Estructura de directorios creada';

    // 3. Copiar templates
    const srcTemplatesPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/templates');
    const destTemplatesPath = path.join(projectPath, '.awc/templates');
    
    if (await fs.pathExists(srcTemplatesPath)) {
      await fs.copy(srcTemplatesPath, destTemplatesPath);
      spinner.text = 'Templates copiados';
    }

    // 4. Copiar workflows
    const srcWorkflowsPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/workflows');
    const destWorkflowsPath = path.join(projectPath, '.awc/workflows');
    
    if (await fs.pathExists(srcWorkflowsPath)) {
      await fs.copy(srcWorkflowsPath, destWorkflowsPath);
      spinner.text = 'Workflows copiados';
    }

    // 5. Copiar agentes
    const srcAgentsPath = path.join(__dirname, '../../../src/modules/awc-zns-mtd/agents');
    const destAgentsPath = path.join(projectPath, '.awc/agents');
    
    if (await fs.pathExists(srcAgentsPath)) {
      await fs.copy(srcAgentsPath, destAgentsPath);
      spinner.text = 'Agentes copiados';
    }

    // 6. Crear archivo de configuración AWC
    const awcConfig = {
      version: getVersion(),
      createdAt: new Date().toISOString(),
      project: {
        name: projectName,
        description: answers.description,
        type: answers.projectType,
        teamSize: answers.teamSize
      },
      preferences: {
        communication_language: 'Spanish',
        document_output_language: 'Spanish',
        code_language: 'English'
      },
      workflows: {
        current_phase: 'comercial',
        completed_phases: []
      }
    };

    await fs.writeJson(
      path.join(projectPath, '.awc/config.json'),
      awcConfig,
      { spaces: 2 }
    );
    spinner.text = 'Configuración AWC creada';

    // 7. Crear README.md del proyecto
    const readme = createReadmeContent(projectName, answers);
    await fs.writeFile(path.join(projectPath, 'README.md'), readme);
    spinner.text = 'README.md creado';

    // 8. Crear .gitignore
    const gitignore = createGitignoreContent();
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
    spinner.text = '.gitignore creado';

    // 9. Crear archivo de inicio para cada fase
    await createPhaseGuides(projectPath);
    spinner.text = 'Guías de fase creadas';

    // 9.0. Crear README para client-docs
    await createClientDocsReadmes(projectPath);
    spinner.text = 'README de client-docs creados';

    // 9.1. Crear configuración de VS Code
    await createVSCodeConfig(projectPath);
    spinner.text = 'Configuración VS Code creada';

    // 9.2. Copiar copilot-instructions.md
    const githubDir = path.join(projectPath, '.github');
    await fs.ensureDir(githubDir);
    const templateCopilotPath = path.join(__dirname, '../../../templates/.github/copilot-instructions.md');
    if (await fs.pathExists(templateCopilotPath)) {
      await fs.copy(templateCopilotPath, path.join(githubDir, 'copilot-instructions.md'));
      spinner.text = 'GitHub Copilot instructions creadas';
    }

    // 10. Inicializar Git si se solicitó
    if (answers.gitInit) {
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
    console.log(chalk.cyan('📦 Resumen del Proyecto'));
    console.log(chalk.cyan('═'.repeat(60) + '\n'));

    console.log(`${chalk.gray('Nombre:')}        ${chalk.green(projectName)}`);
    console.log(`${chalk.gray('Tipo:')}          ${chalk.yellow(answers.projectType)}`);
    console.log(`${chalk.gray('Equipo:')}        ${chalk.yellow(answers.teamSize)}`);
    console.log(`${chalk.gray('Ubicación:')}     ${chalk.blue(projectPath)}`);
    console.log(`${chalk.gray('AWC Versión:')}   ${chalk.yellow(getVersion())}\n`);

    // Próximos pasos
    console.log(chalk.cyan('📚 Próximos Pasos:\n'));
    console.log(`  ${chalk.green('1.')} cd ${projectName}`);
    console.log(`  ${chalk.green('2.')} Revisar ${chalk.yellow('01-comercial/START_HERE.md')}`);
    console.log(`  ${chalk.green('3.')} Completar discovery notes y análisis de viabilidad`);
    console.log(`  ${chalk.green('4.')} Ejecutar ${chalk.yellow('awc status')} para ver el progreso\n`);

    console.log(chalk.cyan('🎯 Flujo de Trabajo Recomendado:\n'));
    console.log(`  ${chalk.gray('→')} Comercial    (01-comercial/)`);
    console.log(`  ${chalk.gray('→')} Inception    (02-inception/)`);
    console.log(`  ${chalk.gray('→')} Análisis     (03-analysis/)`);
    console.log(`  ${chalk.gray('→')} Planificación (04-planning/)`);
    console.log(`  ${chalk.gray('→')} Desarrollo   (05-development/)`);
    console.log(`  ${chalk.gray('→')} QA           (06-qa/)`);
    console.log(`  ${chalk.gray('→')} Deployment   (07-deployment/)`);
    console.log(`  ${chalk.gray('→')} Soporte      (08-support/)\n`);

    console.log(chalk.green('✨ ¡Listo para comenzar tu proyecto!\n'));

  } catch (error) {
    spinner.fail(chalk.red('❌ Error creando proyecto'));
    throw error;
  }
}

/**
 * Crea el contenido del README.md
 */
function createReadmeContent(projectName, answers) {
  return `# ${projectName}

> ${answers.description}

## 📋 Información del Proyecto

- **Tipo**: ${answers.projectType}
- **Equipo**: ${answers.teamSize}
- **Metodología**: AWC ZNS-MTD (Zen, Neutro, Sistemático)

## 🚀 Fases del Proyecto

Este proyecto sigue el método AWC ZNS-MTD con 8 fases completas:

### 📊 Fase 0: Comercial (01-comercial/)
- Prospección y discovery
- Oferta técnica
- Cotización
- Contrato

### 🎯 Fase 1: Inception (02-inception/)
- Kickoff meeting
- Product Requirements Document (PRD)
- Backlog inicial
- Release planning

### 🔍 Fase 2: Análisis (03-analysis/)
- Code audit (si aplica)
- Architecture review
- Technical debt assessment
- Recomendaciones

### 📅 Fase 3: Planificación (04-planning/)
- Sprint planning
- Backlog refinement
- Release planning
- Product roadmap

### 💻 Fase 4: Desarrollo (05-development/)
- Implementación TDD
- Code review
- CI/CD

### ✅ Fase 5: QA (06-qa/)
- Test planning
- Automated testing
- Manual testing
- UAT

### 🚀 Fase 6: Deployment (07-deployment/)
- Pre-deployment
- Staging
- Production
- Post-deployment

### 🛠️ Fase 7: Soporte (08-support/)
- Incident response
- Bug fixing
- Maintenance
- Monitoring

## 📚 Documentación

Toda la documentación del proyecto se encuentra en el directorio \`docs/\`:

- \`docs/architecture/\` - Diagramas y decisiones arquitectónicas
- \`docs/adr/\` - Architecture Decision Records
- \`docs/api/\` - Documentación de APIs
- \`docs/guides/\` - Guías de desarrollo y deployment

## 🔧 Configuración AWC

El directorio \`.awc/\` contiene:

- \`agents/\` - Agentes especializados AWC ZNS-MTD
- \`workflows/\` - Workflows para cada fase
- \`templates/\` - Templates de documentos
- \`config.json\` - Configuración del proyecto

## 🎯 Estado Actual

**Fase actual**: Comercial (inicio)

Revisar \`01-comercial/START_HERE.md\` para comenzar.

## 📝 Comandos AWC

\`\`\`bash
# Ver estado del proyecto
awc status

# Validar estructura
awc validate

# Ver configuración
awc config
\`\`\`

---

Generado con ❤️ usando AWC ZNS-MTD Method
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
.DS_Store

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
01-comercial/04-contract/*.pdf
**/confidential/
**/*-confidential.*
`;
}

/**
 * Crea guías de inicio para cada fase
 */
async function createPhaseGuides(projectPath) {
  const phases = [
    {
      dir: '01-comercial',
      title: 'Fase 0: Comercial',
      content: `# 🎯 START HERE - Fase Comercial

## Objetivo
Capturar requisitos del cliente, evaluar viabilidad y generar oferta comercial.

## Pasos a seguir

### 1. Discovery & Prospección
📂 Directorio: \`01-prospection/\`

- [ ] Completar \`.awc/templates/discovery-notes.md\`
- [ ] Identificar stakeholders clave
- [ ] Entender el problema de negocio
- [ ] Documentar contexto actual

### 2. Análisis de Viabilidad
📂 Directorio: \`01-prospection/\`

- [ ] Completar \`.awc/templates/viabilidad.md\`
- [ ] Evaluar viabilidad técnica
- [ ] Evaluar viabilidad económica
- [ ] Identificar riesgos principales

### 3. Oferta Técnica
📂 Directorio: \`02-technical-proposal/\`

- [ ] Copiar template: \`.awc/templates/oferta-comercial.md\`
- [ ] Definir solución propuesta
- [ ] Especificar stack tecnológico
- [ ] Definir alcance y exclusiones

### 4. Cotización
📂 Directorio: \`03-quotation/\`

- [ ] Copiar template: \`.awc/templates/cotizacion.md\`
- [ ] Estimar esfuerzo por fase
- [ ] Calcular costos
- [ ] Definir cronograma

### 5. Contrato (confidencial)
📂 Directorio: \`04-contract/\`

- [ ] Negociar términos
- [ ] Firmar contrato
- [ ] Mover a siguiente fase

## ✅ Criterios de Salida
- ✅ Contrato firmado
- ✅ Cliente aprobó oferta y cotización
- ✅ Equipo asignado
- ✅ Fecha de kickoff definida

## ➡️ Siguiente Fase
Una vez completado, pasar a **02-inception/**
`
    },
    {
      dir: '02-inception',
      title: 'Fase 1: Inception',
      content: `# 🚀 START HERE - Fase Inception

## Objetivo
Arranque formal del proyecto, definir PRD y backlog inicial.

## Pasos a seguir

### 1. Kickoff Meeting
📂 Directorio: \`01-kickoff/\`

- [ ] Copiar template: \`.awc/templates/kickoff-agenda.md\`
- [ ] Presentar equipo
- [ ] Alinear expectativas
- [ ] Definir canales de comunicación

### 2. Product Requirements Document (PRD)
📂 Directorio: \`02-prd/\`

- [ ] Copiar template: \`.awc/templates/PRD-template.md\`
- [ ] Documentar requisitos funcionales
- [ ] Documentar requisitos no funcionales
- [ ] Definir user personas
- [ ] Mapear user journeys

### 3. Backlog Inicial
📂 Directorio: \`03-backlog/\`

- [ ] Crear user stories
- [ ] Priorizar backlog (MoSCoW)
- [ ] Estimar user stories (Planning Poker)
- [ ] Crear epic mapping

### 4. Release Planning
📂 Directorio: \`04-release-planning/\`

- [ ] Definir MVP (release 1)
- [ ] Planificar releases subsecuentes
- [ ] Crear roadmap de producto
- [ ] Definir milestones

## ✅ Criterios de Salida
- ✅ PRD aprobado por stakeholders
- ✅ Backlog priorizado y estimado
- ✅ Release plan definido
- ✅ Sprint 1 planificado

## ➡️ Siguiente Fase
Dependiendo del proyecto:
- Proyecto nuevo → **04-planning/** (skip análisis)
- Proyecto existente → **03-analysis/**
`
    },
    {
      dir: '05-development',
      title: 'Fase 4: Desarrollo',
      content: `# 💻 START HERE - Fase Desarrollo

## Objetivo
Implementar user stories siguiendo TDD y mejores prácticas.

## Estructura
\`\`\`
05-development/
├── src/           # Código fuente
├── tests/         # Tests (unit, integration, e2e)
└── docs/          # Documentación técnica
\`\`\`

## Pasos a seguir

### 1. Feature Kickoff
- [ ] Seleccionar user story del sprint backlog
- [ ] Revisar acceptance criteria
- [ ] Diseño técnico (si es necesario)
- [ ] Crear feature branch

### 2. Development (TDD)
- [ ] **RED**: Escribir test que falla
- [ ] **GREEN**: Implementar código mínimo para pasar test
- [ ] **REFACTOR**: Mejorar código manteniendo tests en verde
- [ ] Repetir ciclo

### 3. Code Review
- [ ] Crear Pull Request
- [ ] Solicitar revisión (mínimo 2 aprobadores)
- [ ] Aplicar feedback
- [ ] Aprobar PR

### 4. Integration
- [ ] Merge a develop/main
- [ ] CI/CD automático ejecuta tests
- [ ] Deploy automático a dev/staging

## 🎯 Mejores Prácticas
- ✅ Feature branches (feature/US-123-login)
- ✅ Commits frecuentes y descriptivos
- ✅ PRs pequeños (<400 líneas)
- ✅ Code coverage >80%
- ✅ SonarQube sin critical issues

## ➡️ Siguiente Fase
Una vez features completas → **06-qa/**
`
    }
  ];

  for (const phase of phases) {
    const filePath = path.join(projectPath, phase.dir, 'START_HERE.md');
    await fs.writeFile(filePath, phase.content);
  }
}

/**
 * Crea README.md en directorios client-docs
 */
async function createClientDocsReadmes(projectPath) {
  const clientDocsReadmes = [
    {
      path: '01-comercial/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Comercial

Este directorio contiene toda la documentación proporcionada por el cliente durante la fase comercial.

## 📂 Estructura

### requerimientos/
Documentos de requerimientos del cliente:
- PDFs con especificaciones funcionales
- Word con listados de requerimientos
- Excel con matrices de requerimientos
- Presentaciones con necesidades del negocio

### presentaciones/
Presentaciones del cliente:
- Decks ejecutivos
- Presentaciones de producto actual
- Material de marketing
- Diagramas de flujo de negocio

### contratos/
Documentos contractuales (CONFIDENCIAL):
- Contratos firmados
- NDAs
- SOWs (Statement of Work)
- Anexos contractuales

⚠️ **IMPORTANTE**: Los archivos en \`contratos/\` están en .gitignore por defecto.

## 📝 Buenas Prácticas

1. **Nomenclatura**: Usar formato \`YYYYMMDD-nombre-descriptivo.ext\`
   - ✅ \`20260107-requerimientos-funcionales-v1.pdf\`
   - ❌ \`documento.pdf\`

2. **Versionado**: Incluir versión en el nombre
   - \`requerimientos-v1.0.docx\`
   - \`requerimientos-v1.1.docx\`

3. **Organización**: Un archivo por tipo de documento
   - No mezclar requerimientos con contratos
   - Mantener presentaciones separadas

4. **Respaldo**: Mantener originales intactos
   - No editar documentos del cliente
   - Crear copias de trabajo si es necesario
`
    },
    {
      path: '02-inception/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Inception

Este directorio contiene la documentación del cliente relevante para el inicio del proyecto.

## 📂 Estructura

### procesos/
Diagramas y documentación de procesos actuales:
- Diagramas de flujo (BPMN, Visio)
- Mapas de procesos de negocio
- Descripciones de workflows actuales
- Casos de uso documentados

### manuales/
Manuales de usuario de sistemas existentes:
- Manuales de usuario en PDF/Word
- Guías de operación
- Documentación de sistemas legacy
- FAQs del sistema actual

### imagenes/
Material visual del cliente:
- Screenshots de sistemas actuales
- Wireframes/mockups proporcionados
- Logos y branding guidelines
- Fotografías de procesos físicos
- Diagramas y esquemas

## 📝 Uso Recomendado

**procesos/**: Usar para entender flujos actuales y diseñar mejoras
**manuales/**: Referencia para features esperados en el nuevo sistema  
**imagenes/**: Material visual para PRD y documentación

## ⚠️ Importante
- Estos documentos son REFERENCIA, no especificaciones finales
- Validar con stakeholders antes de implementar
- Mantener trazabilidad con el PRD
`
    },
    {
      path: '03-analysis/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Análisis

Documentación técnica del cliente para auditoría y análisis.

## 📂 Estructura

### arquitectura/
Diagramas arquitectónicos actuales:
- Diagramas de arquitectura (C4, UML)
- Diagramas de red e infraestructura
- Diagramas de componentes
- Documentos de diseño técnico

### databases/
Documentación de bases de datos:
- Esquemas de base de datos (ERD)
- Modelos de datos en PDF/Visio
- Scripts SQL de estructura
- Diccionarios de datos
- Excel con tablas y campos

### especificaciones/
Especificaciones técnicas:
- Documentos de APIs existentes (Swagger, Postman)
- Especificaciones de interfaces
- Protocolos de integración
- Documentación de servicios web

## 🎯 Objetivo

Entender la arquitectura actual para:
- Identificar technical debt
- Planificar migraciones
- Diseñar integraciones
- Evaluar impacto de cambios

## 📊 Artefactos Generados

A partir de esta documentación, el equipo AWC generará:
- Reporte de auditoría de código
- Análisis de arquitectura
- Assessment de technical debt
- Recomendaciones de mejora
`
    },
    {
      path: '04-planning/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Planificación

Documentación del cliente para planificación de sprints.

## 📂 Estructura

### historias/
User stories y casos de uso del cliente:
- Word/Excel con historias de usuario
- Casos de uso detallados
- Escenarios de negocio
- Criterios de aceptación iniciales

### estimaciones/
Material para estimación:
- Hojas de cálculo con estimaciones del cliente
- Referencias de proyectos similares
- Benchmarks de performance esperado
- Constraints de tiempo/presupuesto

## 💡 Uso

Esta documentación ayuda a:
- Refinar user stories del backlog
- Validar estimaciones del equipo
- Alinear expectativas de tiempos
- Priorizar features según negocio
`
    },
    {
      path: '05-development/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Desarrollo

Recursos técnicos del cliente necesarios para implementación.

## 📂 Estructura

### apis/
Documentación de APIs a integrar:
- Swagger/OpenAPI specs
- Colecciones de Postman
- WSDL de servicios SOAP
- Documentación de endpoints REST
- Credenciales de acceso (sandbox/test)

### integraciones/
Sistemas externos a integrar:
- Manuales de integración
- Diagramas de flujo de integración
- Mappings de campos
- Ejemplos de payloads XML/JSON
- Certificados SSL/TLS

### recursos/
Assets para la aplicación:
- Imágenes para UI (logos, iconos)
- Archivos de diseño (Figma, Sketch exports)
- Fuentes corporativas
- Guidelines de branding
- Templates de documentos

## 🔧 Integración

**Antes de integrar**:
1. Validar credenciales en ambiente de pruebas
2. Revisar rate limits y SLAs
3. Documentar endpoints en Swagger local
4. Crear tests de integración

**Durante desarrollo**:
- Mantener colecciones de Postman actualizadas
- Documentar cambios en APIs
- Reportar issues de integración al cliente
`
    },
    {
      path: '06-qa/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase QA

Material del cliente para validación y pruebas.

## 📂 Estructura

### criterios-aceptacion/
Criterios de aceptación del cliente:
- Excel/Word con criterios de aceptación
- Checklist de features esperados
- Requerimientos no funcionales (SLA, performance)
- Escenarios de validación de negocio

### escenarios-prueba/
Escenarios de prueba proporcionados:
- Casos de prueba del cliente
- Datos de prueba (datasets CSV/Excel)
- Scripts de carga de datos
- Escenarios end-to-end prioritarios

## ✅ Validación

Esta documentación se usa para:
1. Crear test cases alineados con expectativas
2. Generar datos de prueba realistas
3. Validar acceptance criteria
4. Preparar UAT con el cliente

## 📋 UAT (User Acceptance Testing)

Coordinar con cliente:
- [ ] Ambiente de UAT preparado
- [ ] Usuarios de prueba creados
- [ ] Datasets cargados
- [ ] Sesiones de UAT agendadas
- [ ] Formulario de signoff preparado
`
    },
    {
      path: '07-deployment/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Deployment

Información de infraestructura del cliente para deployment.

## 📂 Estructura

### infraestructura/
Documentación de infraestructura del cliente:
- Diagramas de red
- Especificaciones de servidores
- Configuraciones de firewalls
- IPs y rangos asignados
- Políticas de seguridad

### accesos/
Credenciales y accesos (CONFIDENCIAL):
- Credenciales de servidores
- VPN configs
- Certificados SSL
- API keys de producción
- Passwords de bases de datos

⚠️ **CRÍTICO**: 
- Archivos en esta carpeta están en .gitignore
- Usar gestor de secretos (Azure Key Vault, AWS Secrets Manager)
- NUNCA commitear credenciales al repositorio

## 🚀 Pre-Deployment Checklist

- [ ] Accesos a servidores validados
- [ ] VPN configurada y probada
- [ ] DNS apuntando correctamente
- [ ] Certificados SSL instalados
- [ ] Firewall rules configurados
- [ ] Backup de producción realizado
`
    },
    {
      path: '08-support/docs/client-docs/README.md',
      content: `# 📄 Documentación del Cliente - Fase Soporte

Documentación de incidentes y solicitudes del cliente.

## 📂 Estructura

### incidentes/
Reportes de incidentes del cliente:
- Screenshots de errores
- Logs proporcionados por el cliente
- Videos reproduciendo issues
- Reportes de usuarios finales

### cambios/
Solicitudes de cambio:
- Change requests (PDFs/Word)
- Nuevos requerimientos post-lanzamiento
- Solicitudes de mejoras
- Feedback de usuarios

## 🎫 Gestión de Incidentes

**Flujo recomendado**:
1. Cliente reporta → Copiar evidencia a \`incidentes/\`
2. Crear ticket en sistema de tracking
3. Reproducir y documentar en \`08-support/incidents/\`
4. Resolver y validar con cliente

**Nomenclatura**:
- \`INC-001-descripcion-corta/\` (subdirectorio por incidente)
- Dentro: screenshots, logs, análisis, solución

## 📝 Change Requests

**Evaluación**:
1. Cliente envía CR → Guardar en \`cambios/\`
2. Equipo analiza impacto (tiempo/costo)
3. Aprobar/rechazar con justificación
4. Si aprobado → Crear user stories en backlog
`
    }
  ];

  for (const readme of clientDocsReadmes) {
    const filePath = path.join(projectPath, readme.path);
    await fs.writeFile(filePath, readme.content);
  }
}

/**
 * Crea configuración de VS Code para cargar AWC automáticamente
 */
async function createVSCodeConfig(projectPath) {
  const vscodeDir = path.join(projectPath, '.vscode');
  await fs.ensureDir(vscodeDir);

  // settings.json - Configuración de workspace
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

  // extensions.json - Extensiones recomendadas
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

  // AWC-ZNS-MTD.code-workspace - Workspace file
  const workspace = {
    "folders": [
      {
        "path": ".",
        "name": path.basename(projectPath)
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
    path.join(projectPath, `${path.basename(projectPath)}.code-workspace`),
    workspace,
    { spaces: 2 }
  );
}

module.exports = { newProjectCommand };
