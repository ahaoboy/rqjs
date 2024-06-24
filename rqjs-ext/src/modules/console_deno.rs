use std::env;

use crate::modules::module::export_default;
use once_cell::sync::Lazy;
use rquickjs::{
    atom::PredefinedAtom,
    function::{Constructor, Opt},
    Class, Object, Value,
};
use rquickjs::{
    module::{Declarations, Exports, ModuleDef},
    prelude::Func,
    AsyncContext, Ctx, Function, Result,
};

pub struct ConsoleModule;
fn print(s: String) {
    print!("{s}");
}
pub fn init(ctx: &Ctx<'_>) -> Result<()> {
    let core = include_str!("../../deno-scripts/00_console.js");
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
