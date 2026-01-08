# Quick Start - AWC ZNS-MTD

## Instalación Rápida

```bash
# 1. Navegar a tu proyecto
cd tu-proyecto

# 2. Instalar AWC ZNS-MTD
npm install -g awc-zns-mtd

# 3. Instalar en el proyecto
awc install

# 4. Inicializar y analizar
awc init
```

## Primeros Pasos

### 1. Cargar Agente ZEN MASTER

Copia el contenido de `.awc/agents/zen-master.agent.yaml` y pégalo en tu IDE (GitHub Copilot).

### 2. Comandos Básicos

- `*help` - Ver menú completo
- `*zns-quick-flow` - Workflow rápido (<10 min)
- `*zns-standard-flow` - Workflow estándar (<30 min)
- `*zns-status` - Ver estado del proyecto

### 3. Flujo de Trabajo Típico

```
Usuario: "necesito agregar autenticación JWT"

ZEN MASTER:
→ Detecta: Feature nueva (Standard Flow)
→ Carga: ARCHITECT SENIOR
→ Diseña: Arquitectura de autenticación
→ Carga: DEVELOPER PRO  
→ Implementa: Código con TDD
→ Carga: QA SPECIALIST
→ Valida: Tests + cobertura >80%
```

## Comandos CLI

```bash
awc status      # Estado del proyecto
awc config      # Configurar preferencias
awc validate    # Validar estructura
awc version     # Verificar actualizaciones
```

## Workflows Disponibles

| Workflow | Duración | Uso |
|----------|----------|-----|
| Quick Flow | <10 min | Bugs, hotfixes |
| Standard Flow | <30 min | Features, refactoring |
| Enterprise Flow | <2 hrs | Sistemas complejos |

## Estructura de Proyecto

```
tu-proyecto/
├── .awc/                  # Instalación AWC ZNS-MTD
│   ├── agents/           # Agentes YAML
│   ├── workflows/        # Workflows declarativos
│   └── config.yaml       # Configuración
├── docs/                 # Documentación generada
│   ├── architecture/     # Diagramas C4
│   ├── adr/             # Decisiones de arquitectura
│   └── stories/         # User stories
└── [tu código]
```

## Filosofía ZNS

- **ZEN**: Claridad, simplicidad deliberada
- **NEUTRO**: Objetividad, basado en evidencia
- **SISTEMÁTICO**: Repetible, documentado, trazable

## Siguiente: [Guía Completa](../guides/complete-guide.md)
