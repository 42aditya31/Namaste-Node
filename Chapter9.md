

##  Event Loop + libuv + V8 (Deep Explanation)

### 1. What is libuv?

* `libuv` is a C++ library used by Node.js.
* It provides:

  * **Event Loop**
  * **Thread Pool** (for heavy async operations like fs, crypto, dns)
  * **Cross-platform I/O operations**
* It allows Node.js to be **asynchronous**, **non-blocking**, and **single-threaded** (for JS execution).

---

##  Internal Architecture (High-level Flow)

```
          ┌──────────────────────┐
          │  JavaScript (Your Code)
          └────────┬─────────────┘
                   │
         (passes to Node Runtime)
                   ↓
          ┌──────────────────────┐
          │      V8 Engine       │  ← Compiles & Executes JS
          └────────┬─────────────┘
                   ↓
          ┌──────────────────────┐
          │       libuv          │  ← Manages async tasks
          └────────┬─────────────┘
                   ↓
        ┌───────────────┬──────────────┐
        │ Event Loop     │ Thread Pool │  ← fs, crypto, etc.
        └───────────────┴──────────────┘
```

---

##  Event Loop Phases (Based on Your Diagram)

Event loop continuously checks queues and executes callbacks.

1. **Timers Phase**

   * Executes callbacks scheduled by `setTimeout` and `setInterval`.

2. **Poll Phase**

   * Waits for incoming I/O operations (like `fs.readFile`, `https.get`).

3. **Check Phase**

   * Executes `setImmediate()` callbacks.

4. **Close Callbacks Phase**

   * Executes `socket.on("close")` or similar close events.

### Microtask Queue (Always has higher priority)

* `process.nextTick()`
* `Promise.then()`

These are **executed immediately after the current operation**, before moving to the next phase.

---

##  Your Code Execution (Step-by-step Breakdown)

### Code:

```js
const a = 100 ;
setImmediate(() => console.log("set Immediate"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("file reading callback");
});

setTimeout(() => console.log("set timeout"), 0);

function printA() {
  console.log("a=", a);
}

printA();
console.log("last line of the code");
```

### Execution Flow:

1. `const a = 100;` → executed immediately (main thread).
2. `setImmediate(...)` → goes to **Check Phase**.
3. `fs.readFile(...)` → offloaded to **libuv Thread Pool**, callback goes to **Poll Phase**.
4. `setTimeout(...)` → goes to **Timer Phase** (after 0ms).
5. `printA()` → executed immediately.
6. `console.log("last line...")` → executed immediately.

### Callback Execution Order:

* First: Synchronous logs
* Then: Microtasks (`process.nextTick`, `Promise`) if any
* Then: `setTimeout` (Timer phase)
* Then: `fs.readFile` (Poll phase)
* Then: `setImmediate` (Check phase)

---

##  Example 1 Explanation (Why output order is unique)

```js
setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);
Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

process.nextTick(() => {
  process.nextTick(() => console.log("inner nextTick"));
  console.log("nextTick");
});

console.log("Last line of the file.");
```

### Execution Flow:

1. `console.log("Last line of the file")` – sync
2. `process.nextTick` → runs after sync code

   * `nextTick`
   * `inner nextTick`
3. `Promise.then(...)` → runs after microtasks
4. `setTimeout(...)` → Timer Phase
5. `setImmediate(...)` → Check Phase
6. `fs.readFile(...)` callback → Poll Phase

### Output:

```
Last line of the file.
nextTick
inner nextTick
Promise
Timer expired
setImmediate
File Reading CB
```

---

##  Example 2 Explanation (After file read callback adds more tasks)

```js
fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("2nd timer"), 0);
  process.nextTick(() => console.log("2nd nextTick"));
  setImmediate(() => console.log("2nd setImmediate"));
  console.log("File Reading CB");
});
```

### After File Read Callback:

* `console.log("File Reading CB")` – immediate inside callback
* `process.nextTick` – queued in Microtask Queue
* `setTimeout` – Timer phase (next loop)
* `setImmediate` – Check phase (next loop)

### Full Output:

```
Last line of the file.
nextTick
Promise
Timer expired
setImmediate
File Reading CB
2nd nextTick
2nd setImmediate
2nd timer
```

---

##  libuv Thread Pool + Event Loop

Some APIs like `fs`, `crypto` are **offloaded** to a thread pool (default 4 threads).

* libuv tracks completion
* Once done, adds the callback to the **poll** queue
* Event loop picks and runs them when in Poll Phase

---

##  Difference: Browser vs Node Event Loop

| Feature                        | Browser                 | Node.js                            |
| ------------------------------ | ----------------------- | ---------------------------------- |
| Environment                    | For UI apps (DOM)       | Server-side, file/network APIs     |
| Microtask Order                | Promise → then nextTick | nextTick → then Promise            |
| `setTimeout` vs `setImmediate` | Same priority           | setImmediate runs after poll phase |
| I/O (fs, crypto)               | Limited                 | Offloaded to libuv Thread Pool     |
| Thread Pool                    | No                      | Yes                                |
| `document`, `window`           | Present                 | Not Present                        |

---

## Summary

* Node.js is **single-threaded** for JS execution but **multi-threaded** under the hood (libuv).
* libuv provides a **thread pool** and an **event loop**.
* `setTimeout`, `fs.readFile`, and `setImmediate` are scheduled in **different phases**.
* Microtasks like `process.nextTick` and `Promise.then` always run before any of the above.

