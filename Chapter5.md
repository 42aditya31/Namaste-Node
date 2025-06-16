

# Behind the Scenes of `require()` in Node.js

---

## 1. What Happens When You Write `require('/xyz.js')`?

When you call `require('xyz.js')`, Node.js performs **five internal steps**:

> **Module Resolution → Module Loading → Wrapping → Evaluation → Caching**

Let’s explore each step:

---

### 1. Module Resolution

Node determines **what file to load**.

It resolves the full path based on:

* Core modules (`fs`, `http`, etc.)
* Relative paths (`./utils.js`)
* Absolute paths (`/home/user/app.js`)
* Folders (looks for `index.js` inside)

**If not found** → Throws `MODULE_NOT_FOUND`

---

### 2. Module Loading

Once resolved, Node **reads the contents of the file** as a string:

```js
const content = fs.readFileSync('xyz.js', 'utf-8');
```

---

### 3. Module Wrapping

Node wraps your entire module code inside an **IIFE** (Immediately Invoked Function Expression):

```js
(function (exports, require, module, __filename, __dirname) {
  // Your actual module code here
});
```

This is called the **Module Wrapper Function**.

### Why?

* Provides each module **its own scope** (like a sandbox)
* Keeps variables/functions **private** to that module
* Allows Node to inject special variables:

  * `exports`: Shortcut to `module.exports`
  * `require`: To import other modules
  * `module`: Represents the current module object
  * `__filename`: Full path to the current file
  * `__dirname`: Directory of the current module

---

### 4. Code Evaluation

Now the code inside the wrapper function is **executed by the V8 Engine**.

* If the module sets anything to `module.exports`, that value is returned by `require()`.

Example:

```js
module.exports = function greet(name) {
  return `Hello, ${name}`;
};
```

So if you do:

```js
const greet = require('./greet');
```

You're getting the return value of `module.exports`.

---

### 5. Module Caching

After a module is evaluated once:

* It is **cached in memory**
* Next time it’s required → Node uses the **cached version**, doesn't reload or re-execute it

```js
require.cache
```

This is an object that stores all loaded modules.

### Benefit:

* Saves time
* Prevents side effects from running multiple times
* Makes circular dependencies work properly

---

## What is IIFE?

**IIFE = Immediately Invoked Function Expression**

It is a function that:

1. Is defined
2. Is executed immediately

In Node’s module system:

```js
(function(exports, require, module, __filename, __dirname) {
  // Your module code here
})();
```

This keeps variables/functions inside this scope **private** and **isolated** from global or other modules.

---

## Why Are Variables/Functions Private in Different Modules?

Because each module is:

* **Wrapped in a function**
* Has its own **scope**
* Not exposed unless attached to `module.exports`

So:

```js
var secret = "Hidden"; // private to this file
```

Cannot be accessed from another module unless:

```js
module.exports.secret = secret;
```

---

## How Do You Get Access to `module.exports` and `require()`?

You get them automatically in every Node file/module.

Node **injects** the following into every module:

```js
(function(exports, require, module, __filename, __dirname) {
  // your code
});
```

That’s why you don’t need to define `require()` or `module`.

They are **not global**, but **local to each module** via the wrapper.

---

## Summary: Full Behind-the-Scenes Flow

### When You Write:

```js
const mod = require('./file.js');
```

### Internally:

#### ➤ 1. **Module Resolution**

* Determines absolute path to `'./file.js'`

#### ➤ 2. **Module Loading**

* Reads the file content as plain text

#### ➤ 3. **Wrapping**

* Wraps your code in a function like:

```js
(function(exports, require, module, __filename, __dirname) {
  // code from file.js
});
```

#### ➤ 4. **Evaluation**

* Executes the wrapper function
* Any value assigned to `module.exports` is **returned** by `require()`

#### ➤ 5. **Caching**

* The module is cached in memory
* If you `require()` the same file again → **cached version is reused**

---

## Important: One Module, One Load

If you use the same module in 10 different files:

```js
const logger = require('./logger');
```

→ It's **loaded and evaluated only once**, then reused from cache.

---

## Example Visual Flow

```plaintext
User writes:
const user = require('./user.js');

Node.js:
→ Resolve absolute path (e.g., /app/user.js)
→ Load file content
→ Wrap in function (IIFE)
→ Inject exports, require, module, etc.
→ Execute
→ Cache result in require.cache
→ Return module.exports
```

---

## Best Practices & Final Notes

* Use `module.exports = {}` to export multiple values
* Use `require()` to import any module
* Modules are private unless explicitly exported
* All modules are **singleton and cached**
* Use destructuring for clean imports
* Avoid modifying the cached module state unless intentional

---

