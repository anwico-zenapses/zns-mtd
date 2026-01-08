/**
 * Tests unitarios para file-utils
 */

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const {
  loadConfig,
  updateConfig,
  createConfigFile,
  readYamlFile,
  writeYamlFile,
  isDirectoryEmpty
} = require('../../../tools/cli/utils/file-utils');

// Mock de fs-extra
jest.mock('fs-extra');

describe('File Utils', () => {
  const testDir = '/test/project/.awc';
  const configJsonPath = path.join(testDir, 'config.json');
  const configYamlPath = path.join(testDir, 'config.yaml');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadConfig', () => {
    test('debe cargar configuración JSON cuando existe', async () => {
      const mockConfig = {
        projectName: 'test-project',
        version: '1.0.0',
        initialized: true
      };

      fs.pathExists.mockImplementation((filePath) => {
        return Promise.resolve(filePath === configJsonPath);
      });
      fs.readJson.mockResolvedValue(mockConfig);

      const config = await loadConfig(testDir);

      expect(fs.pathExists).toHaveBeenCalledWith(configJsonPath);
      expect(fs.readJson).toHaveBeenCalledWith(configJsonPath);
      expect(config).toHaveProperty('projectName', 'test-project');
    });

    test('debe cargar configuración YAML cuando JSON no existe', async () => {
      const mockConfig = {
        projectName: 'test-project',
        version: '1.0.0'
      };

      fs.pathExists.mockImplementation((filePath) => {
        if (filePath === configJsonPath) {
          return Promise.resolve(false);
        }
        if (filePath === configYamlPath) {
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      });
      fs.readFile.mockResolvedValue(yaml.dump(mockConfig));

      const config = await loadConfig(testDir);

      expect(fs.pathExists).toHaveBeenCalledWith(configJsonPath);
      expect(fs.pathExists).toHaveBeenCalledWith(configYamlPath);
      expect(config).toHaveProperty('projectName', 'test-project');
    });

    test('debe retornar null si no existe archivo', async () => {
      fs.pathExists.mockResolvedValue(false);

      const config = await loadConfig(testDir);

      expect(config).toBeNull();
    });
  });

  describe('updateConfig', () => {
    test('debe actualizar configuración existente en JSON', async () => {
      const newConfig = {
        projectName: 'updated-project',
        version: '2.0.0'
      };

      fs.writeJson.mockResolvedValue();

      await updateConfig(testDir, newConfig);

      expect(fs.writeJson).toHaveBeenCalledWith(configJsonPath, newConfig, { spaces: 2 });
    });
  });

  describe('createConfigFile', () => {
    test('debe crear archivo YAML correctamente', async () => {
      const config = {
        projectName: 'new-project',
        version: '1.0.0'
      };

      fs.writeFile.mockResolvedValue();

      await createConfigFile(testDir, config);

      expect(fs.writeFile).toHaveBeenCalledWith(
        configYamlPath,
        expect.stringContaining('projectName:'),
        'utf8'
      );
    });
  });

  describe('readYamlFile', () => {
    test('debe leer archivo YAML correctamente', async () => {
      const mockData = { key: 'value', nested: { prop: 123 } };
      fs.readFile.mockResolvedValue(yaml.dump(mockData));

      const result = await readYamlFile('/test/file.yaml');

      expect(result).toEqual(mockData);
    });

    test('debe retornar null en caso de error', async () => {
      fs.readFile.mockRejectedValue(new Error('File not found'));

      const result = await readYamlFile('/test/missing.yaml');

      expect(result).toBeNull();
    });
  });

  describe('writeYamlFile', () => {
    test('debe escribir archivo YAML correctamente', async () => {
      const data = { name: 'test', value: 42 };
      fs.writeFile.mockResolvedValue();

      await writeYamlFile('/test/output.yaml', data);

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/test/output.yaml',
        expect.stringContaining('name: test'),
        'utf8'
      );
    });
  });

  describe('isDirectoryEmpty', () => {
    test('debe retornar true si directorio está vacío', async () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readdir.mockResolvedValue([]);

      const result = await isDirectoryEmpty(testDir);

      expect(result).toBe(true);
    });

    test('debe retornar false si directorio tiene archivos', async () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readdir.mockResolvedValue(['file1.txt', 'file2.txt']);

      const result = await isDirectoryEmpty(testDir);

      expect(result).toBe(false);
    });

    test('debe retornar true si directorio no existe', async () => {
      fs.pathExists.mockResolvedValue(false);

      const result = await isDirectoryEmpty('/nonexistent');

      expect(result).toBe(true);
    });
  });
});
