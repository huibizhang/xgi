import { exec } from "child_process";
import { createServer } from "vite";
import { green, white, cyan, bold, print } from "./utils.mjs";

import express from "express";
import ViteExpress from "vite-express";

const ports = {
  default: 5173,
  xgi: 5700,
};

const defineConfig = (config) => {
  const { dir } = config;
  process.chdir(dir);
  return config;
};

const servers = {
  Nuxt(config) {
    const { port = ports.xgi } = defineConfig(config);

    const url = `http://localhost:${bold(port + "/xgi")}`;

    print(`  ${green("➜")} ${white(bold(" Xgi"))} runs on ${cyan(url)}`);
    exec(`npm run preview --port=${port}`, (err, stdout, stderr) => {
      console.log("ERR", err);
      console.log("stdout", stdout);
      console.log("stderr", stderr);
    });
  },
  XGI(config) {
    const { dir, port = ports.xgi } = defineConfig(config);

    const app = express();
    app.get("/message", (_, res) => res.send("Hello from express!"));

    ViteExpress.config({
      mode: "production",
      inlineViteConfig: {
        root: dir,
        base: "/",
        build: { outDir: "dist" },
      },
    });
    ViteExpress.listen(app, port, () => {
      const url = `http://localhost:${bold(ports.default + "/xgi")}`;
      print(`  ${green("➜")} ${white(bold(" Xgi"))} runs on ${cyan(url)}`);
    });
  },
  ViteDev(config) {
    const { port = ports.default } = defineConfig(config);

    // if (server) {
    //   ViteExpress2.listen(server, 3000);
    // }

    (async () => {
      const server = await createServer({
        configFile: "./vite.config.ts",
        root: ".",
        server: {
          host: "0.0.0.0",
          port: port,
          proxy: {
            "/xgi": {
              target: `http://localhost:${ports.xgi}`,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/xgi/, ""),
            },
          },
        },
      });

      await server.listen(port, false);
      server.printUrls();
    })();
  },
};

export default function (name, config) {
  this.next = function (callback) {
    callback instanceof Function && callback();
  };

  const server = Object.keys(servers).includes(name) && servers[name];
  server && (this.server = server(config));
}
