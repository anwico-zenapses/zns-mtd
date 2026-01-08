# Custom Agents Module

## Descripción

Módulo de agentes especializados personalizados que extiende AWC-ZNS-MTD con expertise específico del equipo.

**ESTADO:** ✅ **COMPLETO - 22/22 agentes convertidos (100%)**

## Filosofía

Alineado con la filosofía ZNS (Zen-Neutro-Sistemático) del core:

- **ZEN**: Claridad técnica, código limpio, enfoque en valor
- **NEUTRO**: Decisiones basadas en métricas y evidencia
- **SISTEMÁTICO**: Procesos repetibles, documentación sincronizada

## 📊 Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| **Total agentes** | 22 |
| **Total workflows** | 191 |
| **Categorías** | 8 (Frontend, Backend, Infrastructure, Architecture, Quality, Business, AI, Documentation) |
| **Stacks cubiertos** | 15 tecnologías |
| **Líneas YAML** | ~8,857 |
| **Tamaño total** | ~354 KB |

## 📊 Agentes por Categoría

| Categoría | Agentes | Workflows | Stack Principal |
|-----------|---------|-----------|-----------------|
| **🎨 Frontend** | 2 | 20 | React, Next.js, React Native |
| **☕ Backend** | 4 | 49 | Java, Python, .NET, PHP |
| **🛠️ Infrastructure** | 2 | 22 | K8s, PostgreSQL, Jenkins |
| **🏗️ Architecture** | 4 | 34 | .NET, C4, DDD, Hexagonal |
| **🔍 Quality/Audit** | 3 | 20 | Lighthouse, OWASP, ISO |
| **📊 Business** | 2 | 15 | INVEST, TCO, FinOps |
| **🤖 AI/Prompts** | 2 | 9 | CoT, Multi-agent |
| **📄 Documentation** | 3 | 22 | MD→Word, PDF, Context |
| **TOTAL** | **22** | **191** | 15 stacks |

---

# 📖 Catálogo Completo de Agentes

## 🎨 FRONTEND DEVELOPMENT (2 agentes)

### 1. Frontend React Senior ⚛️
**ID:** `frontend-react-senior`  
**Stack:** React 18+, Next.js 14+, TypeScript 5+, Tailwind CSS 3+  
**Workflows:** 14  
**Cuando usar:** Desarrollo frontend web, optimización performance, accesibilidad WCAG 2.1 AA, SEO

**Workflows clave:**
- `*react-component` - Componente React + TypeScript + Tests
- `*nextjs-page` - Página Next.js App Router + SEO
- `*api-integration` - TanStack Query + Zod validation
- `*optimize-performance` - Bundle <200KB, LCP <2.5s
- `*quality-report` - Score ZNS /100

**Quality Standards:**
- Score objetivo: ≥80/100 (Performance 25% + A11y 20% + Security 20% + Code Quality 15% + Testing 10% + SEO 10%)
- Métricas: LCP <2.5s, FID <100ms, CLS <0.1, Coverage >80%, Lighthouse >85

---

### 2. React Native Senior 📱
**ID:** `react-native-senior`  
**Stack:** React Native (Expo/Bare), TypeScript, Hermes, Zustand, Jest, Detox  
**Workflows:** 6  
**Cuando usar:** Desarrollo mobile iOS/Android, Clean Architecture, DDD, TDD

**Workflows clave:**
- `*setup-rn-project` - Proyecto RN con estructura hexagonal
- `*create-aggregate` - Aggregate DDD con Value Objects
- `*create-use-case` - Use Case Application Layer
- `*run-tests` - Jest unit + Detox E2E (coverage >80%)

**Quality Standards:**
- Clean Architecture + DDD + TDD
- Coverage: Domain >95%, Application >90%, Infrastructure >80%

---

## ☕ BACKEND DEVELOPMENT (4 agentes)

