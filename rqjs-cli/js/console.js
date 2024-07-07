console.log([1, '1'])
console.log(1, true, 'a')

console.log('Promise:', Promise.resolve(1))
console.log('Proxy:', new Proxy({ a: 1 }, {}))

console.table({ a: 1 })

console.log("Array:", [1, "1", [[[[[1, "1"]]]]]]);
console.log("BigInt:", BigInt(1));
console.log("Bool:", true);
console.log("Constructor:", new Function());
console.log("Exception:", new Error("An error occurred!"));
console.log("Float:", 1.1);
console.log("Function:", function myFunction() { });
console.log("Int:", 1);
console.log("Null::", null);
console.log("Object:", { a: 1, b: "1", c: { a: { a: { a: 1, b: "1" } } } });
console.log("Promise:", Promise.resolve(1));
console.log("Proxy:", new Proxy({ a: 1 }, {}));
console.log("String:", "a");
console.log("Symbol:", Symbol("a"));
console.log("Undefined:", undefined);

const a = [1];
a[1] = a;
console.log("Circular:", a);

console.log(
  "Substitutions: Hello, %s! %d %i %f %o %O css:'%c' %s",
  "world",
  1,
  1,
  1.1,
  { a: 1 },
  { b: 2 },
  "color: red;",
  "string",
);