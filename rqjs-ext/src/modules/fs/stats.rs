// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
use crate::utils::result::ResultExt;

use rquickjs::{Ctx, Result};
use tokio::fs;

use std::{
    fs::Metadata,
    time::{SystemTime},
};

#[cfg(unix)]
use std::os::unix::fs::FileTypeExt;
#[cfg(unix)]
use std::os::unix::fs::MetadataExt;


#[rquickjs::class]
#[derive(rquickjs::class::Trace)]
pub struct Stat {
    #[qjs(skip_trace)]
    metadata: Metadata,
}

#[rquickjs::methods(rename_all = "camelCase")]
impl Stat {
    #[qjs(skip)]
    pub fn new(metadata: Metadata) -> Self {
        Self { metadata }
    }

    #[qjs(get, enumerable)]
    pub fn dev(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.dev()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn ino(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.ino()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn mode(&self) -> u32 {
        #[cfg(unix)]
        {
            self.metadata.mode()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn nlink(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.nlink()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn uid(&self) -> u32 {
        #[cfg(unix)]
        {
            self.metadata.uid()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn gid(&self) -> u32 {
        #[cfg(unix)]
        {
            self.metadata.gid()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn rdev(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.rdev()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn size(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.size()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn blksize(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.blksize()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn blocks(&self) -> u64 {
        #[cfg(unix)]
        {
            self.metadata.blocks()
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn atime_ms(&self) -> i64 {
        #[cfg(unix)]
        {
            self.metadata.atime_nsec() / 1e6 as i64
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn mtime_ms(&self) -> i64 {
        #[cfg(unix)]
        {
            self.metadata.mtime_nsec() / 1e6 as i64
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn ctime_ms(&self) -> i64 {
        #[cfg(unix)]
        {
            self.metadata.ctime_nsec() / 1e6 as i64
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn birthtime_ms(&self, ctx: Ctx<'_>) -> Result<u64> {
        #[cfg(unix)]
        {
            self.metadata
                .created()
                .or_throw(&ctx)
                .and_then(|c| c.elapsed().or_throw(&ctx))
                .map(|d| d.as_millis() as u64)
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn atime(&self, ctx: Ctx<'_>) -> Result<SystemTime> {
        self.metadata.accessed().or_throw(&ctx)
    }

    #[qjs(get, enumerable)]
    pub fn mtime(&self, ctx: Ctx<'_>) -> Result<SystemTime> {
        self.metadata.modified().or_throw(&ctx)
    }

    #[qjs(get, enumerable)]
    pub fn ctime(&self) -> SystemTime {
        #[cfg(unix)]
        {
            SystemTime::UNIX_EPOCH + std::time::Duration::from_nanos(self.metadata.ctime_nsec() as u64)
        }
        #[cfg(not(unix))]
        {
            todo!()
        }
    }

    #[qjs(get, enumerable)]
    pub fn birthtime(&self, ctx: Ctx<'_>) -> Result<SystemTime> {
        self.metadata.created().or_throw(&ctx)
    }

    pub fn is_file(&self) -> bool {
        self.metadata.is_file()
    }
    pub fn is_dir(&self) -> bool {
        self.metadata.is_dir()
    }

    pub fn is_symlink(&self) -> bool {
        self.metadata.is_symlink()
    }

    #[qjs(rename = "isFIFO")]
    pub fn is_fifo(&self) -> bool {
        #[cfg(unix)]
        {
            self.metadata.file_type().is_fifo()
        }
        #[cfg(not(unix))]
        {
            false
        }
    }

    pub fn is_block_device(&self) -> bool {
        #[cfg(unix)]
        {
            self.metadata.file_type().is_block_device()
        }
        #[cfg(not(unix))]
        {
            false
        }
    }

    pub fn is_character_device(&self) -> bool {
        #[cfg(unix)]
        {
            self.metadata.file_type().is_char_device()
        }
        #[cfg(not(unix))]
        {
            false
        }
    }

    pub fn is_socket(&self) -> bool {
        #[cfg(unix)]
        {
            self.metadata.file_type().is_socket()
        }
        #[cfg(not(unix))]
        {
            false
        }
    }
}

pub async fn stat_fn(ctx: Ctx<'_>, path: String) -> Result<Stat> {
    let metadata = fs::metadata(&path)
        .await
        .or_throw_msg(&ctx, &format!("Can't stat \"{}\"", &path))?;

    let stats = Stat::new(metadata);

    Ok(stats)
}

pub fn stat_fn_sync(ctx: Ctx<'_>, path: String) -> Result<Stat> {
    let metadata =
        std::fs::metadata(&path).or_throw_msg(&ctx, &format!("Can't stat \"{}\"", &path))?;

    let stats = Stat::new(metadata);

    Ok(stats)
}
