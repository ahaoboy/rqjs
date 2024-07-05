import process from 'process'

console.log(process.platform)
console.log(process.argv)
console.log(process.env)
console.log(process.env.FORCE_COLOR)
console.log(process.stdout)
console.log(process.stdin.setRawMode)
console.log(process.stdin.row)
console.log(process.stdout)
console.log(process.stdout.columns)
console.log(process.stdout.rows)
console.log(process.stdout.write)
process.stdout.write("\u001b[32m [process]")