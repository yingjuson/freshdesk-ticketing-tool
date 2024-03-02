import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    build: {
        sourcemap: true,
        rollupOptions: {
            onwarn(warning, defaultHandler) {
                if (warning.code === "SOURCEMAP_ERROR") {
                    return;
                }

                defaultHandler(warning);
            },
        },
    },
});
