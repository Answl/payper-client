import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      globals: true, // Vitest API를 글로벌 스코프에서 사용 가능 (describe, it 등)
      setupFiles: ["./vitest.setup.ts"], // MSW 초기 설정을 위한 파일
    },
  })
);
