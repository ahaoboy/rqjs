use colored::*;
use std::{
    io::{stdout, Write},
    process::{self, exit},
    str::FromStr,
};

#[derive(Parser, Debug, Clone)]
#[command(version, about, long_about = None)]
#[clap(name = "rqjs", version = env!("CARGO_PKG_VERSION"), bin_name = "rqjs")]
pub struct Args {
    #[clap()]
    pub file: Option<String>,
}

use clap::Parser;
use rquickjs::{async_with, AsyncContext, AsyncRuntime, Function, Module, Object, Value};

use rqjs_ext::{install_ext_async, ErrorExtensions};

pub async fn start(args: Args) {
    let Args { file } = args;
    let rt = AsyncRuntime::new().unwrap();
    let ctx = AsyncContext::full(&rt).await.unwrap();
    install_ext_async(&rt, &ctx).await;

    if let Some(path) = file {
        let path = std::path::PathBuf::from_str(&path).unwrap();
        let path = std::path::Path::new(&path);
        let name = path.file_name().expect("filename error");
        let code = std::fs::read_to_string(path).expect("read file error");
        async_with!(ctx => |ctx|  {
           let r = Module::evaluate(ctx.clone(), name.to_string_lossy().to_string(), code)
               .unwrap()
               .finish::<Value>();

           match r{
                Ok(v) => {
                      if !v.is_undefined() {
                        let g = ctx.globals();
                        let console: Object = g.get("console").unwrap();
                        let log: Function = console.get("log").unwrap();
                        log.call::<(Value<'_>,), ()>((v,)).unwrap();
                    }
              }
              Err(e) => match e.into_value(&ctx) {
                  Ok(v) => {
                      let obj = v.as_object().unwrap();

                      if let (Ok(message),Ok(stack)) = (obj.get::<_, String>("message"),obj.get::<_, String>("stack")){
                        println!("{}",format!("{}\n{}", message, stack).red());
                      }else {
                            println!("{:?}", obj)
                        }
                  }
                  Err(v) => {
                      println!("{:?}", v);
                  }
              },
           }
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

            ctx.with(|ctx| match ctx.eval::<Value, _>(input.as_bytes()) {
                Ok(v) => {
                    let g = ctx.globals();
                    let console: Object = g.get("console").unwrap();
                    let log: Function = console.get("log").unwrap();
                    if !v.is_undefined() {
                        log.call::<(Value<'_>,), ()>((v,)).unwrap();
                    }
                }
                Err(e) => match e.into_value(&ctx) {
                    Ok(v) => {
                        let obj = v.as_object().unwrap();

                        if let (Ok(message), Ok(stack)) = (
                            obj.get::<_, String>("message"),
                            obj.get::<_, String>("stack"),
                        ) {
                            println!("{}", format!("{}\n{}", message, stack).red());
                        } else {
                            println!("{:?}", obj)
                        }
                        exit(1);
                    }
                    Err(v) => {
                        println!("{:?}", v);
                        exit(1);
                    }
                },
            })
            .await;
        }
    }
}
