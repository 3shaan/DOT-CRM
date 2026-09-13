
import { defineConfig } from 'orval';

export default defineConfig({
  crmApi: {
    output: {
      mode: 'tags-split',
      target: 'src/api/generated/crm-api.ts',
      schemas: 'src/api/generated/model',
      client: 'angular',
      override:{
        angular:{
         retrievalClient:"both"
        }
      }
    },
    input: {
      target: 'src/api/openapi/openapi.json',
    },
  },
});