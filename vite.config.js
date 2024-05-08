import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

const root = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: root }],
  },
});
