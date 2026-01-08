# Sistema de Versiones AWC ZNS-MTD

## Descripción

Sistema integral de gestión de versiones para el método AWC ZNS-MTD, basado en [Semantic Versioning 2.0.0](https://semver.org/lang/es/).

## Componentes

### 1. Version Manager (`version-manager.js`)

Gestor central de versiones del sistema.

**Funcionalidades:**
- Obtener versión actual
- Comparar versiones
- Verificar compatibilidad
- Incrementar versiones
- Validar formatos de versión

**Uso:**
```javascript
const versionManager = require('./version-manager');

// Obtener versión actual
const version = versionManager.getCurrentVersion();

// Comparar versiones
const comparison = versionManager.compareVersions('1.0.0', '1.1.0');

// Verificar compatibilidad
const compatible = versionManager.isCompatible('^1.0.0');

// Incrementar versión
const newVersion = versionManager.incrementVersion('minor');
```

### 2. Update Checker (`update-checker.js`)

Verificador de actualizaciones disponibles.

**Funcionalidades:**
- Verificar actualizaciones en registro npm
- Determinar severidad de actualizaciones
- Generar mensajes de actualización
- Verificar compatibilidad de actualizaciones
- Detectar versiones deprecadas

**Uso:**
```javascript
const updateChecker = require('./update-checker');

// Verificar actualizaciones
const update = await updateChecker.checkForUpdates();

if (update.hasUpdate) {
  console.log(`Nueva versión: ${update.latestVersion}`);
  console.log(`Severidad: ${update.severity}`);
}
```

### 3. Changelog Manager (`changelog-manager.js`)

Gestor de changelog automático.

**Funcionalidades:**
- Leer y parsear CHANGELOG.md
- Obtener notas de versiones específicas
- Agregar nuevas versiones
- Detectar breaking changes
- Generar resúmenes de cambios

**Uso:**
```javascript
const changelogManager = require('./changelog-manager');

// Obtener última versión
const latest = await changelogManager.getLatestRelease();

// Agregar nueva versión
await changelogManager.addVersion('1.1.0', '2026-01-07', {
  added: ['Nueva funcionalidad X'],
  fixed: ['Bug en componente Y']
});
```

### 4. Version Bump Script (`version-bump.js`)

Script CLI para incrementar versiones.

**Uso:**
```bash
# Incrementar versión patch (1.0.0 → 1.0.1)
node tools/version/version-bump.js patch

# Incrementar versión minor (1.0.1 → 1.1.0)
node tools/version/version-bump.js minor

# Incrementar versión major (1.1.0 → 2.0.0)
node tools/version/version-bump.js major

# Con mensaje personalizado
node tools/version/version-bump.js minor --message "Nueva funcionalidad de análisis"
```

## Semantic Versioning

Formato: `MAJOR.MINOR.PATCH`

- **MAJOR**: Cambios incompatibles en la API (breaking changes)
- **MINOR**: Nuevas funcionalidades compatibles con versiones anteriores
- **PATCH**: Correcciones de bugs compatibles

### Cuándo incrementar cada versión:

**MAJOR (1.0.0 → 2.0.0)**
- Cambios en la estructura de agentes que requieren migración
- Modificaciones en formato de workflows
- Cambios en CLI que rompen scripts existentes
- Eliminación de funcionalidades

**MINOR (1.0.0 → 1.1.0)**
- Nuevos agentes
- Nuevos workflows
- Nuevos comandos CLI
- Nuevas funcionalidades sin breaking changes

**PATCH (1.0.0 → 1.0.1)**
- Corrección de bugs
- Mejoras de rendimiento
- Correcciones de documentación
- Refactorizaciones internas

## Flujo de Trabajo de Versionado

### 1. Durante el Desarrollo

```bash
# Trabajar en rama feature/nueva-funcionalidad
git checkout -b feature/nueva-funcionalidad

# Hacer commits descriptivos
git commit -m "feat: agregar nuevo agente DevOps"
git commit -m "fix: corregir validación en workflow"
```

### 2. Preparar Release

```bash
# Ejecutar script de bump
node tools/version/version-bump.js minor --message "Nuevo agente DevOps"

# Revisar cambios generados
git diff package.json CHANGELOG.md

# Commit de versión
git add .
git commit -m "chore: bump version to 1.1.0"
```

### 3. Publicar Release

```bash
# Crear tag
git tag -a v1.1.0 -m "Release v1.1.0"

# Push con tags
git push origin main
git push origin v1.1.0

# Publicar en npm (si aplica)
npm publish
```

## Integración con CLI

El sistema de versiones está integrado en los comandos CLI:

```bash
# Ver versión actual y verificar actualizaciones
awc version

# Durante instalación, verifica versión compatible
awc install
```

## Formato de CHANGELOG.md

```markdown
# Changelog

## [Unreleased]
### Añadido
- Funcionalidad en desarrollo

## [1.1.0] - 2026-01-07
### Añadido
- Nuevo agente DevOps
- Comandos de infraestructura

### Corregido
- Bug en validación de workflow

## [1.0.0] - 2026-01-07
### Añadido
- Lanzamiento inicial
```

## Tipos de Cambios

- **Añadido**: Nuevas funcionalidades
- **Cambiado**: Cambios en funcionalidades existentes
- **Obsoleto**: Funcionalidades deprecadas
- **Eliminado**: Funcionalidades removidas
- **Corregido**: Corrección de bugs
- **Seguridad**: Parches de seguridad

## Verificación de Actualizaciones

El sistema verifica automáticamente actualizaciones cada 24 horas y muestra mensajes según severidad:

- 🚨 **CRÍTICA**: Breaking changes (major)
- ⚡ **IMPORTANTE**: Nuevas funcionalidades (minor)
- 💡 **BAJA**: Correcciones de bugs (patch)

## Compatibilidad

El sistema garantiza compatibilidad dentro del mismo MAJOR version:

- Versión `1.x.x` es compatible con `1.y.z`
- Versión `2.x.x` puede tener breaking changes respecto a `1.x.x`

## Requerimientos de Sistema

Especificados en `package.json`:

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

## Scripts de Mantenimiento

Agregados a `package.json`:

```json
{
  "scripts": {
    "version:bump:major": "node tools/version/version-bump.js major",
    "version:bump:minor": "node tools/version/version-bump.js minor",
    "version:bump:patch": "node tools/version/version-bump.js patch",
    "version:check": "awc version"
  }
}
```

## Mejores Prácticas

1. **Siempre actualizar CHANGELOG.md** con cada cambio significativo
2. **Usar commits convencionales** (feat:, fix:, chore:, etc.)
3. **Verificar compatibilidad** antes de incrementar major version
4. **Documentar breaking changes** claramente en CHANGELOG
5. **Mantener versiones en sync** entre package.json y sistema
6. **Probar actualizaciones** en entorno de desarrollo primero
7. **Comunicar cambios** al equipo antes de releases major

## Soporte

Para más información sobre versionado semántico: https://semver.org/lang/es/
