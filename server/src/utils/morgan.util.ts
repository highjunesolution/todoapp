import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";
import { getStream } from "file-stream-rotator";

const __dirname = import.meta.dirname;
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

morgan.token("server-time", () =>
  String(new Date().toLocaleString("sv-SE", { timeZone: "Asia/Bangkok" })),
);

morgan.format(
  "custom",
  ":server-time :remote-addr :method :url :status :response-time ms",
);

morgan.format(
    "custom-json",
    JSON.stringify({
        reqTime: ":server-time",
        ip: ":remote-addr",
        method: ":method",
        url: ":url",
        status: ":status",
        resTime: ":response-time ms"
    })
)

const accessLogStream = getStream({
  filename: path.join(logDir, "%DATE%-access"),
  extension: ".jsonl",
  frequency: "monthly",
  date_format: "YYYY_MM",
  size: "10mb",
  max_logs: "2m",
  audit_file: path.join(logDir, ".accecc-audit.json"),
});

const morganLogger = morgan("custom-json", { stream: accessLogStream });
const morganConsole = morgan("custom");

export { morganConsole, morganLogger };
