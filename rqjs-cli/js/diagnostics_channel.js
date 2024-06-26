import dc from 'diagnostics_channel'

const a = dc.channel('test');
const b = dc.channel('test');

// channel is memoized
console.log(a === b); // true

dc.deleteChannel('test');

const c = dc.channel('test');

// memoized channel was deleted and a new instance was memoized
console.log(a === c); // false
