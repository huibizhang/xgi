import { exec } from "child_process";
import { createServer } from "vite";
import { green, white, cyan, bold, print } from "./utils.mjs";

const defaultPort = 5173;

const defineConfig = (config) => {
  const { dir } = config;
  process.chdir(dir);
  return config;
};

const servers = {
  Nuxt(config) {
    const { port = defaultPort } = defineConfig(config);

    const url = `http://localhost:${bold(port + "/xgi")}`;

    print(`  ${green("➜")} ${white(bold(" Xgi"))} runs on ${cyan(url)}`);
    exec(`npm run preview --port=${port}`, (err, stdout, stderr) => {
      console.log("ERR", err);
      console.log("stdout", stdout);
      console.log("stderr", stderr);
    });
  },
  ViteDev(config) {
    const { port = defaultPort } = defineConfig(config);

    (async () => {
      const server = await createServer({
        configFile: "./vite.config.js",
        root: ".",
        server: {
          port: port,
          proxy: {
            "/xgi": {
              target: "http://localhost:3000",
              changeOrigin: false,
              rewrite: (path) => path.replace(/^\/xgi/, ""),
            },
          },
        },
      });

      await server.listen();
      server.printUrls();
    })();
  },
};

export default function (name, config) {
  this.next = function (callback) {
    callback instanceof Function && callback();
  };

  const server = Object.keys(servers).includes(name) && servers[name];
  server && server(config);
}