### 3. Backend Java Senior ☕
**ID:** `backend-java-senior`  
**Stack:** Java 21 LTS, Spring Boot 3.4.x, PostgreSQL 16, Kafka, Redis 7  
**Workflows:** 17  
**Cuando usar:** Backend Java, arquitectura hexagonal, DDD, TDD, microservices

**Workflows clave:**
- `*implement-hut` - HUT con TDD Red-Green-Refactor (10 pasos)
- `*create-aggregate` - Aggregate DDD + Value Objects (Records)
- `*create-repository` - Spring Data JPA Method Queries (ZERO SQL hardcoding)
- `*kafka-integration` - Kafka Producer + Consumer
- `*mutation-testing` - PIT >75% mutation score

**Prohibiciones Absolutas:**
- ❌ **ZERO SQL HARDCODING** (solo Spring Data JPA Method Queries)
- ❌ **POST-only API** (GET solo /actuator/health)

**Quality Standards:**
- Coverage: Domain >95%, Application >90%, Infrastructure >80%
- SonarQube: Maintainability A, Reliability A, Security A
- Mutation Score >75%, Complexity <15 per method

---

### 4. Python Senior 🐍
**ID:** `python-senior`  
**Stack:** Python 3.11+, Django 4.2+, FastAPI, Pydantic, pytest, mypy  
**Workflows:** 11  
**Cuando usar:** Backend Python, APIs REST async, data processing, hexagonal architecture

**Workflows clave:**
- `*create-python-project` - Poetry + estructura hexagonal
- `*create-api-endpoint` - FastAPI + Pydantic validation
- `*async-service` - Servicio async con asyncio
- `*mypy-type-check` - Type checking mypy strict

**Quality Standards:**
- Type hints obligatorios (mypy strict)
- Coverage >85%, Black formatting, Ruff linting

---

### 5. .NET Core Senior 🔷
**ID:** `dotnet-core-senior`  
**Stack:** .NET 6/8, ASP.NET Core, MediatR, EF Core, FluentValidation  
**Workflows:** 11  
**Cuando usar:** .NET development, Clean Architecture, CQRS, microservices

**Workflows clave:**
- `*create-dotnet-solution` - Clean Architecture layers
- `*cqrs-command` - Command handler MediatR
- `*ef-migration` - EF Core migration
- `*integration-test` - TestServer integration tests

**Quality Standards:**
- Clean Architecture, CQRS con MediatR, Coverage >80%

---

### 6. PHP Senior 🐘
**ID:** `php-senior`  
**Stack:** PHP 8.2+, Laravel 10+, Symfony 6+, PHPStan Level 9, Doctrine  
**Workflows:** 10  
**Cuando usar:** PHP development, hexagonal architecture, strict types

**Workflows clave:**
- `*create-php-project` - Composer + estructura hexagonal
- `*domain-entity` - Entity + Value Objects
- `*phpstan-analysis` - PHPStan Level 9

**Quality Standards:**
- declare(strict_types=1) obligatorio, PHPStan L9, Coverage >80%

---

## 🛠️ INFRASTRUCTURE & DEVOPS (2 agentes)

### 7. DevSecOps OnPremise Senior 🔧
**ID:** `devsecops-onpremise-senior`  
**Stack:** K3s/K8s, Jenkins, ArgoCD, Trivy, Prometheus, Grafana, Terraform  
**Workflows:** 12  
**Cuando usar:** DevSecOps on-premise, K3s clusters, GitOps, security automation

**Workflows clave:**
- `*k3s-cluster-setup` - K3s multi-node cluster
- `*jenkins-pipeline` - CI/CD pipeline completo
- `*security-scan` - Trivy + OWASP ZAP
- `*gitops-deployment` - ArgoCD GitOps

**Quality Standards:**
- GitOps mandatory, Security scans (Trivy, ZAP), IaC (Terraform)

---

### 8. Database Engineer Senior 🗄️
**ID:** `database-engineer-senior`  
**Stack:** PostgreSQL 16, DDD Data Modeling, Flyway, pgTune  
**Workflows:** 10  
**Cuando usar:** Diseño BD, migraciones, performance tuning, DDD data modeling

