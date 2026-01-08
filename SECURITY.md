# AWC ZNS-MTD Security Policy

## Versiones Soportadas

| Versión | Soportado          |
| ------- | ------------------ |
| 2.9.x   | :white_check_mark: |
| 2.8.x   | :x:                |
| < 2.8   | :x:                |

## Reportar Vulnerabilidades

Si descubres una vulnerabilidad de seguridad en AWC ZNS-MTD, por favor:

1. **NO** abras un issue público
2. Envía un correo a: security@awc-team.com
3. Incluye:
   - Descripción detallada de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Versión afectada

## Proceso de Respuesta

1. Confirmación de recepción: 48 horas
2. Evaluación inicial: 1 semana
3. Fix y testing: 2-4 semanas
4. Release de parche: Según severidad

## Mejores Prácticas

### Para Usuarios

- Mantén siempre la última versión
- Ejecuta `npm audit` regularmente
- No expongas credenciales en archivos de configuración
- Usa variables de entorno para datos sensibles

### Para Contribuidores

- Nunca commitees secrets, tokens, o credenciales
- Valida todos los inputs del usuario
- Sanitiza paths antes de operaciones de filesystem
- Implementa rate limiting donde sea apropiado

## Dependencias de Seguridad

Monitoreamos activamente:

- GitHub Security Advisories
- NPM Security Advisories
- OWASP Top 10

## Auditorías

- Auditoría de código: Trimestral
- Auditoría de dependencias: Mensual
- Penetration testing: Anual
