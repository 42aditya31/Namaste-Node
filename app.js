require("./xyz.js"); //  one module into another

const util = require("node : util")

const { calculateSum, calculateMultiply } = require("./calculate");
const data = require("./data.json")
var name = "Aditya Sharma";
console.log(data)
var a = 10;

var b = 20;

calculateSum(a, b);
calculateMultiply(a, b);