**Convenciones CRÍTICAS:**
- PK: `pkid_{tabla}` (UUID)
- Timestamps: `creation_date`, `expiration_date`
- Naming: snake_case, singular tables
- Indexes obligatorios en FKs

**Workflows clave:**
- `*create-table-ddd` - Tabla DDD + convenciones
- `*migration-script` - Flyway con rollback
- `*performance-audit` - EXPLAIN ANALYZE

---

## 🏗️ ARCHITECTURE & DESIGN (4 agentes)

### 9. Solution Architect Senior 🏛️
**ID:** `solution-architect-senior`  
**Stack:** PlantUML C4, AWS/Azure/GCP, Terraform, ADRs, TCO  
**Workflows:** 5  
**Cuando usar:** Arquitectura de soluciones, ADRs, diagramas C4, estimación TCO

**Workflows clave:**
- `*design-architecture` - Diseño arquitectónico completo
- `*create-adr` - Architecture Decision Record
- `*create-c4-diagram` - Diagrama C4 (Context, Container, Component)
- `*estimate-costs` - TCO cloud 3 años

**Deliverables:**
- ADRs, Diagramas C4 L1-L3, API specs, TCO estimates

---

### 10. ASP.NET Core Architect Senior 🔷
**ID:** `aspnet-core-architect-senior`  
**Stack:** .NET 6/8, ASP.NET Core, MassTransit, Azure, Kubernetes, Helm  
**Workflows:** 11  
**Cuando usar:** Arquitectura .NET, hexagonal, DDD, CQRS, microservices, event-driven

**Workflows clave:**
- `*create-microservice-architecture` - Arquitectura microservices
- `*cqrs-command` - CQRS Command
- `*event-driven-integration` - MassTransit event-driven

**Architecture:**
- Hexagonal + DDD + CQRS + Event-Driven + Microservices

---

### 11. C4 Diagram Specialist 📐
**ID:** `c4-diagram-specialist`  
**Stack:** PlantUML, C4 Model, Graphviz, Draw.io  
**Workflows:** 11  
**Cuando usar:** Diagramas arquitectura C4, documentación visual, context mapping DDD

**Workflows clave:**
- `*c4-context` - C4 Level 1 (System Context)
- `*c4-container` - C4 Level 2 (Containers)
- `*c4-component` - C4 Level 3 (Components)
- `*context-map` - Context Map DDD

**Standards:**
- C4 Model compliance, PlantUML code generation, Git versioning

---

### 12. Technical Stories Architect 📝
**ID:** `technical-stories-architect`  
**Stack:** DDD, Hexagonal Architecture, TDD, OpenAPI, SQL, Java/Spring  
**Workflows:** 7  
**Cuando usar:** Descomponer épicas en HUTs, DDD strategic/tactical, hexagonal, TDD design

**Workflows clave:**
- `*full-technical-decomposition` - Épica → HUTs
- `*strategic-ddd-analysis` - Bounded Contexts
- `*tactical-ddd-modeling` - Aggregates, Value Objects
- `*generate-huts` - HUTs con tests, API, DB schemas

**Deliverables:**
- HUTs con Aggregates, Use Cases, Tests (JUnit 5), OpenAPI, SQL DDL

---

## 🔍 QUALITY & AUDIT (3 agentes)

### 13. Frontend Audit Master 🔍
**ID:** `frontend-audit-master`  
**Stack:** Lighthouse CI, axe DevTools, WAVE, npm audit, ESLint, Playwright  
**Workflows:** 6  
**Cuando usar:** Auditoría frontend completa, scoring /100, performance, a11y, security

**Workflows clave:**
- `*full-audit` - Auditoría completa frontend
- `*audit-performance` - Lighthouse + Core Web Vitals
- `*audit-accessibility` - axe + WAVE (WCAG 2.1 AA)
- `*audit-security` - npm audit + CSP headers

**Scoring System:**
```
Score = (
  Performance × 25% +
  Accessibility × 20% +
  Security × 20% +
  Code Quality × 15% +
  Testing × 10% +
  SEO × 10%
)
```

