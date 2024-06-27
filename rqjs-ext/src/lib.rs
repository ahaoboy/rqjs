#![allow(clippy::new_without_default)]
#![allow(clippy::inherent_to_string)]
#![cfg_attr(rust_nightly, feature(portable_simd))]

use std::{default, future::Future};

use modules::{
    assert::ASSERT_MODULE, diagnostics_channel::DIAGNOSTICS_CHANNEL_MODULE, inspect::INSPECT_MODULE, node_util::UTIL_MODULE, xml::XmlModule
};
use rquickjs::{
    loader::{BuiltinLoader, BuiltinResolver, ModuleLoader, NativeLoader, ScriptLoader}, AsyncContext, AsyncRuntime, CatchResultExt, Ctx, Result
};

#[macro_use]
mod macros;
mod bytearray_buffer;
// mod bytecode;
// #[cfg(not(feature = "lambda"))]
// pub mod compiler;
// #[cfg(not(feature = "lambda"))]
// mod compiler_common;
// pub mod environment;
pub mod json;
// mod minimal_tracer;
// mod module_builder;
pub mod modules;
pub mod number;
// pub mod runtime_client;
// mod security;
mod stream;
pub mod utils;
pub mod vm;
pub const VERSION: &str = env!("CARGO_PKG_VERSION");
use tokio::sync::oneshot::{self, Receiver};

pub trait CtxExtension<'js> {
    fn spawn_exit<F, R>(&self, future: F) -> Result<Receiver<R>>
    where
        F: Future<Output = Result<R>> + 'js,
        R: 'js;
}

impl<'js> CtxExtension<'js> for Ctx<'js> {
    fn spawn_exit<F, R>(&self, future: F) -> Result<Receiver<R>>
    where
        F: Future<Output = Result<R>> + 'js,
        R: 'js,
    {
        let ctx = self.clone();

        // let type_error_ctor: Constructor = ctx.globals().get(PredefinedAtom::TypeError)?;
        // let type_error: Object = type_error_ctor.construct(())?;
        // let stack: Option<String> = type_error.get(PredefinedAtom::Stack).ok();

        let (join_channel_tx, join_channel_rx) = oneshot::channel();

        self.spawn(async move {
            match future.await.catch(&ctx) {
                Ok(res) => {
                    //result here dosn't matter if receiver has dropped
                    let _ = join_channel_tx.send(res);
                },
                Err(err) => {
                    // if let CaughtError::Exception(err) = err {
                    //     if err.stack().is_none() {
                    //         if let Some(stack) = stack {
                    //             err.set(PredefinedAtom::Stack, stack).unwrap();
                    //         }
                    //     }
                    //     Vm::print_error_and_exit(&ctx, CaughtError::Exception(err));
                    // } else {
                    //     Vm::print_error_and_exit(&ctx, err);
                    // }
                },
            }
        });
        Ok(join_channel_rx)
    }
}

pub async fn install_ext_async(rt: &AsyncRuntime, ctx: &AsyncContext) {
    let resolver = (BuiltinResolver::default()
        .with_module("os")
        .with_module("path")
        .with_module("buffer")
        .with_module("util")
        .with_module("assert")
        .with_module("uuid")
        .with_module("xml")
        .with_module("fs")
        .with_module("inspect")
        .with_module("perf_hooks")
        .with_module("diagnostics_channel")
        .with_module("fs/promises"),);

    let loader = (
        // BuiltinLoader::default().with_module("assert", ASSERT_MODULE),
        BuiltinLoader::default()
            .with_module("inspect", INSPECT_MODULE)
            .with_module("util", UTIL_MODULE)
            .with_module("assert", ASSERT_MODULE)
            .with_module("diagnostics_channel", DIAGNOSTICS_CHANNEL_MODULE),
        ModuleLoader::default()
            .with_module("os", modules::os::OsModule)
            .with_module("path", modules::path::PathModule)
            .with_module("buffer", modules::buffer::BufferModule)
            // .with_module("util", modules::util::UtilModule)
            .with_module("uuid", modules::uuid::UuidModule)
            .with_module("perf_hooks", modules::perf_hooks::PerfHooksModule)
            .with_module("fs", modules::fs::FsModule)
            .with_module("xml", XmlModule)
            .with_module("fs/promises", modules::fs::FsPromisesModule),
    );

    let init_global: Vec<fn(&Ctx<'_>) -> Result<()>> = vec![
        modules::buffer::init,
        modules::exceptions::init,
        modules::encoding::init,
        // modules::console::init,
        modules::console_deno::init,
        modules::timers::init,
    ];
    rt.set_loader(resolver, loader).await;
    ctx.with(|ctx| {
        for i in init_global {
            i(&ctx).unwrap();
        }
    })
    .await;
}
