import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src", // Cấu hình thư mục gốc
    base: "", // Đường dẫn gốc
    build: {
      outDir: "../www", // Đặt thư mục đầu ra là "www"
      target: "esnext", // Đảm bảo code được build cho trình duyệt hỗ trợ ESNext
      rollupOptions: {
        // Các tuỳ chọn Rollup nếu bạn cần
        input: "src/pages/index/index.tsx", // Tệp HTML gốc của ứng dụng
      },
    },
    plugins: [
      reactRefresh(),
      {
        name: "override-config",
        config: () => ({
          build: {
            target: "esnext",
          },
        }),
      },
    ],
    server: {
      port: 3000, // Đặt cổng server phát triển nếu cần
    },
  });
};
