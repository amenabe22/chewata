import path from "path";
import vue from "@vitejs/plugin-vue";
// import vitePrerender from "vite-plugin-prerender";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vitePrerender({
    //   // Required - The path to the vite-outputted app to prerender.
    //   staticDir: path.join(__dirname, "dist"),
    //   // Required - Routes to render.
    //   routes: ["/", "/privacy"],
    // }),
  ],
  base: "/",
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
});
