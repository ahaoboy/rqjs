use clap::Parser;
use rqjs_cli::start::{self, Args};

#[tokio::main]
async fn main() {
    let args = Args::parse();
    start::start(args).await;
}
