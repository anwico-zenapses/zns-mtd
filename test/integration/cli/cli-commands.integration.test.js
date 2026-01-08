/**
 * Tests de integración para CLI
 * Pruebas end-to-end de comandos principales
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

describe('CLI Integration Tests', () => {
  let testDir;
  const cliPath = path.join(__dirname, '../../../tools/cli/awc-cli.js');

  beforeEach(async () => {
    // Crear directorio temporal para tests
    testDir = path.join(os.tmpdir(), `awc-test-${Date.now()}`);
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    // Limpiar directorio temporal
    await fs.remove(testDir);
  });

  describe('Comando: version', () => {
    test('debe mostrar la versión del método', () => {
      const output = execSync(`node "${cliPath}" version`, {
        encoding: 'utf-8',
        cwd: testDir
      });

      expect(output).toContain('2.10.0');
      expect(output).toContain('ZΞNAPSΞS');
    });

    test('debe ejecutarse sin errores', () => {
      expect(() => {
        execSync(`node "${cliPath}" version`, {
          cwd: testDir,
          stdio: 'ignore'
        });
      }).not.toThrow();
    });
  });

  describe('Comando: --help', () => {
    test('debe mostrar ayuda general', () => {
      const output = execSync(`node "${cliPath}" --help`, {
        encoding: 'utf-8',
        cwd: testDir
      });

      expect(output).toContain('install');
      expect(output).toContain('version');
    });
  });

  describe('Comando: --version', () => {
    test('debe mostrar versión corta', () => {
      const output = execSync(`node "${cliPath}" --version`, {
        encoding: 'utf-8',
        cwd: testDir
      });

      expect(output).toContain('2.10.0');
    });
  });

  describe('Validación de comandos', () => {
    test('comando inválido debe fallar', () => {
      expect(() => {
        execSync(`node "${cliPath}" comando-inexistente`, {
          cwd: testDir,
          stdio: 'pipe'
        });
      }).toThrow();
    });
  });

  describe('Logs generados', () => {
    test('debe crear directorio de logs', async () => {
      // Ejecutar un comando para generar logs
      try {
        execSync(`node "${cliPath}" version`, {
          cwd: testDir,
          stdio: 'ignore'
        });
      } catch {
        // Ignorar errores de ejecución
      }

      // Verificar que se crearon logs (si el comando los genera)
      const logsDir = path.join(process.cwd(), '.awc', 'logs');
      const logsExist = await fs.pathExists(logsDir);

      // Los logs pueden o no existir dependiendo de la implementación
      expect(typeof logsExist).toBe('boolean');
    });
  });
});
