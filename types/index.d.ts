/**
 * Type Definitions - AWC ZNS-MTD
 * Definiciones de tipos centralizadas para el proyecto
 */

/**
 * Metadata de un agente
 */
export interface AgentMetadata {
  name: string;
  id: string;
  title: string;
  version: string;
  category: AgentCategory;
  stack: string[];
  author?: string;
  description?: string;
}

/**
 * Categorías de agentes
 */
export type AgentCategory = 
  | 'core'
  | 'development'
  | 'qa_testing'
  | 'product_strategy'
  | 'support_maintenance'
  | 'frontend'
  | 'backend'
  | 'infrastructure'
  | 'architecture'
  | 'quality'
  | 'business'
  | 'ai'
  | 'documentation';

/**
 * Workflow de un agente
 */
export interface Workflow {
  name: string;
  description: string;
  steps: WorkflowStep[];
  deliverables?: string[];
  estimatedTime?: string;
}

/**
 * Paso de un workflow
 */
export interface WorkflowStep {
  id: string;
  name: string;
  action: string;
  inputs?: string[];
  outputs?: string[];
  validations?: string[];
}

/**
 * Definición completa de un agente
 */
export interface Agent {
  metadata: AgentMetadata;
  role: string;
  expertise: string[];
  workflows: Workflow[];
  deliverables: Deliverable[];
  constraints?: string[];
  bestPractices?: string[];
}

/**
 * Deliverable de un agente
 */
export interface Deliverable {
  name: string;
  type: DeliverableType;
  format: string;
  description?: string;
  template?: string;
}

/**
 * Tipos de deliverables
 */
export type DeliverableType = 
  | 'document'
  | 'diagram'
  | 'code'
  | 'report'
  | 'specification'
  | 'test'
  | 'artifact';

/**
 * Configuración del proyecto
 */
export interface ProjectConfig {
  projectName: string;
  version: string;
  responsible: string;
  description?: string;
  initialized: boolean;
  projectType?: ProjectType;
  workflow?: WorkflowType;
  technologies?: Technology[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Tipos de proyecto
 */
export type ProjectType = 
  | 'code-audit'
  | 'greenfield'
  | 'migration'
  | 'maintenance'
  | 'mobile'
  | 'api'
  | 'enterprise';

/**
 * Tipos de workflow
 */
export type WorkflowType = 
  | 'quick'
  | 'standard'
  | 'enterprise'
  | 'comercial-flow'
  | 'inception-flow'
  | 'development-flow'
  | 'qa-flow'
  | 'deployment-flow'
  | 'support-flow';

/**
 * Tecnologías soportadas
 */
export type Technology = 
  | 'java'
  | 'dotnet'
  | 'python'
  | 'php'
  | 'nodejs'
  | 'react'
  | 'angular'
  | 'vue'
  | 'react-native'
  | 'sql'
  | 'nosql';

/**
 * Opciones de comando CLI
 */
export interface CommandOptions {
  force?: boolean;
  verbose?: boolean;
  dir?: string;
  type?: string;
  [key: string]: any;
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Información de versión
 */
export interface VersionInfo {
  current: string;
  latest?: string;
  updateAvailable: boolean;
  releaseNotes?: string;
}

/**
 * Contexto de logging
 */
export interface LogContext {
  command?: string;
  options?: any;
  timestamp: string;
  duration?: number;
  success?: boolean;
  error?: Error;
}

/**
 * Configuración de entorno
 */
export interface EnvironmentConfig {
  nodeVersion: string;
  platform: string;
  arch: string;
  cwd: string;
  env: string;
}
