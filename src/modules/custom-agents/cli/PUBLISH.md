# 📦 Publicar en NPM

Guía completa para publicar `@awc/agent-cli` en el registro de NPM.

## 📋 Pre-requisitos

1. **Cuenta NPM:**
   - Crear cuenta en https://www.npmjs.com/signup
   - Verificar email

2. **Login NPM:**
   ```powershell
   npm login
   ```
   - Username: tu-usuario
   - Password: tu-password
   - Email: tu-email
   - OTP (si tienes 2FA habilitado)

3. **Verificar login:**
   ```powershell
   npm whoami
   ```

---

## 🚀 Proceso de Publicación

### 1. Verificar que todo funciona

```powershell
# Probar CLI localmente
npm test

# Verificar comandos
awc-agent list
awc-agent load 1
```

### 2. Actualizar versión (si es necesario)

```powershell
# Patch (1.0.0 → 1.0.1) - Bug fixes
npm version patch

# Minor (1.0.0 → 1.1.0) - Nuevas features
npm version minor

# Major (1.0.0 → 2.0.0) - Breaking changes
npm version major
```

### 3. Verificar archivos a publicar

```powershell
# Ver qué archivos se incluirán
npm pack --dry-run
```

Deberías ver:
- ✅ awc-agent.js
- ✅ README.md
- ✅ package.json
- ✅ ../agents/**/*.yaml
- ✅ ../config.yaml

### 4. Publicar (primera vez)

**OPCIÓN A - Paquete público (gratuito):**
```powershell
npm publish --access public
```

**OPCIÓN B - Paquete privado (requiere pago):**
```powershell
npm publish
```

### 5. Verificar publicación

```powershell
# Ver en NPM
https://www.npmjs.com/package/@awc/agent-cli

# Instalar globalmente desde NPM
npm install -g @awc/agent-cli

# Probar
awc-agent list
```

---

## 📊 Versionado Semántico

Seguir [SemVer](https://semver.org/):

| Tipo | Versión | Cuando usar |
|------|---------|-------------|
| **MAJOR** | 1.0.0 → 2.0.0 | Breaking changes (cambios incompatibles) |
| **MINOR** | 1.0.0 → 1.1.0 | Nuevas features (compatible) |
| **PATCH** | 1.0.0 → 1.0.1 | Bug fixes (compatible) |

**Ejemplos:**
- v1.0.0 → v1.0.1: Corregir bug en `awc-agent load`
- v1.0.0 → v1.1.0: Agregar comando `awc-agent search`
- v1.0.0 → v2.0.0: Cambiar estructura de comandos completamente

---

## 🔄 Actualizar Versión Publicada

```powershell
# 1. Hacer cambios en el código
# 2. Actualizar versión
npm version patch  # o minor/major

# 3. Publicar nueva versión
npm publish --access public

# 4. Verificar
npm view @awc/agent-cli versions
```

---

## 🏷️ Tags y Releases

### Crear tag en Git

```powershell
# Después de npm version
git push origin main
git push origin --tags
```

### Publicar versión beta

```powershell
# Actualizar a versión beta
npm version 1.1.0-beta.0

# Publicar con tag beta
npm publish --access public --tag beta

# Usuarios instalan con:
npm install -g @awc/agent-cli@beta
```

### Mover tag latest

```powershell
# Promover beta a latest
npm dist-tag add @awc/agent-cli@1.1.0 latest
```

---

## 📝 Changelog

Mantener `CHANGELOG.md` actualizado:

```markdown
# Changelog

## [1.1.0] - 2026-01-15
### Added
- Comando `awc-agent search` para buscar por tecnología
- Soporte para autocompletado PowerShell

### Fixed
- Bug en carga de agentes con paths largos

## [1.0.0] - 2026-01-07
### Added
- Release inicial
- 22 agentes disponibles
- Comandos: list, load, help
```

---

## 🔒 Seguridad

### Habilitar 2FA en NPM (recomendado)

```powershell
npm profile enable-2fa auth-and-writes
```

### Verificar permisos

```powershell
npm access ls-packages
npm access ls-collaborators @awc/agent-cli
```

---

## 🛠️ Troubleshooting

### Error: "Package name already exists"

Cambiar nombre en `package.json`:
```json
{
  "name": "@tu-usuario/agent-cli"
}
```

### Error: "403 Forbidden"

1. Verificar login: `npm whoami`
2. Re-login: `npm logout && npm login`
3. Verificar scope: `npm access ls-packages`

### Error: "npm ERR! code ENEEDAUTH"

```powershell
npm logout
npm login
```

---

## 📊 Estadísticas de Uso

Ver estadísticas en:
- NPM: https://www.npmjs.com/package/@awc/agent-cli
- Downloads: https://npm-stat.com/charts.html?package=@awc/agent-cli

```powershell
# Ver info del paquete
npm view @awc/agent-cli

# Ver todas las versiones
npm view @awc/agent-cli versions

# Ver descargas (requiere npx)
npx download-stats @awc/agent-cli
```

---

## 🎯 Checklist Pre-publicación

- [ ] ✅ Tests pasan: `npm test`
- [ ] ✅ README.md actualizado
- [ ] ✅ CHANGELOG.md actualizado
- [ ] ✅ Versión incrementada correctamente
- [ ] ✅ package.json completo (author, repository, keywords)
- [ ] ✅ .npmignore configurado
- [ ] ✅ Login NPM activo: `npm whoami`
- [ ] ✅ Nombre de paquete único verificado
- [ ] ✅ License MIT incluida

---

## 🌍 Instalar Globalmente (Usuarios)

Una vez publicado:

```powershell
# Instalar
npm install -g @awc/agent-cli

# Usar
awc-agent list
awc-agent load 3

# Actualizar
npm update -g @awc/agent-cli

# Desinstalar
npm uninstall -g @awc/agent-cli
```

---

## 📚 Recursos

- **NPM Docs:** https://docs.npmjs.com/cli/v10/commands/npm-publish
- **SemVer:** https://semver.org/
- **Package.json:** https://docs.npmjs.com/cli/v10/configuring-npm/package-json
- **NPM Best Practices:** https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry

---

**Framework:** AWC-ZNS-MTD v1.0.0  
**Paquete:** @awc/agent-cli  
**Registro:** https://www.npmjs.com/package/@awc/agent-cli  
**7 de enero de 2026**
