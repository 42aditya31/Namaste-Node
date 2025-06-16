// Modules protect their variables and functions from leaking

//console.log("Sum Module Executed");
var x = "PS"
require("../xyz.js");
function calculateSum(a, b) {
  const sum = a + b;

  console.log(sum);
}

module.exports = { calculateSum,x };

// module.exports.x = x;
// module.exports.calculateSum = calculateSum;