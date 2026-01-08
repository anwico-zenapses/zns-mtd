# AWC Agent CLI

[![npm version](https://badge.fury.io/js/awc-agent-cli.svg)](https://www.npmjs.com/package/awc-agent-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/awc-agent-cli)](https://nodejs.org)
[![Downloads](https://img.shields.io/npm/dm/awc-agent-cli)](https://www.npmjs.com/package/awc-agent-cli)

CLI tool profesional para gestionar y usar los **22 agentes especializados** de AWC-ZNS-MTD Framework.

> 🚀 **191 workflows** | 🎨 **8 categorías** | ⚡ **15 stacks tecnológicos** | 💯 **100% TypeScript + DDD + TDD**

## ⚡ Instalación Rápida

### Instalación Global (Recomendado)

```bash
npm install -g awc-agent-cli
```

### Verificar Instalación

```bash
awc-agent --version
awc-agent help
```

### Instalación Local (Desarrollo)

```bash
git clone https://github.com/awc-team/awc-zns-mtd.git
cd awc-zns-mtd/src/modules/custom-agents/cli
npm install
npm link
```

## 🚀 Uso

### 1. Inicializar Workspace (Primera Vez)

```bash
awc-agent init
```

Esto crea la carpeta `.awc-agents/` en tu proyecto con los 22 agentes YAML listos para usar con GitHub Copilot.

**Output:**
```
✅ WORKSPACE INICIALIZADO

Carpeta: D:\tu-proyecto\.awc-agents
Agentes copiados: 22/22

💡 Ahora puedes usar:
   #file:.awc-agents/frontend-react-senior.agent.yaml
```

### 2. Listar todos los agentes

```bash
awc-agent list
```

**Output:**
```
📋 AGENTES DISPONIBLES (22 agentes, 191 workflows)

🎨 FRONTEND
  01 │ frontend-react-senior              │ 14 workflows
  02 │ react-native-senior                │ 6 workflows

☕ BACKEND
  03 │ backend-java-senior                │ 17 workflows
  04 │ python-senior                      │ 11 workflows
  ...
```

### 3. Cargar un agente

**Por número:**
```bash
awc-agent load 1
```

**Por ID:**
```bash
awc-agent load backend-java-senior
```

**Output:**
```
✅ AGENTE CARGADO

Nombre: BACKEND JAVA SENIOR - Developer & Architect
ID: backend-java-senior
Stack: Java 21 LTS, Spring Boot 3.4, PostgreSQL 16, Kafka
Workflows: 17 disponibles
Ubicación: D:\tu-proyecto\.awc-agents\backend-java-senior.agent.yaml

📋 COPIAR Y PEGAR EN GITHUB COPILOT CHAT:

#file:.awc-agents/backend-java-senior.agent.yaml actúa como este agente, muestra *help

🎯 WORKFLOWS DISPONIBLES:

  *implement-hut                    - HUT completo con TDD Red-Green-Refactor
  *create-aggregate                 - Aggregate DDD + Value Objects
  *create-repository                - Spring Data JPA Method Queries
  ...
```

### 4. Usar en GitHub Copilot Chat

1. Copia el comando generado por `awc-agent load`
2. Pega en GitHub Copilot Chat (Ctrl+I o ventana de chat)
3. El agente cargará y mostrará los workflows disponibles
4. Usa comandos como `*help`, `*implement-hut`, etc.

### 5. Buscar por tecnología

```powershell
awc-agent search react
awc-agent search java
awc-agent search kubernetes
```

### 4. Ver ayuda

```powershell
awc-agent help
```

## 📖 Comandos Disponibles

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `list` | Lista todos los agentes (22) | `awc-agent list` |
| `load <id\|número>` | Carga un agente específico | `awc-agent load 3` |
| `search <tech>` | Busca agentes por tecnología | `awc-agent search python` |
| `help` | Muestra ayuda completa | `awc-agent help` |

## 🎯 Flujo de Trabajo Completo

### Ejemplo: Desarrollar componente React

**Paso 1 - Listar agentes:**
```powershell
awc-agent list
```

**Paso 2 - Cargar Frontend React (agente #1):**
```powershell
awc-agent load 1
```

**Paso 3 - Copiar comando generado:**
```
#file:frontend-react-senior.agent.yaml actúa como este agente, muestra *help
```

**Paso 4 - Pegar en Copilot Chat y ejecutar workflow:**
```
*create-react-component ProductCard
```

### Ejemplo: Implementar HUT en Java

**Paso 1 - Cargar Backend Java:**
```powershell
awc-agent load backend-java-senior
```

**Paso 2 - Copiar y pegar en Copilot Chat:**
```
#file:backend-java-senior.agent.yaml actúa como este agente, muestra *help
```

**Paso 3 - Ejecutar workflow:**
```
*implement-hut Agregar producto al carrito
```

## 🔍 Búsqueda Inteligente

```powershell
# Buscar agentes React
awc-agent search react
# Resultado: frontend-react-senior, react-native-senior

# Buscar agentes Java
awc-agent search java
# Resultado: backend-java-senior

# Buscar agentes para arquitectura
awc-agent search architecture
# Resultado: solution-architect-senior, aspnet-core-architect-senior, etc.

# Buscar agentes DDD
awc-agent search ddd
# Resultado: backend-java-senior, python-senior, technical-stories-architect, etc.
```

## 💡 Tips Avanzados

### Uso con pipes (PowerShell)

```powershell
# Ver solo agentes de Backend
awc-agent list | Select-String "Backend"

# Exportar lista a archivo
awc-agent list > agentes.txt
```

### Alias útiles (PowerShell Profile)

Agregar a tu `$PROFILE`:

```powershell
# Alias cortos
Set-Alias -Name aa -Value awc-agent

# Funciones custom
function Load-FrontendAgent { awc-agent load 1 }
function Load-BackendAgent { awc-agent load 3 }
function Load-ArchitectAgent { awc-agent load 9 }

Set-Alias -Name aaf -Value Load-FrontendAgent
Set-Alias -Name aab -Value Load-BackendAgent
Set-Alias -Name aaa -Value Load-ArchitectAgent
```

Luego usar:
```powershell
aa list        # Lista agentes
aaf            # Carga Frontend React
aab            # Carga Backend Java
aaa            # Carga Solution Architect
```

## 🛠️ Desarrollo

### Estructura

```
cli/
├── awc-agent.js      # CLI principal
├── package.json      # Dependencias
└── README.md         # Esta documentación
```

### Extender funcionalidad

```javascript
// awc-agent.js

// Agregar nuevo comando
case 'stats':
  showStats();
  break;

function showStats() {
  const config = loadConfig();
  console.log(`Total agentes: ${config.module.agents.length}`);
  console.log(`Total workflows: 191`);
  // ... más estadísticas
}
```

## 📋 Requisitos

- **Node.js:** >=18.0.0
- **npm:** >=9.0.0
- **PowerShell:** 7+ (recomendado)

## 🎉 Ventajas vs Método Manual

| Aspecto | Manual | CLI |
|---------|--------|-----|
| **Listar agentes** | Leer config.yaml | `awc-agent list` (2 segundos) |
| **Cargar agente** | Copiar ruta completa | `awc-agent load 1` |
| **Buscar por tech** | Leer 22 archivos | `awc-agent search react` |
| **Ver workflows** | Abrir YAML, buscar | Automático al cargar |
| **Tiempo total** | ~5 minutos | ~15 segundos |

**Ahorro:** ~95% de tiempo

## 🚀 Próximas Features (v1.1.0)

- [ ] `awc-agent exec <agente> <workflow>` - Ejecutar workflow directamente
- [ ] `awc-agent favorite <id>` - Marcar agentes favoritos
- [ ] `awc-agent recent` - Ver agentes usados recientemente
- [ ] `awc-agent compare <id1> <id2>` - Comparar 2 agentes
- [ ] `awc-agent stats` - Estadísticas de uso
- [ ] Autocompletado (bash/zsh/powershell)
- [ ] Integración con VS Code (extension)

---

## 🤝 Contribuir

¿Quieres agregar un nuevo agente o mejorar los existentes?

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nuevo-agente`
3. Commitea tus cambios: `git commit -am 'Agregar agente Rust Senior'`
4. Push a la rama: `git push origin feature/nuevo-agente`
5. Abre un Pull Request

## 📄 License

MIT © [AWC Team](https://github.com/awc-team)

## 🙏 Agradecimientos

- **Framework:** AWC-ZNS-MTD v1.0.0
- **Filosofía:** ZNS (Zen-Neutro-Sistemático)
- **Powered by:** Node.js + js-yaml
- **Compatible con:** GitHub Copilot, VS Code

## 📞 Soporte

- 🐛 **Issues:** https://github.com/awc-team/awc-zns-mtd/issues
- 📧 **Email:** awc-team@example.com
- 💬 **Discussions:** https://github.com/awc-team/awc-zns-mtd/discussions

---

**Framework:** AWC-ZNS-MTD v1.0.0  
**Versión CLI:** 1.0.0  
**Agentes:** 22 disponibles, 191 workflows  
**Última actualización:** 7 de enero de 2026

⭐ **Si te gusta este proyecto, dale una estrella en GitHub!**
