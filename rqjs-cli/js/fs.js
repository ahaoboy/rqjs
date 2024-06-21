import * as fs from 'fs'
import * as fsp from 'fs/promises'
console.log(Object.keys(fs))
console.log(Object.keys(fsp))

const txt = fs.readFileSync("./Cargo.toml", 'utf8')
console.log(txt.length)
const p = fsp.readFile("./Cargo.toml", 'utf8')
console.log(typeof p)

// TODO: fix bug
// console.log(Promise.resolve(1), Promise)
console.log(p instanceof Promise)
// console.log(Object.keys(Promise))

p.then(textPromise => {
  console.log(text === textPromise)
})
console.log("end")

Promise.resolve(1).then(i => console.log(i))

// import * as fs from 'fs/promises'
// const p = fs.readFile("./Cargo.toml")
// console.log(p instanceof Promise)

// p.then((t) => console.log(t.toString()))