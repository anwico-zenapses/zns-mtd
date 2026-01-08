# Changelog

Todos los cambios notables en el proyecto AWC ZNS-MTD serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [2.1.0] - 2026-01-08

### ✨ Añadido

#### **Comando `awc new` - Crear Proyectos Completos**
- 🎯 Nuevo comando `awc new [project-name]` para crear proyectos desde cero
- 📁 Estructura de directorios estándar (8 fases)
- 📋 Templates automáticamente copiados a cada proyecto
- 🔧 Configuración AWC pre-configurada
- 📚 Guías START_HERE.md en cada fase

#### **Estructura de Proyecto Estándar**
```
proyecto/
├── 01-comercial/          # Fase 0: Comercial
│   ├── 01-prospection/
│   ├── 02-technical-proposal/
│   ├── 03-quotation/
│   └── 04-contract/
├── 02-inception/          # Fase 1: Inception
├── 03-analysis/           # Fase 2: Análisis
├── 04-planning/           # Fase 3: Planificación
├── 05-development/        # Fase 4: Desarrollo
│   ├── src/
│   ├── tests/
│   └── docs/
├── 06-qa/                 # Fase 5: QA
├── 07-deployment/         # Fase 6: Deployment
├── 08-support/            # Fase 7: Soporte
├── docs/                  # Documentación general
├── .awc/                  # Configuración AWC
│   ├── agents/
│   ├── workflows/
│   ├── templates/
│   └── config.json
└── README.md
```

#### **Características del Comando**
- ✅ Crea estructura completa de 8 fases
- ✅ Copia todos los templates (7 documentos)
- ✅ Copia todos los workflows (8 workflows)
- ✅ Copia todos los agentes (22 agentes)
- ✅ Genera README.md personalizado
- ✅ Crea .gitignore apropiado
- ✅ Inicializa Git automáticamente (opcional)
- ✅ Crea guías START_HERE.md por fase

### 🔄 Modificado

- **CLI**: Separado `awc new` (proyectos nuevos) de `awc init` (proyectos existentes)
- **UX**: Experiencia mejorada con spinner y mensajes claros

### 📊 Uso

```bash
# Crear nuevo proyecto interactivo
awc new

# Crear proyecto con nombre
awc new mi-proyecto

# Crear proyecto de tipo específico
awc new mi-api --type api
```

---

## [2.0.0] - 2026-01-08

### 🚀 MAJOR RELEASE - Método Completo End-to-End

Esta versión transforma AWC ZNS-MTD de un framework de desarrollo a un **método integral de gestión de proyectos** cubriendo todo el ciclo de vida desde prospección comercial hasta soporte post-lanzamiento.

### ✨ Añadido

#### **Workflows Comerciales & Inception**
- ✅ **comercial-flow** (400 líneas YAML)
  - 4 fases: prospección, oferta-técnica, cotización, negociación
  - Agentes: product-owner, cost-estimator, solution-architect
  - Deliverables: Discovery notes, viabilidad, oferta comercial, cotización
  - Duración: 7-15 días

- ✅ **inception-flow** (600 líneas YAML)
  - 5 fases: kickoff, prd-creation, backlog-breakdown, release-planning, inception-review
  - Agentes: product-owner, solution-architect, technical-stories-architect
  - Deliverables: Kickoff agenda, PRD, arquitectura conceptual, user story map, roadmap
  - Duración: 2-3 semanas

#### **Workflows Técnicos**
- ✅ **analisis-flow** (450 líneas YAML)
  - 4 fases: code-audit, architecture-review, technical-debt, recommendations
  - Deliverables: Technical Audit Report (30-50 págs), Remediation Roadmap
  - Tools: SonarQube, OWASP ZAP, JMeter, ESLint, Snyk

- ✅ **planificacion-flow** (550 líneas YAML)
  - Ceremonias Agile completas: Sprint Planning, Grooming, Release Planning
  - Deliverables: Sprint Goal, Sprint Backlog, Release Plan, OKRs

- ✅ **development-flow** (350 líneas YAML)
  - Enfoque TDD: Red → Green → Refactor
  - Métricas: Code Coverage >80%, Review Time <24h

- ✅ **qa-flow** (300 líneas YAML)
  - Testing Pyramid: Unit → Integration → E2E
  - Tools: Cypress, Playwright, JMeter, OWASP ZAP

- ✅ **deployment-flow** (340 líneas YAML)
  - Estrategias: Blue-Green, Rolling, Canary deployments
  - Métricas DORA: Change Failure Rate <5%, MTTR <1h

- ✅ **support-flow** (330 líneas YAML)
  - Incident triage: P0 <15 min, P1 <1h, P2 <4h
  - Métricas: MTTD <5 min, MTTR <4h, Uptime >99.9%

#### **Templates Profesionales** (7 documentos)
- `oferta-comercial.md`, `PRD-template.md`, `cotizacion.md`
- `discovery-notes.md`, `viabilidad.md`, `kickoff-agenda.md`
- `arquitectura-conceptual.md`

### 🔄 Modificado

- **README.md**
  - Agregado diagrama Mermaid del ciclo de vida completo (7 fases)
  - 8 workflows documentados con casos de uso reales

- **config.yaml**
  - Versión actualizada: `1.0.0` → `2.0.0`
  - Workflows legacy marcados como `deprecated`
  - 8 workflows nuevos marcados como `active`

