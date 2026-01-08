/**
 * Tests unitarios para ConfigManager
 */

const ConfigManager = require('../../../tools/config/config-manager');

describe('ConfigManager', () => {
  describe('Constantes de directorio', () => {
    test('debe retornar directorios correctos', () => {
      expect(ConfigManager.AWC_DIR).toBe('.awc');
      expect(ConfigManager.AGENTS_DIR).toContain('agents');
      expect(ConfigManager.WORKFLOWS_DIR).toContain('workflows');
      expect(ConfigManager.TEMPLATES_DIR).toContain('templates');
    });
  });

  describe('Agentes Core', () => {
    test('debe tener 4 agentes core', () => {
      expect(ConfigManager.CORE_AGENTS).toHaveLength(4);
      expect(ConfigManager.CORE_AGENTS).toContain('zen-master');
      expect(ConfigManager.CORE_AGENTS).toContain('architect-senior');
    });
  });

  describe('Tipos de proyecto', () => {
    test('debe incluir todos los tipos soportados', () => {
      expect(ConfigManager.PROJECT_TYPES).toContain('greenfield');
      expect(ConfigManager.PROJECT_TYPES).toContain('migration');
      expect(ConfigManager.PROJECT_TYPES).toContain('code-audit');
      expect(ConfigManager.PROJECT_TYPES).toContain('enterprise');
    });
  });

  describe('Tecnologías soportadas', () => {
    test('debe incluir tecnologías principales', () => {
      const techs = ConfigManager.SUPPORTED_TECHNOLOGIES;
      expect(techs).toContain('java');
      expect(techs).toContain('dotnet');
      expect(techs).toContain('python');
      expect(techs).toContain('react');
      expect(techs).toContain('nodejs');
    });
  });

  describe('getProjectPath', () => {
    test('debe construir path correcto', () => {
      const cwd = '/home/user/project';
      const path = ConfigManager.getProjectPath(cwd, 'agents');

      expect(path).toContain('.awc');
      expect(path).toContain('agents');
    });

    test('debe manejar path vacío', () => {
      const cwd = '/home/user/project';
      const path = ConfigManager.getProjectPath(cwd);

      expect(path).toContain('.awc');
      expect(path).not.toContain('undefined');
    });
  });

  describe('getAgentsPath', () => {
    test('debe retornar path a agentes', () => {
      const cwd = '/project';
      const path = ConfigManager.getAgentsPath(cwd);

      expect(path).toContain('.awc');
      expect(path).toContain('agents');
    });
  });

  describe('validateConfig', () => {
    test('debe validar configuración correcta', () => {
      const config = {
        projectName: 'test-project',
        version: '1.0.0',
        workflow: 'standard'
      };

      const result = ConfigManager.validateConfig(config);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('debe rechazar config sin projectName', () => {
      const config = {
        version: '1.0.0'
      };

      const result = ConfigManager.validateConfig(config);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('projectName es requerido');
    });

    test('debe rechazar config sin version', () => {
      const config = {
        projectName: 'test'
      };

      const result = ConfigManager.validateConfig(config);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('version es requerida');
    });

    test('debe rechazar workflow inválido', () => {
      const config = {
        projectName: 'test',
        version: '1.0.0',
        workflow: 'invalid-workflow'
      };

      const result = ConfigManager.validateConfig(config);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Configuración de entorno', () => {
    test('debe obtener info del entorno', () => {
      const env = ConfigManager.getEnvironmentConfig();

      expect(env).toHaveProperty('nodeVersion');
      expect(env).toHaveProperty('platform');
      expect(env).toHaveProperty('arch');
      expect(env).toHaveProperty('cwd');
      expect(env).toHaveProperty('env');
    });
  });

  describe('Límites y validaciones', () => {
    test('debe tener límites definidos', () => {
      expect(ConfigManager.MAX_PROJECT_NAME_LENGTH).toBe(50);
      expect(ConfigManager.MIN_PROJECT_NAME_LENGTH).toBe(3);
    });

    test('debe tener nombres reservados', () => {
      expect(ConfigManager.RESERVED_NAMES).toContain('node_modules');
      expect(ConfigManager.RESERVED_NAMES).toContain('.git');
      expect(ConfigManager.RESERVED_NAMES).toContain('package.json');
    });
  });
});
