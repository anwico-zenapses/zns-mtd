# 🏗️ Arquitectura: Módulo Custom Agents

## Visión General

El módulo **custom-agents** extiende AWC-ZNS-MTD con agentes especializados personalizados, manteniendo separación clara entre el **core framework** (4 agentes genéricos) y **agentes custom del equipo** (10+ agentes especializados).

---

## Estructura de Directorios

```
custom-agents/
├── config.yaml                          # Configuración del módulo
├── README.md                            # Documentación principal
├── CONVERSION_SUMMARY.md                # Resumen de conversión markdown → YAML
├── ARCHITECTURE.md                      # Este archivo
├── agents/                              # Agentes YAML (10 agentes)
│   ├── frontend-react-senior.agent.yaml
│   ├── backend-java-senior.agent.yaml
│   ├── python-senior.agent.yaml
│   ├── dotnet-core-senior.agent.yaml
│   ├── php-senior.agent.yaml
│   ├── devsecops-onpremise-senior.agent.yaml
│   ├── database-engineer-senior.agent.yaml
│   ├── aspnet-core-architect-senior.agent.yaml
│   ├── c4-diagram-specialist.agent.yaml
│   └── product-owner-business-analyst.agent.yaml
├── workflows/                           # Workflows específicos (futuro)
│   └── (vacío - próxima versión)
└── resources/                           # Recursos compartidos (futuro)
    ├── templates/                       # Templates de código
    ├── checklists/                      # Checklists de calidad
    └── snippets/                        # Snippets reutilizables
```

---

## Diseño del Formato YAML

### Estructura Obligatoria

Todos los agentes custom siguen esta estructura:

```yaml
agent:
  # METADATA
  metadata:
    name: "NOMBRE DESCRIPTIVO"
    id: "identificador-kebab-case"        # Único, sin espacios
    title: "TÍTULO CORTO"
    icon: "🎯"                             # Emoji relevante
    module: "custom-agents"                # Siempre "custom-agents"
    version: "1.0.0"                       # Semver
    whenToUse: "Descripción de cuándo usar"
  
  # ACCIONES CRÍTICAS (previas a saludar)
  critical_actions:
    - "Acción 1"
    - "Acción 2"
  
  # PERSONALIDAD DEL AGENTE
  persona:
    role: "Rol completo"
    level: "Senior/Lead/Expert"
    communication_style: "Estilo de comunicación"
    identity: "Identidad técnica"
    focus: "Enfoque principal"
    
    # FILOSOFÍA ZNS (obligatoria)
    philosophy:
      zen:
        description: "Claridad, simplicidad..."
        practices: []
      neutro:
        description: "Basado en métricas..."
        practices: []
      sistematico:
        description: "Repetible, documentado..."
        practices: []
    
    core_principles:
      - "Principio 1"
      - "Principio 2"
  
  # STACK TECNOLÓGICO
  stack_tecnologico:
    core: []
    # ... otros grupos según el agente
  
  # ESTÁNDARES DE CALIDAD
  quality_standards:
    # Métricas específicas (coverage, complexity, etc.)
    # Red flags bloqueantes
  
  # ARQUITECTURA (si aplica)
  architecture:
    pattern: "Patrón arquitectónico"
    layers: {}
    # ...
  
  # MENÚ DE COMANDOS
  menu:
    welcome_message: |
      Mensaje de bienvenida
    
    items:
      - trigger: "*help"
        description: "Mostrar menú"
        action: "display_menu"
      
      - trigger: "*comando"
        description: "Descripción"
        workflow: "nombre-workflow"
        prompt_template: |
          Template de prompt
  
  # COMPORTAMIENTO
  behavior:
    code_generation_rules: []
    response_format: []
    validation_checklist: []
  
  # PROHIBICIONES (si aplica)
  prohibiciones_absolutas:
    regla_1:
      regla: "Descripción"
      nunca_usar: []
      siempre_usar: []
  
  # WORKFLOWS
  workflows:
    nombre_workflow:
      steps:
        - "Paso 1"
        - "Paso 2"
      
      output:
        - "Archivo generado 1"
        - "Archivo generado 2"
      
      metrics:
        - "Métrica 1"
        - "Métrica 2"
  
  # INTEGRACIÓN CON OTROS AGENTES/TOOLS
  integration:
    invokes_quality_tools:
      when: []
      tools: []
      example: |
        Comando de ejemplo
```

