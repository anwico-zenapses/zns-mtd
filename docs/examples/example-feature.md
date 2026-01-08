# Ejemplo: Agregar Feature de Autenticación

## Contexto
Proyecto web que necesita autenticación JWT.

## Paso 1: Inicio con ZEN MASTER

```
Usuario: "necesito agregar autenticación JWT al proyecto"

ZEN MASTER:
✓ Detectado: Feature nueva (complejidad media)
✓ Workflow recomendado: Standard Flow
✓ Iniciando análisis...
```

## Paso 2: Análisis (ARCHITECT SENIOR)

```
ARCHITECT:
📋 Requerimientos identificados:
- Login endpoint (POST /auth/login)
- Token JWT generation
- Middleware de autenticación
- Refresh token strategy
- User model + database

🎯 Stack tecnológico:
- jsonwebtoken v9.0.0
- bcrypt para passwords
- Express middleware
```

## Paso 3: Diseño

**ADR-001**: Uso de JWT para autenticación

**Diagrama C4:**
```
[Frontend] --> [Auth Controller] --> [Auth Service]
                                   --> [User Repository]
```

## Paso 4: Implementación (DEVELOPER PRO)

**Test First (TDD):**
```javascript
// auth.service.test.js
describe('AuthService', () => {
  it('should generate valid JWT token', async () => {
    const token = await authService.login(user);
    expect(token).toBeDefined();
    expect(jwt.verify(token, SECRET)).toBeTruthy();
  });
});
```

**Implementación:**
```javascript
// auth.service.js
class AuthService {
  async login(email, password) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedError();
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedError();
    
    return jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
  }
}
```

## Paso 5: Validación (QA SPECIALIST)

```
QA:
✓ Tests unitarios: 12/12 passed
✓ Cobertura: 94%
✓ Tests integración: 5/5 passed
✓ Security scan: 0 vulnerabilidades
✓ Performance: < 100ms response time

📊 Reporte de calidad: APROBADO
```

## Resultado

- ✅ Feature completada en 25 minutos
- ✅ 17 tests (100% passed)
- ✅ Cobertura 94%
- ✅ Documentación completa
- ✅ ADR documentado
- ✅ Sin deuda técnica
