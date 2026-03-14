type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

const LEVELS: Record<LogLevel, number> = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

const currentLevel: LogLevel =
  (process.env.LOG_LEVEL?.toUpperCase() as LogLevel) ?? "INFO";

function log(level: LogLevel, message: string, ...args: unknown[]) {
  if (LEVELS[level] < LEVELS[currentLevel]) return;
  const ts = new Date().toISOString();
  const extra = args.length ? " " + args.map((a) => JSON.stringify(a)).join(" ") : "";
  process.stderr.write(`${ts} [gtasks-mcp] [${level}] ${message}${extra}\n`);
}

export const logger = {
  debug: (msg: string, ...args: unknown[]) => log("DEBUG", msg, ...args),
  info: (msg: string, ...args: unknown[]) => log("INFO", msg, ...args),
  warn: (msg: string, ...args: unknown[]) => log("WARN", msg, ...args),
  error: (msg: string, ...args: unknown[]) => log("ERROR", msg, ...args),
};
