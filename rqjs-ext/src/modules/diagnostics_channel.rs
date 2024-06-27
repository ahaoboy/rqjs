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

pub const DIAGNOSTICS_CHANNEL_MODULE: &str =
    include_str!("../../js/05_diagnostics_channel.js");
