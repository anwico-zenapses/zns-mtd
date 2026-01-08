# 🚀 Guía de Uso - Agentes Custom desde GitHub Copilot Chat

## 📋 Comando Inicial - Ver Agentes Disponibles

Copia y pega este prompt en GitHub Copilot Chat:

```
Lee el archivo: awc-zns-mtd/src/modules/custom-agents/config.yaml

Muéstrame:
1. Lista completa de agentes disponibles (22 agentes)
2. Organízalos por categoría (Frontend, Backend, Infrastructure, Architecture, Quality, Business, AI, Documentation)
3. Para cada agente muestra: ID, cuando usarlo, y workflows disponibles

Formato tabla markdown
```

---

## 🎯 Cómo Usar un Agente Específico

### Paso 1: Cargar el Agente

```
Lee el archivo completo: awc-zns-mtd/src/modules/custom-agents/agents/frontend-react-senior.agent.yaml

Actúa como este agente. Usa su:
- Filosofía ZNS
- Stack tecnológico
- Quality standards
- Workflows
- Convenciones

Confirma que estás listo mostrándome el menú de comandos disponibles (workflows)
```

### Paso 2: Ejecutar un Workflow

Una vez cargado el agente, usa los comandos con `*`:

```
*help
```

```
*create-react-component
Nombre: ProductCard
Tipo: Interactive card with image, title, price, add-to-cart button
Props: product (id, name, price, image, stock)
```

---

### Infrastructure (usa `#file:`)

**DevSecOps:**
```
#file:devsecops-onpremise-senior.agent.yaml *help
#file:devsecops-onpremise-senior.agent.yaml *k3s-cluster-setup
#file:devsecops-onpremise-senior.agent.yaml *jenkins-pipeline
```

**Database:**
```
#file:database-engineer-senior.agent.yaml *help
#file:database-engineer-senior.agent.yaml *create-table-ddd
```

### Architecture (usa `#file:`)

**Solution Architect:**
```
#file:solution-architect-senior.agent.yaml *help
#file:solution-architect-senior.agent.yaml *design-architecture
#file:solution-architect-senior.agent.yaml *create-c4-diagram
```

**Technical Stories:**
```
#file:technical-stories-architect.agent.yaml *help
#file:technical-stories-architect.agent.yaml *full-technical-decomposition
```

**C4 Diagrams:**
```
#file:c4-diagram-specialist.agent.yaml *help
#file:c4-diagram-specialist.agent.yaml *c4-context
```

### Quality/Audit (usa `#file:`)

**Frontend Audit:**
```
#file:frontend-audit-master.agent.yaml *help
#file:frontend-audit-master.agent.yaml *full-audit
```

**Backend Audit:**
```
#file:backend-audit-master.agent.yaml *help
#file:backend-audit-master.agent.yaml *full-audit
```

**Validation:**
```
#file:validation-quality-master.agent.yaml *help
#file:validation-quality-master.agent.yaml *full-validation
```

### Business (usa `#file:`)

**Product Owner:**
```
#file:product-owner-business-analyst.agent.yaml *help
#file:product-owner-business-analyst.agent.yaml *create-user-story
```

**Cost Estimator:**
```
#file:cost-estimator-senior.agent.yaml *help
#file:cost-estimator-senior.agent.yaml *estimate-project
```

### AI/Prompts (usa `#file:`)

**Prompt Engineer:**
```
#file:prompt-engineer-senior.agent.yaml *help
#file:prompt-engineer-senior.agent.yaml *create-prompt
```

**Prompt Architect:**
```
#file:prompt-architect-senior.agent.yaml *help
#file:prompt-architect-senior.agent.yaml *architect-prompt
```

### Documentation (usa `#file:`)

**Consolidation:**
```
#file:consolidation-context-master.agent.yaml *help
#file:consolidation-context-master.agent.yaml *full-consolidation
```

**Export:**
```
#file:document-export-specialist.agent.yaml *help
#file:document-export-specialist.agent.yaml *full-export
```

**Obsolescence:**
```
#file:obsolescence-analyst-senior.agent.yaml *help
#file:obsolescence-analyst-senior.agent.yaml *full-obsolescence-analysis
```

---

## 📊 Catálogo Rápido de Agentes

