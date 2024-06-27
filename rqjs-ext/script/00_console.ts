import { Console } from "@deno-ext/console"
// @ts-ignore
globalThis.console = new Console(globalThis.__print)
// @ts-ignore
globalThis.Console = Console
