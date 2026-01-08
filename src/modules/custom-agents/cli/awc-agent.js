#!/usr/bin/env node

/**
 * AWC Agent CLI - Gestión automática de agentes custom
 * Framework: AWC-ZNS-MTD v1.0.0
 * Uso: awc-agent <comando> [opciones]
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Colores para terminal (expandidos)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  bgCyan: '\x1b[46m',
  bgGreen: '\x1b[42m',
  bgBlue: '\x1b[44m'
};

// Logo AWC
function displayLogo() {
  console.log();
  console.log(`${colors.cyan + colors.bright}     █████╗ ██╗    ██╗ ██████╗`);
  console.log('    ██╔══██╗██║    ██║██╔════╝');
  console.log('    ███████║██║ █╗ ██║██║     ');
  console.log('    ██╔══██║██║███╗██║██║     ');
  console.log('    ██║  ██║╚███╔███╔╝╚██████╗');
  console.log(`    ╚═╝  ╚═╝ ╚══╝╚══╝  ╚═════╝${colors.reset}`);
  console.log();
  console.log(`${colors.magenta + colors.bright}  ╔═══════════════════════════════╗`);
  console.log(`  ║   ${colors.white}ZNS-MTD Agent Framework${colors.magenta}   ║`);
  console.log(
    `  ║ ${colors.dim}${colors.white}Zen • Neutro • Sistemático${colors.magenta}${colors.bright}  ║`
  );
  console.log(`  ╚═══════════════════════════════╝${colors.reset}`);
  console.log();
  console.log(`${colors.dim}  🚀 22 Agentes Especializados | 191 Workflows${colors.reset}`);
  console.log();
}

// Detectar si está instalado globalmente desde NPM o local
const isGlobalInstall = !fs.existsSync(path.join(__dirname, '../agents'));
const AGENTS_DATA_DIR = isGlobalInstall
  ? path.join(__dirname, 'agents-data')
  : path.join(__dirname, '../agents');
const CONFIG_FILE = isGlobalInstall
  ? path.join(__dirname, 'config.yaml')
  : path.join(__dirname, '../config.yaml');
const WORKSPACE_AGENTS_DIR = path.join(process.cwd(), '.awc-agents');

// Cargar configuración
function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
  return yaml.load(configContent);
}

// Listar todos los agentes
function listAgents() {
  const config = loadConfig();

  displayLogo();
  console.log(
    `${colors.bright}${colors.bgCyan}${colors.white} 📋 AGENTES DISPONIBLES ${colors.reset} ${colors.dim}22 agentes • 191 workflows${colors.reset}\n`
  );

  const categories = {
    Frontend: [],
    Backend: [],
    Infrastructure: [],
    Architecture: [],
    Quality: [],
    Business: [],
    AI: [],
    Documentation: []
  };

  // Organizar por categoría
  config.module.agents.forEach((agent, index) => {
    const cat =
      agent.category === 'development'
        ? agent.subcategory === 'frontend' || agent.subcategory === 'mobile'
          ? 'Frontend'
          : 'Backend'
        : agent.category === 'infrastructure'
          ? 'Infrastructure'
          : agent.category === 'architecture'
            ? 'Architecture'
            : agent.category === 'quality'
              ? 'Quality'
              : agent.category === 'business'
                ? 'Business'
                : agent.category === 'ai'
                  ? 'AI'
                  : 'Documentation';

    categories[cat].push({ ...agent, index: index + 1 });
  });

  // Mostrar por categoría con diseño mejorado
  Object.entries(categories).forEach(([category, agents]) => {
    if (agents.length === 0) {
      return;
    }

    const icon = getCategoryIcon(category);
    console.log(
      `${colors.bright}${colors.blue}╭─ ${icon}  ${category.toUpperCase()}${colors.reset} ${colors.dim}(${agents.length} agentes)${colors.reset}`
    );

    agents.forEach((agent, idx) => {
      const isLast = idx === agents.length - 1;
      const prefix = isLast ? '╰─' : '├─';
      console.log(
        `${colors.blue}${prefix}${colors.reset} ${colors.bright}${colors.green}${agent.index.toString().padStart(2, '0')}${colors.reset} ${colors.dim}│${colors.reset} ${colors.cyan}${agent.id.padEnd(36)}${colors.reset} ${colors.dim}│${colors.reset} ${colors.yellow}${agent.workflows} workflows${colors.reset}`
      );
    });
    console.log('');
  });

  console.log(
    `${colors.bright}${colors.magenta}┌─────────────────────────────────────────────────────────┐${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}│${colors.reset} ${colors.yellow}💡 Comandos rápidos:${colors.reset}                                   ${colors.bright}${colors.magenta}│${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}│${colors.reset}   ${colors.cyan}awc-agent load 1${colors.reset}      ${colors.dim}→ Cargar agente #1${colors.reset}           ${colors.bright}${colors.magenta}│${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}│${colors.reset}   ${colors.cyan}awc-agent search java${colors.reset} ${colors.dim}→ Buscar por tecnología${colors.reset}     ${colors.bright}${colors.magenta}│${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}└─────────────────────────────────────────────────────────┘${colors.reset}\n`
  );
}

function getCategoryIcon(category) {
  const icons = {
    Frontend: '🎨',
    Backend: '☕',
    Infrastructure: '🛠️',
    Architecture: '🏗️',
    Quality: '🔍',
    Business: '📊',
    AI: '🤖',
    Documentation: '📄'
  };
  return icons[category] || '📦';
}

// Inicializar agentes en workspace
function initWorkspace() {
  console.log();
  console.log(`${colors.bright}${colors.cyan}⚙️  Inicializando workspace AWC...${colors.reset}\n`);

  // Crear carpeta .awc-agents en el workspace actual
  if (!fs.existsSync(WORKSPACE_AGENTS_DIR)) {
    fs.mkdirSync(WORKSPACE_AGENTS_DIR, { recursive: true });
  }

  // Copiar todos los agentes YAML
  const config = loadConfig();
  let copiedCount = 0;

  config.module.agents.forEach((agent) => {
    const sourceFile = path.join(AGENTS_DATA_DIR, path.basename(agent.file));
    const destFile = path.join(WORKSPACE_AGENTS_DIR, path.basename(agent.file));

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, destFile);
      copiedCount++;
      process.stdout.write(`${colors.dim}  ✓ ${path.basename(agent.file)}${colors.reset}\r`);
    }
  });

  console.log('\n');
  console.log(
    `${colors.bright}${colors.bgGreen}${colors.white} ✅ WORKSPACE INICIALIZADO ${colors.reset}\n`
  );
  console.log(`${colors.dim}╭─────────────────────────────────────────────╮${colors.reset}`);
  console.log(
    `${colors.dim}│${colors.reset} ${colors.cyan}Carpeta:${colors.reset}        ${WORKSPACE_AGENTS_DIR.substring(WORKSPACE_AGENTS_DIR.lastIndexOf(path.sep) + 1).padEnd(23)} ${colors.dim}│${colors.reset}`
  );
  console.log(
    `${colors.dim}│${colors.reset} ${colors.cyan}Agentes:${colors.reset}        ${`${copiedCount}/22`.padEnd(23)} ${colors.dim}│${colors.reset}`
  );
  console.log(`${colors.dim}╰─────────────────────────────────────────────╯${colors.reset}\n`);
  console.log(`${colors.yellow}💡 Siguiente paso:${colors.reset}`);
  console.log(
    `   ${colors.bright}${colors.green}awc-agent load 1${colors.reset} ${colors.dim}# Cargar tu primer agente${colors.reset}\n`
  );
}

// Cargar agente específico
function loadAgent(agentIdOrNumber) {
  const config = loadConfig();
  let agent;

  // Buscar por número o ID
  if (!isNaN(agentIdOrNumber)) {
    const index = parseInt(agentIdOrNumber) - 1;
    agent = config.module.agents[index];
  } else {
    agent = config.module.agents.find((a) => a.id === agentIdOrNumber);
  }

  if (!agent) {
    console.log(`\n${colors.red}❌ Agente no encontrado: ${agentIdOrNumber}${colors.reset}`);
    console.log(
      `${colors.yellow}💡 Usa ${colors.bright}awc-agent list${colors.reset}${colors.yellow} para ver agentes disponibles${colors.reset}\n`
    );
    return;
  }

  // Asegurar que el workspace esté inicializado
  if (!fs.existsSync(WORKSPACE_AGENTS_DIR)) {
    console.log(
      `\n${colors.yellow}⚠️  Inicializando workspace por primera vez...${colors.reset}\n`
    );
    initWorkspace();
  }

  const agentFileName = path.basename(agent.file);
  const workspaceAgentPath = path.join(WORKSPACE_AGENTS_DIR, agentFileName);
  const sourceAgentPath = path.join(AGENTS_DATA_DIR, agentFileName);

  // Copiar agente al workspace si no existe
  if (!fs.existsSync(workspaceAgentPath) && fs.existsSync(sourceAgentPath)) {
    fs.copyFileSync(sourceAgentPath, workspaceAgentPath);
  }

  const agentPath = fs.existsSync(workspaceAgentPath) ? workspaceAgentPath : sourceAgentPath;
  const agentContent = fs.readFileSync(agentPath, 'utf8');
  const agentData = yaml.load(agentContent);

  console.log();
  console.log(
    `${colors.bright}${colors.bgGreen}${colors.white} ✅ AGENTE CARGADO ${colors.reset}\n`
  );
  console.log(
    `${colors.dim}╭──────────────────────────────────────────────────────────╮${colors.reset}`
  );
  console.log(
    `${colors.dim}│${colors.reset} ${colors.cyan}Nombre:${colors.reset}     ${agentData.agent.metadata.name.padEnd(42)} ${colors.dim}│${colors.reset}`
  );
  console.log(
    `${colors.dim}│${colors.reset} ${colors.cyan}ID:${colors.reset}         ${agent.id.padEnd(42)} ${colors.dim}│${colors.reset}`
  );
  console.log(
    `${colors.dim}│${colors.reset} ${colors.cyan}Stack:${colors.reset}      ${agent.stack.slice(0, 3).join(', ').padEnd(42)} ${colors.dim}│${colors.reset}`
  );
  console.log(
    `${colors.dim}│${colors.reset} ${colors.cyan}Workflows:${colors.reset}  ${`${agent.workflows} disponibles`.padEnd(42)} ${colors.dim}│${colors.reset}`
  );
  console.log(
    `${colors.dim}╰──────────────────────────────────────────────────────────╯${colors.reset}\n`
  );

  // Mostrar comando para Copilot Chat con diseño destacado
  console.log(
    `${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}║${colors.reset} ${colors.bright}${colors.yellow}📋 COPIAR EN GITHUB COPILOT CHAT:${colors.reset}                       ${colors.bright}${colors.magenta}║${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}╠════════════════════════════════════════════════════════════╣${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}║${colors.reset}                                                            ${colors.bright}${colors.magenta}║${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}║${colors.reset}  ${colors.bright}${colors.green}#file:.awc-agents/${agentFileName}${colors.reset}  ${colors.bright}${colors.magenta}║${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}║${colors.reset}  ${colors.bright}${colors.green}actúa como este agente, muestra *help${colors.reset}                  ${colors.bright}${colors.magenta}║${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}║${colors.reset}                                                            ${colors.bright}${colors.magenta}║${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`
  );

  // Mostrar workflows disponibles
  if (agentData.agent.workflows && agentData.agent.workflows.list) {
    console.log(`${colors.bright}${colors.blue}🎯 WORKFLOWS DISPONIBLES:${colors.reset}\n`);
    const maxToShow = 5;
    agentData.agent.workflows.list.slice(0, maxToShow).forEach((workflow) => {
      console.log(`  ${colors.green}▸ ${colors.bright}*${workflow.id}${colors.reset}`);
      console.log(`    ${colors.dim}${workflow.description}${colors.reset}\n`);
    });

    if (agentData.agent.workflows.list.length > maxToShow) {
      console.log(
        `  ${colors.dim}... y ${agentData.agent.workflows.list.length - maxToShow} workflows más${colors.reset}\n`
      );
    }
  }
}

// Buscar agente por tecnología
function searchByTech(tech) {
  const config = loadConfig();
  const results = config.module.agents.filter(
    (agent) =>
      agent.stack.some((s) => s.toLowerCase().includes(tech.toLowerCase())) ||
      agent.whenToUse.toLowerCase().includes(tech.toLowerCase())
  );

  if (results.length === 0) {
    console.log(`\n${colors.red}❌ No se encontraron agentes para: ${tech}${colors.reset}`);
    console.log(
      `${colors.yellow}💡 Prueba con: react, java, python, docker, kubernetes, etc.${colors.reset}\n`
    );
    return;
  }

  console.log();
  console.log(
    `${colors.bright}${colors.bgBlue}${colors.white} 🔍 RESULTADOS PARA: ${tech.toUpperCase()} ${colors.reset} ${colors.dim}${results.length} agentes encontrados${colors.reset}\n`
  );

  results.forEach((agent, index) => {
    const agentNumber = config.module.agents.indexOf(agent) + 1;
    const isLast = index === results.length - 1;

    console.log(
      `${colors.dim}${isLast ? '╰─' : '├─'}${colors.reset} ${colors.bright}${colors.green}#${agentNumber.toString().padStart(2, '0')}${colors.reset} ${colors.cyan}${agent.id}${colors.reset}`
    );
    console.log(
      `${colors.dim}${isLast ? '  ' : '│ '}${colors.reset}  ${colors.yellow}↳ ${agent.stack.slice(0, 4).join(' • ')}${colors.reset}`
    );
    console.log(
      `${colors.dim}${isLast ? '  ' : '│ '}${colors.reset}  ${colors.dim}${agent.workflows} workflows disponibles${colors.reset}`
    );
    if (!isLast) {
      console.log(`${colors.dim}│${colors.reset}`);
    }
  });

  console.log();
  console.log(
    `${colors.yellow}💡 Cargar agente:${colors.reset} ${colors.bright}${colors.green}awc-agent load ${config.module.agents.indexOf(results[0]) + 1}${colors.reset}\n`
  );
}

// Mostrar help
function showHelp() {
  displayLogo();

  console.log(`${colors.bright}${colors.cyan}USO:${colors.reset}`);
  console.log(`  ${colors.dim}awc-agent <comando> [opciones]${colors.reset}\n`);

  console.log(`${colors.bright}${colors.cyan}COMANDOS PRINCIPALES:${colors.reset}\n`);

  console.log(
    `  ${colors.bright}${colors.green}init${colors.reset}               ${colors.dim}│${colors.reset} Inicializa workspace (.awc-agents/)`
  );
  console.log(
    `  ${colors.bright}${colors.green}list${colors.reset}               ${colors.dim}│${colors.reset} Lista todos los agentes (22 agentes)`
  );
  console.log(
    `  ${colors.bright}${colors.green}load <id|#>${colors.reset}        ${colors.dim}│${colors.reset} Carga un agente específico`
  );
  console.log(
    `  ${colors.bright}${colors.green}search <tech>${colors.reset}      ${colors.dim}│${colors.reset} Busca agentes por tecnología`
  );
  console.log(
    `  ${colors.bright}${colors.green}help${colors.reset}               ${colors.dim}│${colors.reset} Muestra esta ayuda\n`
  );

  console.log(`${colors.bright}${colors.cyan}EJEMPLOS DE USO:${colors.reset}\n`);
  console.log(`  ${colors.dim}# Primera vez (inicializar)${colors.reset}`);
  console.log(`  ${colors.cyan}$ awc-agent init${colors.reset}\n`);

  console.log(`  ${colors.dim}# Listar todos los agentes${colors.reset}`);
  console.log(`  ${colors.cyan}$ awc-agent list${colors.reset}\n`);

  console.log(`  ${colors.dim}# Cargar agente por número${colors.reset}`);
  console.log(
    `  ${colors.cyan}$ awc-agent load 1${colors.reset}                    ${colors.dim}# Frontend React${colors.reset}`
  );
  console.log(
    `  ${colors.cyan}$ awc-agent load 3${colors.reset}                    ${colors.dim}# Backend Java${colors.reset}\n`
  );

  console.log(`  ${colors.dim}# Cargar agente por ID${colors.reset}`);
  console.log(`  ${colors.cyan}$ awc-agent load backend-java-senior${colors.reset}\n`);

  console.log(`  ${colors.dim}# Buscar por tecnología${colors.reset}`);
  console.log(
    `  ${colors.cyan}$ awc-agent search react${colors.reset}              ${colors.dim}# Agentes React${colors.reset}`
  );
  console.log(
    `  ${colors.cyan}$ awc-agent search java${colors.reset}               ${colors.dim}# Agentes Java${colors.reset}`
  );
  console.log(
    `  ${colors.cyan}$ awc-agent search docker${colors.reset}             ${colors.dim}# DevOps/Docker${colors.reset}\n`
  );

  console.log(`${colors.bright}${colors.cyan}FLUJO DE TRABAJO TÍPICO:${colors.reset}\n`);
  console.log(
    `  ${colors.yellow}1.${colors.reset} ${colors.dim}Inicializar workspace${colors.reset}      ${colors.cyan}awc-agent init${colors.reset}`
  );
  console.log(
    `  ${colors.yellow}2.${colors.reset} ${colors.dim}Ver agentes disponibles${colors.reset}    ${colors.cyan}awc-agent list${colors.reset}`
  );
  console.log(
    `  ${colors.yellow}3.${colors.reset} ${colors.dim}Cargar agente deseado${colors.reset}     ${colors.cyan}awc-agent load 3${colors.reset}`
  );
  console.log(
    `  ${colors.yellow}4.${colors.reset} ${colors.dim}Copiar comando generado${colors.reset}   ${colors.green}#file:.awc-agents/...${colors.reset}`
  );
  console.log(
    `  ${colors.yellow}5.${colors.reset} ${colors.dim}Pegar en Copilot Chat${colors.reset}     ${colors.magenta}Ejecutar workflows${colors.reset}\n`
  );

  console.log(`${colors.bright}${colors.cyan}CATEGORÍAS DISPONIBLES:${colors.reset}\n`);
  console.log('  🎨 Frontend (2)        ☕ Backend (4)         🛠️  Infrastructure (2)');
  console.log('  🏗️  Architecture (4)    🔍 Quality (3)        📊 Business (2)');
  console.log('  🤖 AI/Prompts (2)      📄 Documentation (3)\n');

  console.log(
    `${colors.dim}────────────────────────────────────────────────────────────${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.magenta}Framework AWC-ZNS-MTD v1.0.0${colors.reset} ${colors.dim}│ Zen • Neutro • Sistemático${colors.reset}`
  );
  console.log(
    `${colors.dim}────────────────────────────────────────────────────────────${colors.reset}\n`
  );
}

// Main
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  switch (command) {
    case 'init':
      initWorkspace();
      break;
    case 'list':
    case 'ls':
      listAgents();
      break;
    case 'load':
    case 'use':
      if (!args[1]) {
        console.log(`\n${colors.red}❌ Especifica un agente${colors.reset}`);
        console.log(
          `${colors.yellow}💡 Uso:${colors.reset} ${colors.bright}awc-agent load <número>${colors.reset}`
        );
        console.log(
          `${colors.yellow}💡 Ejemplo:${colors.reset} ${colors.cyan}awc-agent load 1${colors.reset}\n`
        );
        return;
      }
      loadAgent(args[1]);
      break;
    case 'search':
    case 'find':
      if (!args[1]) {
        console.log(`\n${colors.red}❌ Especifica una tecnología${colors.reset}`);
        console.log(
          `${colors.yellow}💡 Uso:${colors.reset} ${colors.bright}awc-agent search <tech>${colors.reset}`
        );
        console.log(
          `${colors.yellow}💡 Ejemplo:${colors.reset} ${colors.cyan}awc-agent search react${colors.reset}\n`
        );
        return;
      }
      searchByTech(args[1]);
      break;
    case 'version':
    case '--version':
    case '-v':
      console.log(
        `\n${colors.bright}${colors.cyan}awc-agent-cli${colors.reset} ${colors.green}v1.0.0${colors.reset}`
      );
      console.log(`${colors.dim}AWC-ZNS-MTD Framework${colors.reset}\n`);
      break;
    default:
      console.log(`\n${colors.red}❌ Comando desconocido: ${command}${colors.reset}\n`);
      showHelp();
  }
}

main();
