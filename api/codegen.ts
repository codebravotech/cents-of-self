import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/**/*.ts",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/types/__generated__/data/": {
      preset: "client",
      plugins: ["@graphql-codegen/typescript-resolvers"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "../app/src/types/__generated__/data/": {
      preset: "client",
      plugins: ["@graphql-codegen/typescript-resolvers"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
