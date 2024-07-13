setTimeout(() => console.log('timeout'), 1000)

const id = setInterval(() => {
  console.log('interval')
}, 1000);

setTimeout(() => {
  console.log('cancel')
  clearInterval(id)
}, 3000)