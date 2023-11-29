import express from "express";
import ViteExpress from "vite-express";

const port = 5173;

const app = express();
// app.get("/", () => {});
app.get("/xgi/message", (_, res) => res.send("Hello from express!"));

ViteExpress.config({
  mode: "production",
  inlineViteConfig: {
    root: ".",
    base: "/xgi",
    build: { outDir: "dist" },
  },
});
ViteExpress.listen(app, port, () => {
  // const url = `http://localhost:${bold(port + "/xgi")}`;
  // print(`  ${green("➜")} ${white(bold(" Xgi"))} runs on ${cyan(url)}`);

  console.log("It's running");
});
