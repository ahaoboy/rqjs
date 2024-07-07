import process from 'process'

console.log(process.stdout.columns)
console.log(process.stdout.rows)
process.stdin.addListener('data', (s) => {
  console.clear()
  console.log('data: ', s)
})