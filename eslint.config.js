/**
 * ESLint Configuration (v9+)
 * Configuración de linting para AWC ZNS-MTD
 */

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  // Ignorar directorios
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'build/**', '*.min.js', '.awc/**']
  },

  // Configuración base
  js.configs.recommended,

  // Archivos JavaScript
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      // Errores
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-throw-literal': 'error',
      'no-return-await': 'error',

      // Warnings
      'prefer-const': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',

      // Style
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2, { SwitchCase: 1 }],

      // Mejores prácticas
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-with': 'error',
      'no-new-func': 'error'
    }
  },

  // Archivos de test
  {
    files: ['test/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      'no-unused-expressions': 'off'
    }
  }
];
