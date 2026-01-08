# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-08

### ✨ UX Improvements

- **Professional AWC Logo** with ASCII art and ZNS-MTD branding
- **Enhanced visual design** with Unicode borders (╭─╮│╰╯) and boxes
- **Color hierarchy** with bright, dim, backgrounds for better readability
- **Contextual messages** with emojis and smart suggestions 💡
- **Highlighted Copilot command** with double-border visual box
- **Improved workflows display** - Shows first 5 with detailed descriptions
- **Visual progress** during workspace initialization

### 🚀 New Features

- Command aliases: `ls` (list), `use` (load), `find` (search)
- `--version` option to display CLI version
- Complete help with step-by-step workflow guide
- Command validation with correction suggestions

### 🐛 Bug Fixes

- Improved error handling with clearer messages
- Optimized spacing and formatting in all outputs

## [1.0.0] - 2026-01-07

### Added
- 🎉 Release inicial de AWC Agent CLI
- ✨ Comando `awc-agent list` - Lista 22 agentes disponibles organizados por categoría
- ✨ Comando `awc-agent load <id|número>` - Carga agente específico con instrucciones para Copilot
- ✨ Comando `awc-agent search <tech>` - Búsqueda inteligente por tecnología
- ✨ Comando `awc-agent help` - Ayuda completa con ejemplos
- 🎨 Interface colorida en terminal con emojis
- 📦 22 agentes especializados incluidos:
  - 2 Frontend (React, React Native)
  - 4 Backend (Java, Python, .NET, PHP)
  - 2 Infrastructure (DevSecOps, Database)
  - 4 Architecture (Solution Architect, ASP.NET Architect, C4, Technical Stories)
  - 3 Quality/Audit (Frontend Audit, Backend Audit, Validation)
  - 2 Business (Product Owner, Cost Estimator)
  - 2 AI/Prompts (Prompt Engineer, Prompt Architect)
  - 3 Documentation (Consolidation, Export, Obsolescence)
- 📊 191 workflows totales disponibles
- 🚀 Integración perfecta con GitHub Copilot Chat
- 📖 Documentación completa (README, USAGE_GUIDE, PUBLISH)

### Technical Details
- Node.js >=18.0.0 required
- Dependencies: js-yaml ^4.1.0
- License: MIT
- Framework: AWC-ZNS-MTD v1.0.0

---

## [Unreleased]

### Planned Features (v1.1.0)
- [ ] `awc-agent exec <agente> <workflow>` - Ejecutar workflow directamente
- [ ] `awc-agent favorite <id>` - Marcar agentes favoritos
- [ ] `awc-agent recent` - Ver agentes usados recientemente
- [ ] `awc-agent compare <id1> <id2>` - Comparar 2 agentes
- [ ] `awc-agent stats` - Estadísticas de uso
- [ ] Autocompletado (bash/zsh/powershell)
- [ ] VS Code extension integration
- [ ] Config file (~/.awc-agentrc)
- [ ] Alias personalizables

---

[1.0.0]: https://github.com/awc-team/awc-zns-mtd/releases/tag/v1.0.0
