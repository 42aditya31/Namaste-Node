// Importing required module
const fs = require('fs');

// Variable declaration
const a = 100;

// Scheduling a function to execute immediately after I/O events
setImmediate(() => {
  console.log("setImmediate");
});

// Reading a file asynchronously
fs.readFile("./file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("file reading callback");
});

// setTimeout with 0 delay to simulate macro task
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// Function declaration and call
function printA() {
  console.log("a =", a);
}

printA();

console.log("last line of the code");