---

## Principios de Diseño

### 1. Separación Core vs Custom

```
awc-zns-mtd/
├── src/modules/
│   ├── awc-zns-mtd/              # CORE (4 agentes genéricos)
│   │   ├── zen-master.agent.yaml
│   │   ├── architect-senior.agent.yaml
│   │   ├── developer-pro.agent.yaml
│   │   └── qa-specialist.agent.yaml
│   │
│   └── custom-agents/            # CUSTOM (10+ agentes especializados)
│       ├── frontend-react-senior.agent.yaml
│       ├── backend-java-senior.agent.yaml
│       └── ...
```

**Ventajas:**
- ✅ **Core estable:** Framework base no se modifica al agregar agentes custom
- ✅ **Versionado independiente:** Core v1.0.0, Custom v1.0.0 (evolucionan por separado)
- ✅ **Testing aislado:** Tests de custom no afectan core
- ✅ **Extensibilidad:** Equipos pueden crear sus propios módulos custom

---

### 2. Filosofía ZNS Obligatoria

Todos los agentes custom DEBEN incluir sección `persona.philosophy`:

```yaml
philosophy:
  zen:
    description: "..."
    practices: []
  neutro:
    description: "..."
    practices: []
  sistematico:
    description: "..."
    practices: []
```

**Razón:**
- Alineación con metodología BMAD V6
- Garantiza coherencia entre agentes
- Framework reconocible (estilo "firma")

---

### 3. Comandos vs Workflows

#### Comandos (*trigger)

Menú interactivo para el usuario:

```yaml
menu:
  items:
    - trigger: "*help"
      description: "📋 Mostrar menú"
      action: "display_menu"
    
    - trigger: "*react-component"
      description: "⚛️ Crear componente React"
      workflow: "create-react-component"
```

#### Workflows (procedimientos)

Pasos detallados para ejecutar:

```yaml
workflows:
  create_react_component:
    steps:
      - "1. Analizar requisitos"
      - "2. Diseñar props interface"
      - "3. Implementar componente"
      - "4. Crear tests"
    
    output:
      - "Component.tsx"
      - "Component.test.tsx"
```

**Relación:**
- Comando `*react-component` → invoca workflow `create_react_component`
- Usuario ejecuta comando → Agente sigue workflow

---

### 4. Quality Standards Cuantificados

Cada agente define métricas medibles:

```yaml
quality_standards:
  testing_coverage:
    domain_layer: ">95%"
    application_layer: ">90%"
    overall: ">85%"
  
  sonarqube:
    maintainability: "A"
    reliability: "A"
    security: "A"
  
  red_flags_bloqueantes:
    - "❌ Coverage <85%"
    - "❌ SQL hardcoded"
```

**Ventajas:**
- Cuantificable (no "buena calidad", sino ">85%")
- Verificable (SonarQube, JaCoCo, etc.)
- Comparable entre proyectos

---

## Flujo de Trabajo: Cómo Usar un Agente

### Ciclo de Vida del Agente

