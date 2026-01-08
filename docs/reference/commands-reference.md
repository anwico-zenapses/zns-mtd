# Referencia de Comandos

## Comandos CLI

### awc install
Instala AWC ZNS-MTD en el proyecto.

```bash
awc install [opciones]

Opciones:
  -f, --force              Forzar reinstalación
  -d, --dir <directory>    Directorio (.awc por defecto)
```

### awc init
Inicializa y analiza el proyecto.

```bash
awc init [opciones]

Opciones:
  -t, --type <type>  Tipo: web, api, mobile, enterprise
```

### awc status
Muestra estado del proyecto.

```bash
awc status [opciones]

Opciones:
  -v, --verbose  Información detallada
```

### awc config
Configura preferencias.

```bash
awc config [opciones]

Opciones:
  -s, --show  Mostrar configuración
  -e, --edit  Editar interactivamente
```

### awc validate
Valida estructura del proyecto.

```bash
awc validate
```

### awc version
Verifica versión y actualizaciones.

```bash
awc version
```

## Comandos de Agentes

### ZEN MASTER
- `*help` - Menú completo
- `*zns-quick-flow` - Workflow rápido
- `*zns-standard-flow` - Workflow estándar
- `*zns-enterprise-flow` - Workflow enterprise
- `*zns-status` - Estado proyecto
- `*zns-config` - Configuración
- `*zns-validate` - Validar calidad
- `*zns-switch-agent <nombre>` - Cambiar agente

### ARCHITECT SENIOR
- `*arch-analyze-current` - Analizar arquitectura
- `*arch-design-solution` - Diseñar solución
- `*arch-create-c4` - Diagramas C4
- `*arch-create-adr` - ADR
- `*arch-tech-stack` - Stack tecnológico

### DEVELOPER PRO
- `*dev-implement-tdd` - Implementar TDD
- `*dev-code-review` - Code review
- `*dev-refactor` - Refactorizar
- `*dev-debug` - Debug
- `*dev-standards` - Estándares

### QA SPECIALIST
- `*qa-test-plan` - Plan testing
- `*qa-unit-tests` - Tests unitarios
- `*qa-integration-tests` - Tests integración
- `*qa-e2e-tests` - Tests E2E
- `*qa-coverage` - Cobertura
- `*qa-quality-report` - Reporte calidad
