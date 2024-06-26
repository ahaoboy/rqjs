console.log([1, '1'])
console.log(1, 1)
console.log('a')

const a = [1]
a[1] = a;
console.log(a)

console.log('Promise:', Promise.resolve(1))
console.log('Proxy:', new Proxy({ a: 1 }, {}))

console.table({ a: 1 })