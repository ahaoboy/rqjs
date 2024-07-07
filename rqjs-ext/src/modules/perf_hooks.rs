// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
use std::{time::UNIX_EPOCH};

use rquickjs::{
    module::{Declarations, Exports, ModuleDef},
    prelude::Func,
    Ctx, Object, Result,
};

use crate::modules::module::export_default;

fn now() -> u64 {
    std::time::SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis() as u64
}

pub struct PerfHooksModule;

impl ModuleDef for PerfHooksModule {
    fn declare(declare: &Declarations<'_>) -> Result<()> {
        declare.declare("performance")?;
        declare.declare("default")?;
        Ok(())
    }

    fn evaluate<'js>(ctx: &Ctx<'js>, exports: &Exports<'js>) -> Result<()> {
        export_default(ctx, exports, |default| {
            let now_fn = Func::from(now);
            let performance = Object::new(ctx.clone()).unwrap();
            performance.set("now", now_fn).unwrap();
            default.set("performance", performance)?;
            Ok(())
        })
    }
}
