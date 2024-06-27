use clap::Parser;
use rqjs_cli::start::{self, Args};

#[tokio::main]
async fn main() {
    let args = Args::parse();
    start::start(args).await;
}

#[cfg(test)]
mod test {
    use std::{fs::read_dir, path::PathBuf, str::FromStr};

    use rqjs_cli::start::{self, Args};

    #[tokio::test(flavor = "multi_thread", worker_threads = 2)]
    async fn test_js() {
        let root = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        println!("root:{}", root);

        for entry in std::fs::read_dir("./js").unwrap() {
            let d = entry.unwrap();
            let name = d.file_name().to_string_lossy().to_string();
            if ["inquirer.js", "require.js"].contains(&name.as_str()) {
                continue;
            }
            let mut p: PathBuf = PathBuf::from_str(&root).unwrap();
            p.push("js");
            p.push(name);
            let p = p.to_string_lossy().to_string();
            println!("test: {}", p);
            let args = Args {
                file: Some(p.clone()),
            };
            start::start(args).await;
        }
    }
}