### 📊 Métricas del Release

| Componente | Líneas de código | Archivos |
|------------|------------------|----------|
| Workflows YAML | ~2,920 líneas | 6 workflows |
| Templates Markdown | ~1,500 líneas | 7 templates |
| Documentación | ~800 líneas | README, CHANGELOG |
| **TOTAL** | **~5,220 líneas** | **15 archivos** |

### 🎯 Cobertura del Ciclo de Vida

✅ Fase 0: Comercial → ✅ Fase 1: Inception → ✅ Fase 2: Análisis → ✅ Fase 3: Planificación  
✅ Fase 4: Desarrollo → ✅ Fase 5: QA → ✅ Fase 6: Deployment → ✅ Fase 7: Soporte  

**Cobertura: 100% del ciclo de vida end-to-end** 🎉

### 🔧 Compatibilidad

- ✅ Compatible con awc-agent-cli `v1.1.0`
- ⚠️ **Breaking change**: Estructura de workflows reorganizada

---

## [1.0.0] - 2026-01-07

### Añadido

#### Core System
- **Estructura modular** inspirada en BMAD Core V6
- **Filosofía ZNS** (Zen-Neutro-Sistemático) integrada en todos los componentes
- Separación clara entre Core y Módulos para escalabilidad
- Sistema de configuración basado en YAML

#### Agentes
- **ZEN MASTER**: Agente orquestador principal con 17 comandos
  - Menú interactivo completo
  - Gestión de workflows
  - Validación de calidad integrada
  
- **ARCHITECT SENIOR**: Diseñador de soluciones con 14 comandos
  - Diseño de arquitectura C4
  - Creación de ADRs (Architecture Decision Records)
  - Gestión de tech stack
  
- **DEVELOPER PRO**: Experto en implementación con 17 comandos
  - Desarrollo TDD
  - Code review automatizado
  - Refactorización guiada
  
- **QA SPECIALIST**: Especialista en calidad con 18 comandos
  - Testing en múltiples niveles
  - Análisis de cobertura
  - Reporte de calidad

#### Workflows
- **Quick Flow** (<10 min): Para bugs y hotfixes
  - 4 pasos: init → spec → implement → test
  - Decisiones rápidas con gates de calidad
  
- **Standard Flow** (<30 min): Para features y refactoring
  - 5 fases: análisis → planificación → arquitectura → implementación → validación
  - Balanceado entre velocidad y calidad
  
- **Enterprise Flow** (<2 hrs): Para sistemas complejos
  - 7 fases completas con governance
  - Revisión de arquitectura por ARB
  - Documentación exhaustiva

#### CLI
- **awc install**: Instalación interactiva con configuración de proyecto
- **awc init**: Análisis automático y recomendación de workflow
- **awc status**: Estado detallado del proyecto con métricas
- **awc version**: Verificación de versiones y actualizaciones
- **awc config**: Gestión de preferencias interactiva
- **awc validate**: Validación de estructura y configuración

#### Utilidades
- **file-utils**: Manejo de archivos YAML, copiar agentes/workflows
- **console-logger**: Logger con branding ZNS, colores, tablas
- **version**: Control de versiones con semver
- **project-analyzer**: Análisis de tecnologías para recomendación inteligente

#### Documentación
- README completo con guía de inicio
- Estructura de docs preparada
- LICENSE MIT

### Principios de Diseño
- **ZEN**: Claridad, simplicidad deliberada, ruido mínimo
- **NEUTRO**: Objetividad, decisiones basadas en evidencia
- **SISTEMÁTICO**: Procesos repetibles, documentación rigurosa, trazabilidad completa

### Estándares de Calidad
- Cobertura de tests >80%
- Deuda técnica <5%
- Code reviews obligatorios
- Documentación sincronizada

### Tecnologías Soportadas
- **Backend**: Node.js, Java Spring, Python Django/FastAPI, .NET Core
- **Frontend**: React, Vue, Angular, Next.js
- **Mobile**: React Native, Flutter
- **Databases**: PostgreSQL, MongoDB, MySQL, SQL Server
- **Cloud**: Azure, AWS, GCP
- **DevOps**: Docker, Kubernetes, GitHub Actions, Azure DevOps

---

## [Unreleased]

### Planificado para v1.1.0
- Sistema de plugins extensible
- Integración con IDEs (VS Code, JetBrains)
- Métricas de productividad del equipo
- Templates de proyecto predefinidos
- Integración con Jira/Azure Boards

### Planificado para v1.2.0
- AI-powered code suggestions
- Análisis de riesgos automatizado
- Dashboard de métricas en tiempo real
- Integración con herramientas de observabilidad

---

## Tipos de Cambios

- **Añadido**: para nuevas funcionalidades
- **Cambiado**: para cambios en funcionalidades existentes
- **Obsoleto**: para funcionalidades que pronto serán removidas
- **Eliminado**: para funcionalidades removidas
- **Corregido**: para corrección de bugs
- **Seguridad**: para vulnerabilidades

---

[1.0.0]: https://github.com/awc/awc-zns-mtd/releases/tag/v1.0.0
[Unreleased]: https://github.com/awc/awc-zns-mtd/compare/v1.0.0...HEAD
