
# Setting Up and Running Your First Node.js Program

---

## Step 1: Install Node.js

1. Visit the official site: [https://nodejs.org](https://nodejs.org)
2. Download the **LTS (Long-Term Support)** version for your operating system
3. Install it like any software (Next → Agree → Finish)

### To verify installation:

```bash
node -v      # Shows Node.js version
npm -v       # Shows npm version
```

---

## Step 2: Using Node REPL

REPL stands for:

* **R**ead: Reads user input
* **E**val: Evaluates the code
* **P**rint: Outputs the result
* **L**oop: Repeats

### Start REPL:

```bash
node
```

### Try:

```js
> 2 + 2
4
> console.log("Hello World")
Hello World
```

Exit using:

```bash
.exit
```

---

## Step 3: Your First Node.js Program

1. Create a file named `app.js`
2. Write the following code:

```js
var name = "Aditya Sharma";

var a = 10;
var b = 20;

console.log(name);
console.log(a + b);
```

3. Run it from terminal:

```bash
node app.js
```

### Output:

```
Aditya Sharma
30
```

---

## Global Objects in Node.js

### What is a Global Object?

A **global object** is the top-level object that holds all global variables, functions, and modules.

* In the **browser**, the global object is `window`.
* In **Node.js**, it is `global`.

---

### Browser vs Node.js Global Object

| Feature                  | Browser            | Node.js                                  |
| ------------------------ | ------------------ | ---------------------------------------- |
| Global object name       | `window`           | `global`                                 |
| `this` at global scope   | refers to `window` | refers to `{}` (empty object in modules) |
| Can use `self`, `frames` | Yes                | No                                       |
| `globalThis` supported   | Yes                | Yes                                      |

### Why does `this` behave differently in Node.js?

* In **Node.js**, every file is treated as a **module**.
* Inside a module, `this` does **not** refer to the global object.
* Instead, `this` refers to `module.exports` (an empty object by default).
* That’s why:

  ```js
  console.log(this === global); // false
  ```

---

## Execution Flow of a Node Program

When you run a `.js` file:

1. Node reads your code.
2. Wraps it in a function called the **module wrapper**:

   ```js
   (function(exports, require, module, __filename, __dirname) {
     // your code here
   });
   ```
3. Passes it to the **V8 Engine**.
4. V8 compiles the code into **machine language** using JIT (Just-In-Time Compilation).
5. Code is executed, and the output is returned.

---

## Full Code Explained Line-by-Line

```js
var name = "Aditya Sharma";
```

* Declares a global variable using `var` with string value `"Aditya Sharma"`.

```js
var a = 10;
var b = 20;
```

* Two more global variables declared and initialized.

```js
console.log(name);
```

* Prints: `Aditya Sharma`

```js
console.log(a + b);
```

* Adds `a` and `b` → `30`

```js
console.log(global);
```

* `global` is the global object in Node.js.
* Logs all global variables and methods (timers, process, setTimeout, etc.)

```js
console.log(this);
```

* In the top-level of a Node module, `this` does **not** point to the global object.
* Instead, it prints `{}` (an empty object).

```js
console.log(globalThis);
```

* Standard global object across all environments (Node and browsers).
* Equivalent to `global` in Node and `window` in browsers.

```js
console.log(global === globalThis);
```

* Prints `true` in Node.js because `globalThis` and `global` reference the same object.

---

## Summary and Key Takeaways

* **Node.js runs JavaScript on the server**, outside the browser.
* Your first program runs through the **Node runtime** and is compiled by the **V8 engine** to machine code.
* Node uses `global` as its global object, not `window`.
* `this` in Node’s top-level file scope refers to `module.exports`, not the global object.
* `globalThis` provides a **universal global object** reference across all platforms.
* Understanding Node’s module scope and runtime behavior is critical for writing efficient server-side code.

