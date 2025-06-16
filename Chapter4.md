

# Modules in Node.js

---

## What is a Module?

In **Node.js**, a **module** is a **reusable block of code** whose existence does not accidentally affect other code.

Each `.js` file in Node is considered a **separate module** by default.

### Examples:

* `fs` → built-in File System module
* `http` → built-in Web server module
* Your own `.js` files that export functions, objects, or variables

---

## Why Do We Need Modules?

1. **Code Reusability**

   * Keep functions in one file and reuse them across projects.

2. **Maintainability**

   * Keeps code clean and organized into logical parts.

3. **Separation of Concerns**

   * Each module handles only what it’s supposed to (e.g., DB, auth, routes).

4. **Encapsulation**

   * Internal variables/functions are **not exposed globally** unless exported.

---

## How to Use a Module in Node.js

### 1. **Using Built-in Modules**

```js
const fs = require('fs'); // loads the file system module
```

### 2. **Creating Your Own Module**

**math.js** (custom module)

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

**main.js**

```js
const add = require('./math');
console.log(add(5, 3)); // 8
```

---

## What is the `require()` Function?

* `require()` is a **CommonJS** function used to **import** modules into your file.
* When you call `require('module')`, Node:

  1. Resolves the path
  2. Loads and executes the file
  3. Returns the `module.exports` object

---

## What is the Entry File in Node.js?

* The **entry file** is the **starting point** of a Node.js application.
* Usually named `index.js` or `app.js`
* It’s the file you run using:

  ```bash
  node index.js
  ```

---

## Why Don’t We Get Access to Module Variables and Functions Directly?

Because Node.js **wraps each module in a function** behind the scenes:

```js
(function(exports, require, module, __filename, __dirname) {
  // your code
});
```

* This makes everything inside the file **private to the module**, unless explicitly exported.

---

## What is `module.exports`?

* It's an object that is **returned** when a module is `require()`d.
* You assign the things you want to **export** from a file to `module.exports`.

### Example:

**utils.js**

```js
function greet(name) {
  return `Hello, ${name}`;
}

module.exports = greet;
```

**app.js**

```js
const greet = require('./utils');
console.log(greet('Aditya'));
```

---

## Exporting Multiple Functions/Variables

You can attach multiple properties to `module.exports`.

### Example:

**math.js**

```js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const PI = 3.14;

module.exports = {
  add,
  subtract,
  PI
};
```

**main.js**

```js
const math = require('./math');

console.log(math.add(10, 5));       // 15
console.log(math.subtract(10, 5));  // 5
console.log(math.PI);               // 3.14
```

---

## What is Destructuring?

**Destructuring** is a JavaScript feature that lets you **unpack values** from objects or arrays into variables.

### With modules:

```js
const { add, subtract, PI } = require('./math');

console.log(add(2, 3));
console.log(PI);
```

---

## CommonJS vs ES Modules

| Feature            | CommonJS (`require`)     | ES Modules (`import`)              |
| ------------------ | ------------------------ | ---------------------------------- |
| Syntax             | `const x = require('x')` | `import x from 'x'`                |
| Export             | `module.exports = {}`    | `export default` or `export {}`    |
| File extension     | `.js`                    | `.mjs` (or use `"type": "module"`) |
| Execution Model    | Synchronous              | Asynchronous                       |
| Default in Node.js | Yes                      | Requires enabling                  |

> Node.js added ES module support in v12+, but CommonJS remains the default.

---

## What is the Use of `index.js` in a Module Folder?

If you create a folder with multiple files (a module), and include an `index.js` file inside it:

### Node will automatically load `index.js` when you `require()` the folder.

**Example:**

```
/myModule
  - index.js
  - helper.js
```

**index.js**

```js
const helper = require('./helper');
module.exports = helper;
```

**main.js**

```js
const myModule = require('./myModule'); // Automatically loads index.js
```

This makes `index.js` the **default export file** for the module.

---

## Summary and Best Practices

* Each `.js` file in Node is a **separate module** with its own scope.
* Use `require()` and `module.exports` to **import/export** code.
* `module.exports` lets you share functions, objects, and variables between files.
* Use **destructuring** for cleaner imports.
* Use **`index.js`** as the entry point when exporting an entire folder.
* Understand **CommonJS vs ES Modules** for compatibility and future upgrades.