```
┌─────────────────────────────────────────────────────────────┐
│  1. USUARIO: Necesita desarrollar feature                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  2. SELECCIÓN: Identificar agente apropiado                │
│     - Backend Java → backend-java-senior.agent.yaml        │
│     - Frontend React → frontend-react-senior.agent.yaml    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  3. CARGA: Copiar YAML completo a GitHub Copilot Chat      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  4. CONTEXTO: Agente se presenta (welcome_message)         │
│     ☕ BACKEND JAVA SENIOR - Ready!                        │
│     Usa *help para ver comandos                            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  5. COMANDO: Usuario ejecuta comando                       │
│     *implement-hut                                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  6. WORKFLOW: Agente sigue pasos del workflow               │
│     1. Leer HUT                                             │
│     2. 🔴 RED: Test fallido                                │
│     3. 🟢 GREEN: Código mínimo                             │
│     4. 🔵 REFACTOR: Mejorar                                │
│     ...                                                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  7. VALIDACIÓN: Verificar quality_standards                │
│     - Coverage >85% ✅                                      │
│     - SonarQube A ✅                                        │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  8. OUTPUT: Código + Tests + Documentación                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Integración con GitHub Copilot

### Opción 1: Carga Manual (Actual)

```bash
# 1. Abrir agente
code backend-java-senior.agent.yaml

# 2. Copiar todo (Ctrl+A, Ctrl+C)

# 3. Pegar en GitHub Copilot Chat
# (El agente carga su personalidad, comandos, workflows)

# 4. Ejecutar comandos
*help
*implement-hut
```

### Opción 2: .github/copilot-instructions.md (Referencia)

```markdown
# GitHub Copilot Instructions

## Agentes Disponibles

Usa estos agentes según el contexto:

- **Backend Java:** `src/modules/custom-agents/agents/backend-java-senior.agent.yaml`
- **Frontend React:** `src/modules/custom-agents/agents/frontend-react-senior.agent.yaml`
- **DevOps:** `src/modules/custom-agents/agents/devsecops-onpremise-senior.agent.yaml`

## Ejemplo

Para desarrollo backend Java Spring Boot:
1. Cargar agente: backend-java-senior.agent.yaml
2. Usar comando: *implement-hut
3. Seguir workflow TDD Red-Green-Refactor
```

### Opción 3: CLI (Futuro v1.3.0)

```bash
# Listar agentes
awc list-agents --module=custom-agents

# Cargar agente automáticamente
awc load-agent backend-java-senior

# Switch entre agentes
awc switch-agent frontend-react-senior
```

---

## Versionado y Evolución

### Semver para Agentes

Cada agente tiene versión independiente:

```yaml
metadata:
  version: "1.0.0"  # MAJOR.MINOR.PATCH
```

**Reglas:**
- **MAJOR:** Cambio incompatible (comandos eliminados, estructura YAML modificada)
- **MINOR:** Nueva funcionalidad compatible (nuevo comando, nuevo workflow)
- **PATCH:** Bug fix (corrección de typo, mejora de descripción)

**Ejemplo:**
- `1.0.0` → Primera versión estable
- `1.1.0` → Agregar comando `*kafka-integration`
- `1.1.1` → Corregir typo en workflow TDD
- `2.0.0` → Cambiar estructura de `menu.items` (breaking change)

---

### Compatibilidad con Core

```yaml
# custom-agents/config.yaml
module:
  metadata:
    version: "1.0.0"
    requires:
      awc_core: ">=1.0.0"  # Requiere core v1.0.0 o superior