**Target:** Score ≥80/100

---

### 14. Backend Audit Master 🔍
**ID:** `backend-audit-master`  
**Stack:** OWASP Top 10, SonarQube, JaCoCo, ArchUnit, Trivy, Testcontainers  
**Workflows:** 7  
**Cuando usar:** Auditoría backend completa, scoring A-F, arquitectura, security, obsolescence

**Workflows clave:**
- `*full-audit` - Auditoría completa backend
- `*audit-architecture` - ArchUnit + hexagonal compliance
- `*audit-security` - OWASP Top 10 + CVE scan
- `*audit-obsolescence` - Tech stack EOL + CVEs

**Scoring System:**
- A (90-100), B (80-89), C (70-79), D (60-69), E (40-59), F (0-39)
- Dimensiones: Architecture, Security, Performance, Testing, Code Quality, Obsolescence

---

### 15. Validation Quality Master ✅
**ID:** `validation-quality-master`  
**Stack:** ISO 25010, IEEE 830, TOGAF, C4 Model, OWASP Top 10  
**Workflows:** 7  
**Cuando usar:** Validación calidad outputs, completitud, consistencia, corrección, claridad, trazabilidad

**Workflows clave:**
- `*full-validation` - Validación completa 5 dimensiones
- `*validate-completeness` - Completitud (todos los requisitos)
- `*validate-consistency` - Consistencia (sin contradicciones)
- `*validate-correctness` - Corrección (técnicamente correcto)

**5 Dimensiones:**
1. Completitud - Todos los elementos presentes
2. Consistencia - Sin contradicciones
3. Corrección - Técnicamente correcto
4. Claridad - Comprensible
5. Trazabilidad - Vinculación requisitos → implementación

---

## 📊 BUSINESS & PRODUCT (2 agentes)

### 16. Product Owner & Business Analyst 📊
**ID:** `product-owner-business-analyst`  
**Stack:** INVEST criteria, Gherkin BDD, User Story Mapping, MoSCoW  
**Workflows:** 10  
**Cuando usar:** Historias de usuario INVEST, backlog management, criterios Gherkin

**Workflows clave:**
- `*create-user-story` - Historia de usuario INVEST
- `*gherkin-scenario` - Escenario Gherkin BDD
- `*backlog-generation` - Backlog priorizado (MoSCoW)
- `*story-points` - Estimación Fibonacci

**Standards:**
- INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- Gherkin BDD syntax (Given-When-Then)

---

### 17. Cost Estimator Senior 💰
**ID:** `cost-estimator-senior`  
**Stack:** Story Points, TCO, FinOps, ROI/NPV/IRR, AWS/Azure pricing  
**Workflows:** 5  
**Cuando usar:** Estimación costos (story→horas→$), TCO cloud 3 años, ROI analysis

**Workflows clave:**
- `*estimate-project` - Proyecto completo (épicas → stories)
- `*estimate-cloud-tco` - TCO cloud 3 años
- `*calculate-roi` - ROI, NPV, IRR

**Capacidades:**
- Story Points → Horas → Costos ($)
- TCO cloud (Reserved, Spot, Rightsizing)
- FinOps (Cost optimization)

---

## 🤖 AI / PROMPT ENGINEERING (2 agentes)

### 18. Prompt Engineer Senior 🎨
**ID:** `prompt-engineer-senior`  
**Stack:** Chain-of-Thought, Tree-of-Thought, ReAct, Few-Shot, Self-Consistency  
**Workflows:** 5  
**Cuando usar:** Crear, analizar, optimizar prompts, técnicas avanzadas (CoT, ToT, ReAct)

**Workflows clave:**
- `*create-prompt` - Crear prompt estructurado
- `*optimize-prompt` - Optimizar performance/calidad
- `*test-prompt` - Validación contra casos de prueba

**Técnicas:**
- Chain-of-Thought (reasoning step-by-step)
- Tree-of-Thought (explore múltiples paths)
- ReAct (reasoning + acting)
- Few-Shot Learning

