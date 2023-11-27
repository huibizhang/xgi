#!/usr/bin/env node

import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import colors from "picocolors";

const projectPath = process.cwd();
const modulePath = path.dirname(process.argv[1]);

const print = (msg) => {
  return [
    colors.yellow("====================================================="),
    msg,
    colors.yellow("====================================================="),
    "\n",
  ].join("\n");
};

function createNuxt(dir, port = 5173) {
  process.chdir(dir);

  this.next = function (callback) {
    callback();
  };

  console.info(
    print(
      `  ${colors.green("➜")} ${colors.white(
        " Xgi"
      )} is running on ${colors.cyan(`http://localhost:${port}/xgi`)}`
    )
  );
  exec(`npm run preview --port=${port}`, (err, stdout, stderr) => {
    console.log("ERR", err);
    console.log("stdout", stdout);
    console.log("stderr", stderr);
  });
}

function createViteDev(dir) {
  this.next = function (callback = () => {}) {
    callback();
  };

  process.chdir(dir);

  (async () => {
    const server = await createServer({
      // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
      configFile: "./vite.config.js",
      root: ".",
      // root: __dirname,
      // server: {
      //   port: 1337,
      // },
      server: {
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
    // server.bindCLIShortcuts({ print: true });
  })();
}

new createNuxt(modulePath).next(() => {
  new createViteDev(projectPath);
});
