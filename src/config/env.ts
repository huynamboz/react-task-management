export const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  
  // App Configuration
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Task Manager',
    environment: import.meta.env.VITE_NODE_ENV || 'development',
  },
  
  // Feature flags
  features: {
    enableDebug: import.meta.env.VITE_NODE_ENV === 'development',
  },
} as const;

// Type-safe environment variables
export type Config = typeof config;
