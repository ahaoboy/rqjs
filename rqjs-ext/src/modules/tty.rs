// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
use rquickjs::{
    function::Func,
    module::{Declarations, Exports, ModuleDef},
    Ctx, Object, Result,
};
use std::{env, process::Stdio};

use crate::modules::module::export_default;

fn isatty(i: u32) -> bool {
    let s = match i {
        0 => atty::Stream::Stdin,
        1 => atty::Stream::Stdout,
        2 => atty::Stream::Stderr,
        _ => {
            todo!()
        }
    };
    atty::is(s)
}
pub struct TtyModule;

impl ModuleDef for TtyModule {
    fn declare(declare: &Declarations<'_>) -> Result<()> {
        declare.declare("default")?;
        declare.declare("isatty")?;
        Ok(())
    }

    fn evaluate<'js>(ctx: &Ctx<'js>, exports: &Exports<'js>) -> Result<()> {
        export_default(ctx, exports, |default| {
            default.set("isatty", Func::from(isatty))?;
            Ok(())
        })
    }
}
