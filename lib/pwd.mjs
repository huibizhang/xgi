import path from "path";
import { fileURLToPath } from "url";

export const projectPath = process.cwd();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const modulePath = path.resolve(__dirname, "../");
