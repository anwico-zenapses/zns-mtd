# Guía de Agentes

## ZEN MASTER (Orquestador)

**Rol:** Gestor principal del proyecto

**Comandos clave:**
- `*zns-quick-flow` - Workflow rápido
- `*zns-standard-flow` - Workflow estándar  
- `*zns-enterprise-flow` - Workflow enterprise
- `*zns-status` - Estado del proyecto
- `*zns-switch-agent` - Cambiar agente

## ARCHITECT SENIOR (Diseñador)

**Rol:** Arquitectura y diseño de soluciones

**Comandos clave:**
- `*arch-analyze-current` - Análisis arquitectura
- `*arch-design-solution` - Diseño completo
- `*arch-create-c4` - Diagramas C4
- `*arch-create-adr` - ADR
- `*arch-tech-stack` - Stack tecnológico

## DEVELOPER PRO (Implementador)

**Rol:** Desarrollo y código

**Comandos clave:**
- `*dev-implement-tdd` - Implementar con TDD
- `*dev-code-review` - Revisión de código
- `*dev-refactor` - Refactorización
- `*dev-debug` - Debug asistido
- `*dev-standards` - Estándares de código

## QA SPECIALIST (Calidad)

**Rol:** Testing y aseguramiento de calidad

**Comandos clave:**
- `*qa-test-plan` - Plan de testing
- `*qa-unit-tests` - Tests unitarios
- `*qa-integration-tests` - Tests integración
- `*qa-e2e-tests` - Tests E2E
- `*qa-coverage` - Análisis cobertura
- `*qa-quality-report` - Reporte calidad

## Cambio de Agentes

```
ZEN MASTER → *zns-switch-agent architect
[Ahora: ARCHITECT SENIOR]

ARCHITECT → *arch-back-to-zen
[Regresa a: ZEN MASTER]
```
