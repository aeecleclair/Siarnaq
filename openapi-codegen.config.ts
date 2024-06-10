import { defineConfig } from "@openapi-codegen/cli";
import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";

export default defineConfig({
  hyperion: {
    from: {
      source: "url",
      url: `http://127.0.0.1:8000/openapi.json`,
    },
    outputDir: "src/api",
    to: async (context) => {
      const filenamePrefix = "hyperion";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
