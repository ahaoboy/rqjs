import { createConsole } from "deno-console"
const Console = createConsole(() => false, () => false)
// @ts-ignore
globalThis.console = new Console(globalThis.__print)
globalThis.Console = Console