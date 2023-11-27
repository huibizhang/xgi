#!/usr/bin/env node

import Server from "./createServer.mjs";
import path from "path";

const projectPath = process.cwd();
const modulePath = path.dirname(process.argv[1]);

new Server("Nuxt", { dir: modulePath }).next(() => {
  new Server("ViteDev", { dir: projectPath });
});
