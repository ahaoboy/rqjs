use std::{io::Write};

use rquickjs::{
    Value,
};
use rquickjs::{
    Ctx, Function, Result,
};

pub struct ConsoleModule;

pub fn print(s: String) {
    print!("{s}");
    let mut stdout = std::io::stdout();
    stdout.flush().unwrap();
}

pub fn init(ctx: &Ctx<'_>) -> Result<()> {
    let core = include_str!("../../js/00_console.js");
    let global = ctx.globals();
    global
        .set(
            "__print",
            Function::new(ctx.clone(), print)
                .unwrap()
                .with_name("__print")
                .unwrap(),
        )
        .unwrap();
    let _: Value = ctx.eval(core.as_bytes()).unwrap();
    Ok(())
}
