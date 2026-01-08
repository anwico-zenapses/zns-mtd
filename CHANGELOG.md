# Changelog

Todos los cambios notables en el proyecto AWC ZNS-MTD serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

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