---

### 19. Prompt Architect Senior 🧠
**ID:** `prompt-architect-senior`  
**Stack:** Multi-agent systems, Workflow orchestration, ISO/IEC 23053, IEEE 7000  
**Workflows:** 4  
**Cuando usar:** Arquitectura de prompts, multi-agent systems, workflows complejos

**Workflows clave:**
- `*architect-prompt` - Arquitectura multi-agent
- `*design-agent-persona` - Diseñar personalidad de agente
- `*design-workflow` - Workflow orchestration
- `*validate-compliance` - Validar estándares (ISO, IEEE)

**Standards:**
- ISO/IEC 23053 (AI framework)
- IEEE 7000-2021 (Ethics AI)
- NIST AI RMF

---

## 📄 DOCUMENTATION & ANALYSIS (3 agentes)

### 20. Consolidation Context Master 🔧
**ID:** `consolidation-context-master`  
**Stack:** PDF parsing, OCR, NLP, Markdown generation, Python  
**Workflows:** 7  
**Cuando usar:** Consolidar contexto proyecto desde múltiples fuentes (PDFs, Word, código)

**Workflows clave:**
- `*full-consolidation` - Consolidación completa
- `*extract-business-context` - Extraer contexto negocio
- `*extract-functional-requirements` - Extraer RFs (>30)
- `*extract-non-functional-requirements` - Extraer RNFs (>10)

**Deliverables:**
- 01-contexto-negocio.md (>1000 palabras)
- 02-requisitos-funcionales.md (>30 RFs)
- 03-requisitos-no-funcionales.md (>10 RNFs)

---

### 21. Document Export Specialist 📄
**ID:** `document-export-specialist`  
**Stack:** pandoc, python-docx, PlantUML CLI, Word .docx  
**Workflows:** 8  
**Cuando usar:** Exportar documentación Markdown→Word con formato profesional

**Workflows clave:**
- `*full-export` - Exportación completa 8 documentos
- `*convert-markdown-to-word` - MD → Word profesional
- `*export-architecture-document` - Doc arquitectura + diagramas

**Deliverables (8 documentos Word):**
1. Resumen Ejecutivo
2. Contexto de Negocio
3. Requisitos Funcionales
4. Requisitos No Funcionales
5. Arquitectura de Solución
6. Especificaciones API
7. Roadmap
8. Supuestos y Restricciones

---

### 22. Obsolescence Analyst Senior ⚠️
**ID:** `obsolescence-analyst-senior`  
**Stack:** NVD NIST, CVE database, EOL tracking, Risk matrix, C4 diagrams  
**Workflows:** 7  
**Cuando usar:** Análisis obsolescencia tecnológica, CVEs, EOL, plan modernización

**Workflows clave:**
- `*full-obsolescence-analysis` - Análisis completo obsolescencia
- `*inventory-tech-stack` - Inventario stack (versiones, EOL)
- `*identify-vulnerabilities` - CVEs (NVD NIST)
- `*create-modernization-plan` - Plan de modernización

**Deliverables:**
- Reporte obsolescencia
- Matriz de riesgos (P0-P3)
- Plan de modernización
- Diagramas C4

---

# 🚀 Cómo Usar

## Opción 1: Manual (Actual)

```bash
# 1. Navegar a carpeta de agentes
cd awc-zns-mtd/src/modules/custom-agents/agents

# 2. Abrir agente deseado
code backend-java-senior.agent.yaml

# 3. Copiar contenido completo

# 4. Pegar en GitHub Copilot Chat

# 5. Usar comandos
*help                    # Ver menú completo
*implement-hut          # Implementar HUT (Java)
*react-component        # Crear componente (React)
*k3s-cluster-setup      # Setup cluster (DevOps)
```

## Opción 2: CLI (Futuro - v1.1.0)

```bash
# Listar agentes disponibles
awc list-agents --module=custom-agents

# Cargar agente específico
awc load-agent backend-java-senior

# Cambiar entre agentes
awc switch-agent python-senior
```

