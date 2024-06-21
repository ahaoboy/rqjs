import { TextEncoder, TextDecoder } from 'util'

const buf = new TextEncoder().encode("hello")
console.log(buf)
const s = new TextDecoder().decode(buf)
console.log(s)