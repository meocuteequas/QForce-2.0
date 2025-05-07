/**
 * Application route definitions
 * 
 * Use these constants in place of hardcoded route strings throughout the application
 * to improve maintainability and avoid typos
 */

export const ROUTES = {
  // Base routes
  HOME: '/',
  LOGIN: '/login',
  
  // Authenticated routes
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  
  // Project routes
  PROJECTS: '/projects',
  PROJECT: (key: string) => `/projects/${key}`,
  
  // Team routes
  TEAMS: '/teams',
  TEAM: (key: string) => `/teams/${key}`,
} as const;

/**
 * Route pattern constants for use in path matching
 */
export const ROUTE_PATTERNS = {
  PROJECT_PAGE: '/project/',
  TEAM_PAGE: '/teams/',
} as const;

/**
 * Type for route keys to provide autocomplete when accessing routes
 */
export type RouteKey = keyof typeof ROUTES;