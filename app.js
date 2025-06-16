require("./xyz.js"); //  one module into another
// while write this require and file name this  make a function and put the whole code of that file in there and run them and we can only acess thme if and and only if we export him 

// const util = require("node : util")
const {x} = require("./calculate/sum.js")

const { calculateSum, calculateMultiply } = require("./calculate");
const data = require("./data.json")
var name = "Aditya Sharma";
console.log(data)
var a = 10;

console.log(x);
var b = 20;

calculateSum(a, b);
calculateMultiply(a, b);