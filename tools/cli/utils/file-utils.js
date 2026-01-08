/**
 * File Utilities
 * Utilidades para manejo de archivos y directorios
 */

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Copia agentes desde src hacia destino
 */
async function copyAgents(srcPath, destPath) {
  await fs.ensureDir(destPath);
  await fs.copy(srcPath, destPath, {
    overwrite: true,
    filter: (src) => {
      return src.endsWith('.yaml') || fs.statSync(src).isDirectory();
    }
  });
}

/**
 * Copia workflows desde src hacia destino
 */
async function copyWorkflows(srcPath, destPath) {
  await fs.ensureDir(destPath);
  await fs.copy(srcPath, destPath, {
    overwrite: true
  });
}

/**
 * Crea archivo de configuración en formato YAML
 */
async function createConfigFile(awcDir, config) {
  const configPath = path.join(awcDir, 'config.yaml');
  const yamlContent = yaml.dump(config, {
    indent: 2,
    lineWidth: 80,
    noRefs: true
  });
  await fs.writeFile(configPath, yamlContent, 'utf8');
}

/**
 * Carga configuración desde archivo JSON o YAML
 */
async function loadConfig(awcDir) {
  // Intentar primero JSON (usado por awc new)
  const configJsonPath = path.join(awcDir, 'config.json');
  if (await fs.pathExists(configJsonPath)) {
    try {
      return await fs.readJson(configJsonPath);
    } catch (error) {
      console.error('Error al cargar config.json:', error.message);
    }
  }

  // Fallback a YAML (compatibilidad)
  const configYamlPath = path.join(awcDir, 'config.yaml');
  if (await fs.pathExists(configYamlPath)) {
    try {
      const content = await fs.readFile(configYamlPath, 'utf8');
      return yaml.load(content);
    } catch (error) {
      console.error('Error al cargar config.yaml:', error.message);
    }
  }

  return null;
}

/**
 * Actualiza configuración existente (JSON)
 */
async function updateConfig(awcDir, newConfig) {
  const configPath = path.join(awcDir, 'config.json');
  await fs.writeJson(configPath, newConfig, { spaces: 2 });
}

/**
 * Lee un archivo YAML
 */
async function readYamlFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return yaml.load(content);
  } catch (error) {
    console.error(`Error al leer ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Escribe un archivo YAML
 */
async function writeYamlFile(filePath, data) {
  const yamlContent = yaml.dump(data, {
    indent: 2,
    lineWidth: 80,
    noRefs: true
  });
  await fs.writeFile(filePath, yamlContent, 'utf8');
}

/**
 * Busca archivos recursivamente con un patrón
 */
async function findFiles(dir, pattern) {
  const results = [];

  if (!(await fs.pathExists(dir))) {
    return results;
  }

  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      const subResults = await findFiles(fullPath, pattern);
      results.push(...subResults);
    } else if (item.isFile() && item.name.match(pattern)) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Cuenta archivos en un directorio recursivamente
 */
async function countFiles(dir, extensions = []) {
  let count = 0;

  if (!(await fs.pathExists(dir))) {
    return count;
  }

  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      count += await countFiles(fullPath, extensions);
    } else if (item.isFile()) {
      if (extensions.length === 0) {
        count++;
      } else {
        const ext = path.extname(item.name);
        if (extensions.includes(ext)) {
          count++;
        }
      }
    }
  }

  return count;
}

/**
 * Verifica si un directorio está vacío
 */
async function isDirectoryEmpty(dir) {
  if (!(await fs.pathExists(dir))) {
    return true;
  }

  const items = await fs.readdir(dir);
  return items.length === 0;
}

module.exports = {
  copyAgents,
  copyWorkflows,
  createConfigFile,
  loadConfig,
  updateConfig,
  readYamlFile,
  writeYamlFile,
  findFiles,
  countFiles,
  isDirectoryEmpty
};
