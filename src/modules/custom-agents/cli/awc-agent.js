#!/usr/bin/env node

/**
 * AWC Agent CLI - Gestión automática de agentes custom
 * Framework: AWC-ZNS-MTD v1.0.0
 * Uso: awc-agent <comando> [opciones]
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

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
  
  console.log(`\n${colors.bright}${colors.cyan}📋 AGENTES DISPONIBLES (22 agentes, 191 workflows)${colors.reset}\n`);
  
  const categories = {
    'Frontend': [],
    'Backend': [],
    'Infrastructure': [],
    'Architecture': [],
    'Quality': [],
    'Business': [],
    'AI': [],
    'Documentation': []
  };
  
  // Organizar por categoría
  config.module.agents.forEach((agent, index) => {
    const cat = agent.category === 'development' 
      ? (agent.subcategory === 'frontend' || agent.subcategory === 'mobile' ? 'Frontend' : 'Backend')
      : agent.category === 'infrastructure' ? 'Infrastructure'
      : agent.category === 'architecture' ? 'Architecture'
      : agent.category === 'quality' ? 'Quality'
      : agent.category === 'business' ? 'Business'
      : agent.category === 'ai' ? 'AI'
      : 'Documentation';
    
    categories[cat].push({ ...agent, index: index + 1 });
  });
  
  // Mostrar por categoría
  Object.entries(categories).forEach(([category, agents]) => {
    if (agents.length === 0) return;
    
    console.log(`${colors.bright}${colors.blue}${getCategoryIcon(category)} ${category.toUpperCase()}${colors.reset}`);
    agents.forEach(agent => {
      console.log(`  ${colors.green}${agent.index.toString().padStart(2, '0')}${colors.reset} │ ${colors.cyan}${agent.id.padEnd(35)}${colors.reset} │ ${agent.workflows} workflows`);
    });
    console.log('');
  });
  
  console.log(`${colors.yellow}💡 Usa: ${colors.bright}awc-agent load <número>${colors.reset} ${colors.yellow}para cargar un agente${colors.reset}\n`);
}

function getCategoryIcon(category) {
  const icons = {
    'Frontend': '🎨',
    'Backend': '☕',
    'Infrastructure': '🛠️',
    'Architecture': '🏗️',
    'Quality': '🔍',
    'Business': '📊',
    'AI': '🤖',
    'Documentation': '📄'
  };
  return icons[category] || '📦';
}

// Inicializar agentes en workspace
function initWorkspace() {
  // Crear carpeta .awc-agents en el workspace actual
  if (!fs.existsSync(WORKSPACE_AGENTS_DIR)) {
    fs.mkdirSync(WORKSPACE_AGENTS_DIR, { recursive: true });
  }
  
  // Copiar todos los agentes YAML
  const config = loadConfig();
  let copiedCount = 0;
  
  config.module.agents.forEach(agent => {
    const sourceFile = path.join(AGENTS_DATA_DIR, path.basename(agent.file));
    const destFile = path.join(WORKSPACE_AGENTS_DIR, path.basename(agent.file));
    
    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, destFile);
      copiedCount++;
    }
  });
  
  console.log(`\n${colors.bright}${colors.green}✅ WORKSPACE INICIALIZADO${colors.reset}\n`);
  console.log(`${colors.cyan}Carpeta:${colors.reset} ${WORKSPACE_AGENTS_DIR}`);
  console.log(`${colors.cyan}Agentes copiados:${colors.reset} ${copiedCount}/22\n`);
  console.log(`${colors.yellow}💡 Ahora puedes usar:${colors.reset}`);
  console.log(`   ${colors.cyan}#file:.awc-agents/frontend-react-senior.agent.yaml${colors.reset}\n`);
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
    agent = config.module.agents.find(a => a.id === agentIdOrNumber);
  }
  
  if (!agent) {
    console.log(`${colors.red}❌ Agente no encontrado${colors.reset}\n`);
    return;
  }
  
  // Asegurar que el workspace esté inicializado
  if (!fs.existsSync(WORKSPACE_AGENTS_DIR)) {
    console.log(`${colors.yellow}⚠️  Inicializando workspace...${colors.reset}\n`);
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
  
  console.log(`\n${colors.bright}${colors.green}✅ AGENTE CARGADO${colors.reset}\n`);
  console.log(`${colors.cyan}Nombre:${colors.reset} ${agentData.agent.metadata.name}`);
  console.log(`${colors.cyan}ID:${colors.reset} ${agent.id}`);
  console.log(`${colors.cyan}Stack:${colors.reset} ${agent.stack.join(', ')}`);
  console.log(`${colors.cyan}Workflows:${colors.reset} ${agent.workflows} disponibles`);
  console.log(`${colors.cyan}Ubicación:${colors.reset} ${workspaceAgentPath}\n`);
  
  // Mostrar comando para Copilot Chat
  console.log(`${colors.bright}${colors.yellow}📋 COPIAR Y PEGAR EN GITHUB COPILOT CHAT:${colors.reset}\n`);
  console.log(`${colors.bright}${colors.magenta}#file:.awc-agents/${agentFileName} actúa como este agente, muestra *help${colors.reset}\n`);
  
  // Mostrar workflows disponibles
  if (agentData.agent.workflows && agentData.agent.workflows.list) {
    console.log(`${colors.bright}${colors.blue}🎯 WORKFLOWS DISPONIBLES:${colors.reset}\n`);
    agentData.agent.workflows.list.forEach(workflow => {
      console.log(`  ${colors.green}*${workflow.id.padEnd(30)}${colors.reset} - ${workflow.description}`);
    });
    console.log('');
  }
}

// Buscar agente por tecnología
function searchByTech(tech) {
  const config = loadConfig();
  const results = config.module.agents.filter(agent => 
    agent.stack.some(s => s.toLowerCase().includes(tech.toLowerCase())) ||
    agent.whenToUse.toLowerCase().includes(tech.toLowerCase())
  );
  
  if (results.length === 0) {
    console.log(`${colors.red}❌ No se encontraron agentes para: ${tech}${colors.reset}\n`);
    return;
  }
  
  console.log(`\n${colors.bright}${colors.cyan}🔍 RESULTADOS PARA: ${tech}${colors.reset}\n`);
  results.forEach((agent, index) => {
    console.log(`  ${colors.green}${(config.module.agents.indexOf(agent) + 1).toString().padStart(2, '0')}${colors.reset} │ ${colors.cyan}${agent.id.padEnd(35)}${colors.reset} │ ${agent.workflows} workflows`);
    console.log(`     ${colors.yellow}Stack: ${agent.stack.join(', ')}${colors.reset}`);
  });
  console.log('');
}

// Mostrar help
function showHelp() {
  console.log(`
${colors.bright}${colors.cyan}AWC Agent CLI - Gestión de Agentes Custom${colors.reset}
${colors.yellow}Framework: AWC-ZNS-MTD v1.0.0${colors.reset}

${colors.bright}USO:${colors.reset}
  awc-agent <comando> [opciones]

${colors.bright}COMANDOS:${colors.reset}
  ${colors.green}init${colors.reset}              Inicializa agentes en workspace (.awc-agents/)
  ${colors.green}list${colors.reset}              Lista todos los agentes disponibles (22 agentes)
  ${colors.green}load <id|número>${colors.reset}  Carga un agente específico
  ${colors.green}search <tech>${colors.reset}     Busca agentes por tecnología (react, java, python, etc.)
  ${colors.green}help${colors.reset}              Muestra esta ayuda

${colors.bright}EJEMPLOS:${colors.reset}
  ${colors.cyan}awc-agent init${colors.reset}                    # Inicializar workspace (primera vez)
  ${colors.cyan}awc-agent list${colors.reset}                    # Lista todos los agentes
  ${colors.cyan}awc-agent load 1${colors.reset}                  # Carga agente #1 (Frontend React)
  ${colors.cyan}awc-agent load backend-java-senior${colors.reset} # Carga agente por ID
  ${colors.cyan}awc-agent search react${colors.reset}            # Busca agentes React
  ${colors.cyan}awc-agent search java${colors.reset}             # Busca agentes Java

${colors.bright}FLUJO DE TRABAJO:${colors.reset}
  1. ${colors.yellow}awc-agent init${colors.reset}                # Inicializar workspace (primera vez)
  2. ${colors.yellow}awc-agent list${colors.reset}                # Ver agentes disponibles
  3. ${colors.yellow}awc-agent load 3${colors.reset}              # Cargar agente (ej: Backend Java)
  4. ${colors.yellow}Copiar comando generado${colors.reset}       # Pegar en Copilot Chat
  5. ${colors.yellow}Usar workflows (*help)${colors.reset}        # Ejecutar comandos del agente

${colors.bright}CATEGORÍAS:${colors.reset}
  🎨 Frontend (2)        ☕ Backend (4)         🛠️ Infrastructure (2)
  🏗️ Architecture (4)    🔍 Quality (3)        📊 Business (2)
  🤖 AI/Prompts (2)      📄 Documentation (3)

${colors.bright}RECURSOS:${colors.reset}
  README:     custom-agents/README.md
  Config:     custom-agents/config.yaml
  Guía:       custom-agents/USAGE_GUIDE.md
`);
}

// Main
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    showHelp();
    return;
  }
  
  switch (command) {
    case 'init':
      initWorkspace();
      break;
    case 'list':
      listAgents();
      break;
    case 'load':
      if (!args[1]) {
        console.log(`${colors.red}❌ Debes especificar un agente: awc-agent load <id|número>${colors.reset}\n`);
        return;
      }
      loadAgent(args[1]);
      break;
    case 'search':
      if (!args[1]) {
        console.log(`${colors.red}❌ Debes especificar una tecnología: awc-agent search <tech>${colors.reset}\n`);
        return;
      }
      searchByTech(args[1]);
      break;
    default:
      console.log(`${colors.red}❌ Comando desconocido: ${command}${colors.reset}`);
      showHelp();
  }
}

main();
