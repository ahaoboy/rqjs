import { performance } from 'perf_hooks'


const st = performance.now()
console.log(st)

setTimeout(() => {
  a
  const end = performance.now()
  console.log('setTimeout', end - st)
}, 1000);


const h = setInterval(() => {
  const end = performance.now()
  const d = end - st
  console.log('setInterval', d)
  if (d > 2000) {
    clearInterval(h)
  }
}, 1000);