```

---

## Testing de Agentes

### Validación de Formato

```bash
# Validar YAML sintácticamente correcto
yamllint agents/*.yaml

# Validar estructura con JSON Schema (futuro)
awc validate-agent backend-java-senior
```

### Testing Funcional

```bash
# Ejecutar comandos del agente y verificar output
awc test-agent backend-java-senior --command="*implement-hut"

# Verificar workflows generan código esperado
awc test-workflow create-aggregate --input=example.hut
```

---

## Migración de Markdown a YAML

### Proceso de Conversión

```
Markdown (2000 líneas)
    │
    ▼
[Análisis manual/automatizado]
    │
    ├── Extraer metadata (rol, stack, filosofía)
    ├── Identificar comandos (buscar patrones "*")
    ├── Extraer workflows (secciones, pasos)
    ├── Mapear métricas (coverage, scoring)
    └── Alinear con filosofía ZNS
    │
    ▼
YAML (450 líneas)
    │
    ├── metadata: {...}
    ├── persona.philosophy: {zen, neutro, sistematico}
    ├── menu.items: [{trigger: "*cmd", workflow: "..."}]
    ├── workflows: {nombre: {steps: [], output: []}}
    └── quality_standards: {coverage: ">85%", ...}
```

### Estadísticas de Conversión

| Aspecto | Markdown | YAML | Mejora |
|---------|----------|------|--------|
| Líneas | 1848 (React) | 440 | -76% |
| Estructura | Libre | Tipada | +300% |
| Navegabilidad | Texto plano | Menú interactivo | ✅ |
| Versionado | Manual | Semver | ✅ |

---

## Extensibilidad

### Agregar Nuevo Agente

```bash
# 1. Crear archivo YAML
cp templates/agent-template.yaml agents/mi-nuevo-agente.agent.yaml

# 2. Editar metadata y workflows
code agents/mi-nuevo-agente.agent.yaml

# 3. Registrar en config.yaml
# Agregar entrada en `agents:` section

# 4. Documentar en README.md
# Actualizar catálogo de agentes

# 5. Validar
awc validate-agent mi-nuevo-agente
```

---

## Comparación: Core vs Custom

| Aspecto | Core Agents | Custom Agents |
|---------|-------------|---------------|
| **Cantidad** | 4 (zen-master, architect, developer, qa) | 10+ (especializados) |
| **Propósito** | Genéricos, framework base | Específicos del equipo/stack |
| **Versionado** | Estable, cambios raros | Evoluciona frecuentemente |
| **Filosofía** | ZNS puro | ZNS + especialización técnica |
| **Comandos** | Universales (`*plan`, `*review`) | Stack-specific (`*react-component`, `*implement-hut`) |
| **Workflows** | High-level (planning, review) | Detallados (TDD, arquitectura) |
| **Testing** | Validado en múltiples proyectos | Validado en proyectos del equipo |

---

## Roadmap de Arquitectura

### v1.1.0 - Agentes Restantes
- [ ] Convertir 12 agentes pendientes
- [ ] Templates de agentes por categoría
- [ ] Validación automática con JSON Schema

### v1.2.0 - Recursos Compartidos
- [ ] `resources/templates/` - Templates de código por stack
- [ ] `resources/checklists/` - Checklists reutilizables
- [ ] `resources/snippets/` - Snippets comunes

### v1.3.0 - CLI Integration
- [ ] `awc load-agent {id}` - Cargar agente automáticamente
- [ ] `awc switch-agent {id}` - Cambiar entre agentes
- [ ] `awc validate-agent {id}` - Validar estructura YAML
- [ ] `awc test-agent {id}` - Testing funcional

### v2.0.0 - Agentes Dinámicos
- [ ] **Composer de agentes**: Combinar múltiples agentes
- [ ] **Agentes contextuales**: Auto-activación según archivos en workspace
- [ ] **Marketplace**: Compartir agentes entre equipos

---

## Conclusión

La arquitectura del módulo **custom-agents** equilibra:

✅ **Separación:** Core estable vs Custom evolutivo  
✅ **Estandarización:** Formato YAML consistente, filosofía ZNS obligatoria  
✅ **Flexibilidad:** Cada equipo puede crear sus agentes especializados  
✅ **Escalabilidad:** Versionado semver, testing aislado, extensibilidad modular  

**Próximo paso:** Implementar CLI para carga automática de agentes (v1.3.0)

---

**Documento:** ARCHITECTURE.md  
**Versión:** 1.0.0  
**Fecha:** 7 de enero de 2026  
**Autor:** GitHub Copilot (Claude Sonnet 4.5)
