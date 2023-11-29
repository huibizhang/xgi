#!/usr/bin/env node

import Server from "./createServer.mjs";
import { modulePath, projectPath } from "./pwd.mjs";

new Server("XGI", { dir: modulePath }).next(
  new Server("ViteDev", { dir: projectPath })
);
