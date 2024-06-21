import { Buffer } from 'buffer'

const buf = Buffer.from("hello")
console.log(buf)
const base64 = buf.toString('base64')
console.log(base64)
const s = Buffer.from(base64, 'base64').toString()
console.log(s)
