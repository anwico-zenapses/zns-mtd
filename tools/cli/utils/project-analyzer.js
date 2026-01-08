/**
 * Project Analyzer
 * Analiza proyectos para determinar workflow recomendado
 */

const fs = require('fs-extra');
const path = require('path');
const { countFiles, findFiles } = require('./file-utils');

/**
 * Analiza un proyecto y retorna información relevante
 */
async function analyzeProject(projectPath) {
  const analysis = {
    technologies: [],
    languages: [],
    fileCount: 0,
    directoryCount: 0,
    complexity: 'medium',
    size: 'medium',
    hasTests: false,
    hasDocs: false,
    buildTools: []
  };

  try {
    // Detectar tecnologías por archivos de configuración
    analysis.technologies = await detectTechnologies(projectPath);

    // Detectar lenguajes
    analysis.languages = await detectLanguages(projectPath);

    // Contar archivos
    analysis.fileCount = await countFiles(projectPath);

    // Contar directorios
    analysis.directoryCount = await countDirectories(projectPath);

    // Detectar tests
    analysis.hasTests = await hasTestDirectory(projectPath);

    // Detectar documentación
    analysis.hasDocs = await hasDocsDirectory(projectPath);

    // Detectar build tools
    analysis.buildTools = await detectBuildTools(projectPath);

    // Calcular complejidad
    analysis.complexity = calculateComplexity(analysis);

    // Calcular tamaño
    analysis.size = calculateSize(analysis);

  } catch (error) {
    console.error('Error en análisis:', error.message);
  }

  return analysis;
}

/**
 * Detecta tecnologías basándose en archivos de configuración
 */
async function detectTechnologies(projectPath) {
  const technologies = [];

  const techMarkers = {
    'package.json': ['Node.js', 'npm'],
    'yarn.lock': ['Yarn'],
    'pnpm-lock.yaml': ['pnpm'],
    'requirements.txt': ['Python', 'pip'],
    'Pipfile': ['Python', 'Pipenv'],
    'pyproject.toml': ['Python', 'Poetry'],
    'Gemfile': ['Ruby', 'Bundler'],
    'Cargo.toml': ['Rust', 'Cargo'],
    'go.mod': ['Go'],
    'pom.xml': ['Java', 'Maven'],
    'build.gradle': ['Java/Kotlin', 'Gradle'],
    'composer.json': ['PHP', 'Composer'],
    '.csproj': ['C#', '.NET'],
    'Dockerfile': ['Docker'],
    'docker-compose.yml': ['Docker Compose'],
    '.gitignore': ['Git'],
    'tsconfig.json': ['TypeScript'],
    'angular.json': ['Angular'],
    'next.config.js': ['Next.js'],
    'nuxt.config.js': ['Nuxt.js'],
    'vue.config.js': ['Vue.js'],
    'svelte.config.js': ['Svelte'],
    'gatsby-config.js': ['Gatsby'],
    'vite.config.js': ['Vite']
  };

  for (const [file, techs] of Object.entries(techMarkers)) {
    if (await fs.pathExists(path.join(projectPath, file))) {
      technologies.push(...techs);
    }
  }

  return [...new Set(technologies)]; // Eliminar duplicados
}

/**
 * Detecta lenguajes de programación
 */
async function detectLanguages(projectPath) {
  const languages = new Set();

  const languageExtensions = {
    '.js': 'JavaScript',
    '.jsx': 'JavaScript',
    '.ts': 'TypeScript',
    '.tsx': 'TypeScript',
    '.py': 'Python',
    '.java': 'Java',
    '.rb': 'Ruby',
    '.php': 'PHP',
    '.go': 'Go',
    '.rs': 'Rust',
    '.cs': 'C#',
    '.cpp': 'C++',
    '.c': 'C',
    '.swift': 'Swift',
    '.kt': 'Kotlin'
  };

  for (const [ext, lang] of Object.entries(languageExtensions)) {
    const files = await findFiles(projectPath, new RegExp(`\\${ext}$`));
    if (files.length > 0) {
      languages.add(lang);
    }
  }

  return Array.from(languages);
}

/**
 * Cuenta directorios recursivamente
 */
async function countDirectories(dir, depth = 0, maxDepth = 10) {
  let count = 0;

  if (depth > maxDepth || !(await fs.pathExists(dir))) {
    return count;
  }

  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory() && !shouldIgnoreDirectory(item.name)) {
      count++;
      const subPath = path.join(dir, item.name);
      count += await countDirectories(subPath, depth + 1, maxDepth);
    }
  }

  return count;
}

/**
 * Verifica si existe directorio de tests
 */
async function hasTestDirectory(projectPath) {
  const testDirs = ['test', 'tests', '__tests__', 'spec', 'specs'];

  for (const dir of testDirs) {
    if (await fs.pathExists(path.join(projectPath, dir))) {
      return true;
    }
  }

  return false;
}

/**
 * Verifica si existe directorio de documentación
 */
async function hasDocsDirectory(projectPath) {
  const docsDirs = ['docs', 'documentation', 'doc'];

  for (const dir of docsDirs) {
    if (await fs.pathExists(path.join(projectPath, dir))) {
      return true;
    }
  }

  return false;
}

/**
 * Detecta herramientas de build
 */
async function detectBuildTools(projectPath) {
  const buildTools = [];

  const buildMarkers = {
    'webpack.config.js': 'Webpack',
    'rollup.config.js': 'Rollup',
    'gulpfile.js': 'Gulp',
    'Gruntfile.js': 'Grunt',
    'Makefile': 'Make',
    'CMakeLists.txt': 'CMake'
  };

  for (const [file, tool] of Object.entries(buildMarkers)) {
    if (await fs.pathExists(path.join(projectPath, file))) {
      buildTools.push(tool);
    }
  }

  return buildTools;
}

/**
 * Calcula la complejidad del proyecto
 */
function calculateComplexity(analysis) {
  const { fileCount, directoryCount, technologies } = analysis;

  let score = 0;

  // Basado en cantidad de archivos
  if (fileCount > 1000) score += 3;
  else if (fileCount > 500) score += 2;
  else if (fileCount > 100) score += 1;

  // Basado en cantidad de directorios
  if (directoryCount > 100) score += 2;
  else if (directoryCount > 50) score += 1;

  // Basado en cantidad de tecnologías
  if (technologies.length > 10) score += 2;
  else if (technologies.length > 5) score += 1;

  // Determinar nivel de complejidad
  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

/**
 * Calcula el tamaño del proyecto
 */
function calculateSize(analysis) {
  const { fileCount } = analysis;

  if (fileCount > 1000) return 'large';
  if (fileCount > 100) return 'medium';
  return 'small';
}

/**
 * Determina si un directorio debe ignorarse
 */
function shouldIgnoreDirectory(dirName) {
  const ignoreDirs = [
    'node_modules',
    '.git',
    '.awc',
    'dist',
    'build',
    'out',
    'target',
    'vendor',
    '__pycache__',
    '.venv',
    'venv',
    'env'
  ];

  return ignoreDirs.includes(dirName);
}

module.exports = {
  analyzeProject,
  detectTechnologies,
  detectLanguages,
  calculateComplexity,
  calculateSize
};
