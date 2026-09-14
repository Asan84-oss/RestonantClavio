/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MONETBIL_SERVICE_KEY: string;
  readonly VITE_MONETBIL_SERVICE_SECRET: string;
  readonly VITE_MONETBIL_ENVIRONMENT: 'test' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
