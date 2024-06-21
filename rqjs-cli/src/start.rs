use std::{
    io::{stdout, Write},
    process,
    str::FromStr,
};
#[derive(Parser, Debug, Clone)]
#[command(version, about, long_about = None)]
#[clap(name = "rqjs", version = env!("CARGO_PKG_VERSION"), bin_name = "rqjs")]
pub struct Args {
    #[clap()]
    file: Option<String>,
}

use clap::Parser;
use rquickjs::{
    async_with,
    loader::{BuiltinResolver, ModuleLoader},
    AsyncContext, AsyncRuntime, Ctx, Function, Module, Object, Result, Value,
};

use rqjs_ext::modules;

pub async fn start(args: Args) {
    let Args { file } = args;
    let resolver = (
        BuiltinResolver::default().with_module("os"),
        BuiltinResolver::default().with_module("path"),
        BuiltinResolver::default().with_module("buffer"),
        BuiltinResolver::default().with_module("util"),
        BuiltinResolver::default().with_module("uuid"),
        BuiltinResolver::default().with_module("xml"),
        BuiltinResolver::default().with_module("fs"),
        BuiltinResolver::default().with_module("fs/promises"),
    );

    let loader = (
        ModuleLoader::default().with_module("os", modules::os::OsModule),
        ModuleLoader::default().with_module("path", modules::path::PathModule),
        ModuleLoader::default().with_module("buffer", modules::buffer::BufferModule),
        ModuleLoader::default().with_module("util", modules::util::UtilModule),
        ModuleLoader::default().with_module("uuid", modules::uuid::UuidModule),
        ModuleLoader::default().with_module("xml", modules::xml::XmlModule),
        ModuleLoader::default().with_module("fs", modules::fs::FsModule),
        ModuleLoader::default().with_module("fs/promises", modules::fs::FsPromisesModule),
    );

    let init_global: Vec<fn(&Ctx<'_>) -> Result<()>> = vec![
        modules::buffer::init,
        modules::exceptions::init,
        modules::encoding::init,
        modules::console::init,
    ];
    let rt = AsyncRuntime::new().unwrap();
    rt.set_loader(resolver, loader).await;
    let ctx = AsyncContext::full(&rt).await.unwrap();
    ctx.with(|ctx| {
        for i in init_global {
            i(&ctx).unwrap();
        }
    })
    .await;
    if let Some(path) = file {
        let path = std::path::PathBuf::from_str(&path).unwrap();
        let path = std::path::Path::new(&path);
        let name = path.file_name().expect("filename error");
        let code = std::fs::read_to_string(path).expect("read file error");
        async_with!(ctx => |ctx|  {
            Module::evaluate(ctx.clone(), name.to_string_lossy().to_string(), code)
                .unwrap()
                .finish::<()>()
                .unwrap();
        })
        .await;
        rt.idle().await;
    } else {
        ctrlc::set_handler(move || {
            process::exit(0);
        })
        .expect("Error setting Ctrl-C handler");

        loop {
            stdout().write_all(b"> ").unwrap();
            stdout().flush().unwrap();
            let mut input = String::new();
            std::io::stdin().read_line(&mut input).unwrap();

            ctx.with(|ctx| {
                let r = ctx.eval::<Value, _>(input.as_bytes()).unwrap();
                let g = ctx.globals();
                let console: Object = g.get("console").unwrap();
                let log: Function = console.get("log").unwrap();
                log.call::<(Value<'_>,), ()>((r,)).unwrap();
            })
            .await;
        }
    }
}
