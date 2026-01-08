/**
 * Tests unitarios para utilidades de validación
 */

const {
  validateProjectName,
  validatePath,
  sanitizePath
} = require('../../../tools/cli/utils/validators');

describe('Validators Utils', () => {
  describe('validateProjectName', () => {
    test('debe aceptar nombres válidos', () => {
      expect(validateProjectName('mi-proyecto')).toBe(true);
      expect(validateProjectName('proyecto_123')).toBe(true);
      expect(validateProjectName('MiProyecto')).toBe(true);
    });

    test('debe rechazar nombres inválidos', () => {
      expect(validateProjectName('')).toBe(false);
      expect(validateProjectName('   ')).toBe(false);
      expect(validateProjectName('proyecto con espacios')).toBe(false);
      expect(validateProjectName('proyecto@especial')).toBe(false);
      expect(validateProjectName('../malicious')).toBe(false);
    });

    test('debe rechazar nombres reservados', () => {
      expect(validateProjectName('node_modules')).toBe(false);
      expect(validateProjectName('package.json')).toBe(false);
    });
  });

  describe('validatePath', () => {
    test('debe validar paths seguros', () => {
      expect(validatePath('./relative/path')).toBe(true);
      expect(validatePath('C:\\Users\\project')).toBe(true);
    });

    test('debe rechazar paths maliciosos', () => {
      expect(validatePath('../../../etc/passwd')).toBe(false);
      expect(validatePath('C:\\Windows\\System32')).toBe(false);
    });
  });

  describe('sanitizePath', () => {
    test('debe normalizar paths', () => {
      const result = sanitizePath('path//to///file');
      expect(result).not.toContain('//');
      expect(sanitizePath('path\\to\\file')).not.toContain('\\\\');
    });

    test('debe eliminar caracteres peligrosos', () => {
      expect(sanitizePath('path/../other')).not.toContain('..');
      expect(sanitizePath('path/./file')).not.toContain('./');
    });
  });
});
