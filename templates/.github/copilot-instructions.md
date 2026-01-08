# GitHub Copilot - Instrucciones del Proyecto

Este proyecto utiliza la **metodología AWC ZNS-MTD** (Zen-Neutro-Sistemático Method for Digital Transformation).

## 🧘 Filosofía ZNS

Sigue estos principios en todas las interacciones:

- **ZEN**: Claridad, simplicidad deliberada, sin ruido. Enfócate en el problema real, no en síntomas.
- **NEUTRO**: Objetividad técnica basada en evidencia. Decisiones fundamentadas en datos y métricas.
- **SISTEMÁTICO**: Procesos repetibles, documentación rigurosa, trazabilidad completa.

## 📁 Estructura del Proyecto

```
.awc/
├── agents/              # Agentes especializados YAML
│   ├── zen-master.agent.yaml       # Orquestador principal
│   ├── architect-senior.agent.yaml # Diseñador de soluciones
│   ├── developer-pro.agent.yaml    # Experto en implementación
│   └── qa-specialist.agent.yaml    # Especialista en calidad
├── workflows/           # Workflows declarativos
│   ├── quick-flow/     # <10 min: bugs, hotfixes
│   ├── standard-flow/  # <30 min: features, refactoring
│   └── enterprise-flow/ # <2 hrs: sistemas complejos
└── config.yaml         # Configuración del método
```

## 🎯 Agentes Disponibles

### ZEN MASTER (Orquestador)
**Cuándo usar**: Coordinación estratégica, toma de decisiones, análisis de complejidad.
**Archivo**: `.awc/agents/zen-master.agent.yaml`
**Comandos clave**: *zns-quick-flow, *zns-standard-flow, *zns-enterprise-flow

### ARCHITECT SENIOR (Diseñador)
**Cuándo usar**: Diseño de arquitectura, decisiones técnicas, ADRs, diagramas C4.
**Archivo**: `.awc/agents/architect-senior.agent.yaml`
**Comandos clave**: *arch-design-solution, *arch-create-c4, *arch-create-adr

### DEVELOPER PRO (Implementador)
**Cuándo usar**: Desarrollo con TDD, code review, refactoring, debugging.
**Archivo**: `.awc/agents/developer-pro.agent.yaml`
**Comandos clave**: *dev-implement-tdd, *dev-code-review, *dev-refactor

### QA SPECIALIST (Calidad)
**Cuándo usar**: Testing, cobertura, validación, reportes de calidad.
**Archivo**: `.awc/agents/qa-specialist.agent.yaml`
**Comandos clave**: *qa-test-plan, *qa-unit-tests, *qa-coverage

## 🔄 Workflows Recomendados

### Quick Flow (<10 min)
Para: Bugs, hotfixes, cambios menores
Proceso: Init → Spec → Implement → Test

### Standard Flow (<30 min)
Para: Features nuevas, refactoring moderado
Proceso: Análisis → Planificación → Arquitectura → Implementación → Validación

### Enterprise Flow (<2 hrs)
Para: Sistemas complejos, migraciones, arquitecturas grandes
Proceso: Discovery → Requirements → Design → Plan → Development → QA → Deploy

## 📋 Estándares de Calidad

Todos los cambios deben cumplir:
- **Cobertura de tests**: >80%
- **Deuda técnica**: <5%
- **Code review**: Obligatorio
- **Documentación**: Sincronizada con código
- **TDD**: Test-first development

## 🛠️ Comandos CLI Disponibles

```bash
awc status      # Ver estado del proyecto
awc validate    # Validar estructura
awc config      # Configurar preferencias
```

## 💡 Cómo Trabajar con Agentes

1. **Referencia el agente apropiado** según la tarea:
   - Arquitectura/Diseño → ARCHITECT SENIOR
   - Implementación → DEVELOPER PRO
   - Testing/Calidad → QA SPECIALIST
   - Coordinación → ZEN MASTER

2. **Sigue el workflow** recomendado según complejidad

3. **Documenta decisiones** en formato ADR cuando sea arquitectónico

4. **Mantén trazabilidad** de todas las decisiones técnicas

## 📖 Documentación

- **Getting Started**: `docs/getting-started/quick-start.md`
- **Guías**: `docs/guides/`
- **Ejemplos**: `docs/examples/`
- **Referencia**: `docs/reference/`

## 🎨 Estilo de Código

- **Comunicación**: Español con el usuario
- **Código**: Inglés (nombres de variables, funciones, comentarios técnicos)
- **Documentación**: Español
- **Commits**: Conventional Commits en español

## ⚡ Principios de Desarrollo

1. **Simplicidad deliberada** sobre complejidad accidental
2. **Decisiones basadas en evidencia** no en opiniones
3. **Procesos repetibles** y documentados
4. **Mejora continua** basada en métricas
5. **Colaboración inteligente** entre agentes según necesidad

---

Para más detalles, consulta la configuración completa en `.awc/config.yaml`
