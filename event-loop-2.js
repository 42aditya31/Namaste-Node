// a=100
// Last line of the file.
// process.nextTick
// Promise
// timer
// setImmediate
// File Reading CB

const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then(console.log);
Promise.resolve("Promise2").then(console.log);
Promise.resolve("Promise3").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

setTimeout(() => console.log("Timer expired"), 0);

process.nextTick(() => console.log("process.nextTick"));
process.nextTick(() => console.log("process.nextTick2"));
process.nextTick(() => console.log("process.nextTick3"));

function printA() {
  console.log("a=", a);
}

printA();
console.log("Last line of the file.");