
import { defineConfig } from 'orval';

export default defineConfig({
  crmApi: {
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/crm-api.ts',
      schemas: 'src/api/generated/model',
      client: 'angular',
      mock: true,
    },
    input: {
      target: 'https://localhost:5234/openapi/v1.json',
    },
  },
});