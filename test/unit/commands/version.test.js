/**
 * Tests unitarios para el comando 'version'
 */

const { versionCommand } = require('../../../tools/cli/commands/version');
const { getVersion } = require('../../../tools/cli/utils/version');

// Mock de dependencias
jest.mock('../../../tools/cli/utils/version');
jest.mock('../../../tools/cli/utils/console-logger', () => ({
  displayLogo: jest.fn()
}));

describe('Command: version', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe mostrar la versión actual del método', async () => {
    // Arrange
    getVersion.mockReturnValue('2.9.0');

    // Act
    await versionCommand();

    // Assert
    expect(getVersion).toHaveBeenCalled();
  });

  test('debe manejar errores al obtener la versión', async () => {
    // Arrange
    getVersion.mockImplementation(() => {
      throw new Error('No se pudo leer package.json');
    });

    // Act & Assert
    await expect(versionCommand()).rejects.toThrow();
  });
});
