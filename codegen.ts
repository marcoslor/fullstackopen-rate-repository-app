import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/!(*.generated).{ts,tsx}'],
  generates: {
    './src/gql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        withHooks: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