| # | ID | Categoría | Cuando usar |
|---|----|-----------| ------------|
| 1 | `frontend-react-senior` | 🎨 Frontend | React 18+, Next.js, TypeScript, performance |
| 2 | `react-native-senior` | 🎨 Frontend | React Native, mobile iOS/Android |
| 3 | `backend-java-senior` | ☕ Backend | Java 21, Spring Boot, hexagonal, DDD |
| 4 | `python-senior` | 🐍 Backend | Python 3.11+, FastAPI, Django |
| 5 | `dotnet-core-senior` | 🔷 Backend | .NET 6/8, Clean Architecture, CQRS |
| 6 | `php-senior` | 🐘 Backend | PHP 8.2+, Laravel, Symfony |
| 7 | `devsecops-onpremise-senior` | 🔧 Infra | K3s, Jenkins, GitOps, security |
| 8 | `database-engineer-senior` | 🗄️ Infra | PostgreSQL 16, DDD data modeling |
| 9 | `solution-architect-senior` | 🏛️ Architecture | Diseño soluciones, C4, ADRs, TCO |
| 10 | `aspnet-core-architect-senior` | 🔷 Architecture | .NET microservices, event-driven |
| 11 | `c4-diagram-specialist` | 📐 Architecture | Diagramas C4, PlantUML |
| 12 | `technical-stories-architect` | 📝 Architecture | Épicas → HUTs, DDD, hexagonal |
| 13 | `frontend-audit-master` | 🔍 Quality | Auditoría frontend (Score /100) |
| 14 | `backend-audit-master` | 🔍 Quality | Auditoría backend (Score A-F) |
| 15 | `validation-quality-master` | ✅ Quality | Validación 5 dimensiones |
| 16 | `product-owner-business-analyst` | 📊 Business | Historias INVEST, Gherkin BDD |
| 17 | `cost-estimator-senior` | 💰 Business | Story Points, TCO, ROI/NPV |
| 18 | `prompt-engineer-senior` | 🎨 AI | CoT, ToT, ReAct, prompts |
| 19 | `prompt-architect-senior` | 🧠 AI | Multi-agent systems, workflows |
| 20 | `consolidation-context-master` | 🔧 Docs | PDF parsing, contexto proyectos |
| 21 | `document-export-specialist` | 📄 Docs | Markdown → Word (8 docs) |
| 22 | `obsolescence-analyst-senior` | ⚠️ Docs | CVE/EOL, tech stack analysis |

---

## 🎯 Flujos Automáticos

### Proyecto Nuevo - E-commerce

**1. Arquitectura:**
```
#file:solution-architect-senior.agent.yaml *design-architecture E-commerce B2C
```

**2. Descomponer:**
```
#file:technical-stories-architect.agent.yaml *full-technical-decomposition Carrito de compras
```

**3. Frontend:**
```
#file:frontend-react-senior.agent.yaml *create-react-component ProductCard
#file:frontend-react-senior.agent.yaml *create-nextjs-page /products
```

**4. Backend:**
```
#file:backend-java-senior.agent.yaml *implement-hut Agregar producto al carrito
```

**5. Auditar:**
```
#file:frontend-audit-master.agent.yaml *full-audit
#file:backend-audit-master.agent.yaml *full-audit
```

### Proyecto Existente - Auditoría

**1. Tech Stack:**
```
#file:obsolescence-analyst-senior.agent.yaml *full-obsolescence-analysis
```

**2. Frontend:**
```
#file:frontend-audit-master.agent.yaml *full-audit
```

**3. Backend:**
```
#file:backend-audit-master.agent.yaml *full-audit
```

**4. Validar:**
```
#file:validation-quality-master.agent.yaml *full-validation
```

---

## 💡 Combinar Agentes

**Diseño + Implementación:**
```
#file:solution-architect-senior.agent.yaml diseña arquitectura
#file:frontend-react-senior.agent.yaml implementa frontend
#file:backend-java-senior.agent.yaml implementa backend
```

**Desarrollo + Auditoría:**
```
#file:backend-java-senior.agent.yaml *implement-hut
#file:backend-audit-master.agent.yaml audita lo generado
```

---

## 📚 Referencias Rápidas

- **Catálogo completo**: [README.md](README.md)
- **Configuración**: [config.yaml](config.yaml)
- **Arquitectura**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Resumen conversión**: [FINAL_SUMMARY.md](FINAL_SUMMARY.md)

---

## 🎉 Demo Completo - E-commerce

**Paso 1 - Arquitectura:**
```
#file:solution-architect-senior.agent.yaml *design-architecture
```
_Proyecto: E-commerce B2C, 10K users, React + Java + PostgreSQL_

**Paso 2 - Descomponer:**
```
#file:technical-stories-architect.agent.yaml *full-technical-decomposition
```
_Épica: Carrito de compras con DDD + hexagonal_

**Paso 3 - Frontend:**
```
#file:frontend-react-senior.agent.yaml *create-react-component ShoppingCart
```
_Features: Add/remove items, quantity, total, checkout_

**Paso 4 - Backend:**
```
#file:backend-java-senior.agent.yaml *implement-hut Agregar producto al carrito
```

**Paso 5 - Auditoría:**
```
#file:frontend-audit-master.agent.yaml *full-audit
#file:backend-audit-master.agent.yaml *full-audit
```

---

**Framework:** AWC-ZNS-MTD v1.0.0  
**Módulo:** custom-agents v1.0.0  
**Agentes:** 22 disponibles, 191 workflows  
**Última actualización:** 7 de enero de 2026