---

# 📝 Estructura del Módulo

```
custom-agents/
├── config.yaml                          # Configuración del módulo (22 agentes)
├── README.md                            # Esta documentación
├── CONVERSION_SUMMARY.md                # Resumen de conversión
├── ARCHITECTURE.md                      # Documentación arquitectónica
├── agents/                              # 22 Agentes YAML
│   ├── frontend-react-senior.agent.yaml
│   ├── react-native-senior.agent.yaml
│   ├── backend-java-senior.agent.yaml
│   ├── python-senior.agent.yaml
│   ├── dotnet-core-senior.agent.yaml
│   ├── php-senior.agent.yaml
│   ├── devsecops-onpremise-senior.agent.yaml
│   ├── database-engineer-senior.agent.yaml
│   ├── solution-architect-senior.agent.yaml
│   ├── aspnet-core-architect-senior.agent.yaml
│   ├── c4-diagram-specialist.agent.yaml
│   ├── technical-stories-architect.agent.yaml
│   ├── frontend-audit-master.agent.yaml
│   ├── backend-audit-master.agent.yaml
│   ├── validation-quality-master.agent.yaml
│   ├── product-owner-business-analyst.agent.yaml
│   ├── cost-estimator-senior.agent.yaml
│   ├── prompt-engineer-senior.agent.yaml
│   ├── prompt-architect-senior.agent.yaml
│   ├── consolidation-context-master.agent.yaml
│   ├── document-export-specialist.agent.yaml
│   └── obsolescence-analyst-senior.agent.yaml
├── workflows/                           # Workflows específicos (futuro)
└── resources/                           # Recursos compartidos (futuro)
    ├── templates/
    ├── checklists/
    └── snippets/
```

---

# 🎯 Roadmap

## v1.1.0 - Recursos Compartidos
- [ ] Templates de componentes (React, Java, .NET)
- [ ] Checklists de calidad reutilizables
- [ ] Snippets comunes por stack
- [ ] Documentación de patrones

## v1.2.0 - Integración CLI
- [ ] Comando `awc install-module custom-agents`
- [ ] Comando `awc load-agent {id}`
- [ ] Auto-detección de agentes custom
- [ ] Catálogo interactivo de agentes

## v1.3.0 - Validación y Testing
- [ ] JSON Schema validation para YAMLs
- [ ] Testing funcional de workflows
- [ ] CI/CD pipeline para validar agentes

---

# 🤝 Contribuir

Para agregar nuevos agentes custom:

1. Crear archivo YAML en `agents/`
2. Seguir estructura de templates existentes
3. Incluir filosofía ZNS
4. Definir workflows claros
5. Documentar en `config.yaml`
6. Actualizar este README

---

# 📚 Referencias

- **AWC-ZNS-MTD Core:** `src/modules/awc-zns-mtd/`
- **Configuración Módulo:** `config.yaml`
- **Arquitectura:** `ARCHITECTURE.md`
- **Conversión:** `CONVERSION_SUMMARY.md`

---

# 📊 Estadísticas Finales

| Métrica | Valor |
|---------|-------|
| **Agentes convertidos** | 22/22 (100%) |
| **Total workflows** | 191 |
| **Total líneas YAML** | ~8,857 |
| **Tamaño total** | ~354 KB |
| **Tiempo estimado desarrollo** | 15-20 horas |
| **Tiempo real (automatizado)** | 2-3 horas |
| **Ahorro de tiempo** | ~85-90% |

---

## Compatibilidad

- **AWC-ZNS-MTD**: v1.0.0+
- **Node.js**: >=18.0.0
- **Filosofía**: ZNS v2.2 (Zen-Neutro-Sistemático)

## Licencia

MIT - Mismo que AWC-ZNS-MTD Core

---

**Última actualización:** 7 de enero de 2026  
**Framework:** AWC-ZNS-MTD v1.0.0  
**Autor:** GitHub Copilot (Claude Sonnet 4.5)
