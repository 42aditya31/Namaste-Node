
#  Introduction to Node.js

---

##  What is Node.js?




**Node.js** is a **runtime environment** that allows you to run JavaScript code **outside the browser**, typically on the **server-side**.

### 🔍 In Simple Terms:

Node.js lets developers use JavaScript to build backend applications like APIs, web servers, and tools.

###  Key Characteristics:

* Built on **Google’s V8 JavaScript engine** (used in Chrome)
* Follows an **event-driven**, **non-blocking I/O** model
* Uses **single-threaded architecture** with **asynchronous** capabilities
* Ideal for **I/O-heavy** operations (APIs, streaming, file systems)

---

##  History of Node.js

### 🔹 1. Creator: **Ryan Dahl**

* Released **Node.js in 2009**
* Wanted to overcome the **limitations of traditional web servers** (like Apache), especially around **handling concurrent requests**

> “Why can’t we build web servers that scale easily and handle many users without blocking?”

---

### 🔹 2. Technologies Behind Node.js:

| Technology             | Role in Node.js                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **V8 Engine**          | Compiles JavaScript to machine code — **fast and efficient**                                                          |
| **SpiderMonkey**       | Earlier JS engine by Mozilla. Ryan initially considered it but dropped it for **V8**, which was **faster and newer**. |
| **libuv**              | A C library that gives Node its **non-blocking I/O** capabilities                                                     |
| **Joyent**             | Company that **sponsored and maintained** Node.js initially                                                           |
| **Apache HTTP Server** | Traditional web server. Used **blocking** architecture, which Ryan aimed to improve upon                              |

---

##  Blocking vs Non-Blocking Servers

| Feature            | Blocking (Traditional)   | Non-Blocking (Node.js) |
| ------------------ | ------------------------ | ---------------------- |
| Thread per request | Yes                      | No                     |
| Performance        | Slower for many requests | High throughput        |
| Example            | PHP, Apache              | Node.js                |
| Resource usage     | High (more threads)      | Low (event loop-based) |

###  Example:

```js
// Non-blocking Example in Node.js
const fs = require('fs');

fs.readFile('file.txt', 'utf-8', (err, data) => {
  if (err) return console.error(err);
  console.log(data); // Runs asynchronously
});
```

---

##  What is npm?

**npm** = **Node Package Manager**
It is the **default package manager** for Node.js.

###  Key Features:

* Comes bundled with Node.js
* Hosts over **2 million+ packages**
* Helps manage **dependencies**, run scripts, and share modules

###  Example:

```bash
npm init      # Initialize a new project
npm install express  # Install Express.js
```

---

## 🪟 Windows Support: Joyent + Microsoft

* In early days, **Node.js only worked on UNIX-based systems**.
* With the help of **Microsoft**, and under the **sponsorship of Joyent**, Node.js was ported to run on **Windows OS**.
* Microsoft integrated Node.js into **Azure**, boosting adoption.

---

##  io.js — A Fork of Node.js

### Why io.js?

* Around 2014, Node.js development **slowed down under Joyent**.
* A group of contributors forked Node.js to create **io.js**, aiming for:

  * Faster updates
  * Better ECMAScript support
  * Open governance

### What Happened Next?

* In 2015, **Node.js and io.js merged again**, forming the **Node.js Foundation** under the **Linux Foundation**.
* This led to faster releases, LTS versions, and a better ecosystem.

---

##  Interview Preparation: Key Q\&A

###  Q1: What is Node.js and how is it different from traditional web servers?

**A:** Node.js is a JavaScript runtime that uses a non-blocking, event-driven model. Unlike traditional servers like Apache that spawn a new thread for each request, Node uses a single-threaded event loop to handle multiple concurrent connections efficiently.

---

###  Q2: What makes Node.js fast?

**A:** It uses the V8 engine for fast JavaScript execution and an event-driven, non-blocking I/O model via the libuv library.

---

###  Q3: What is the difference between Node.js and io.js?

**A:** io.js was a fork of Node.js aimed at accelerating development and adopting the latest JavaScript standards. Later, both projects merged under the Node.js Foundation.

---

## 🧪 Hands-on Exercises

1.  Install Node.js and run a basic script:

```bash
node -v
npm -v
```

```js
// hello.js
console.log("Hello from Node.js");
```

2.  Read a file asynchronously:

```js
const fs = require('fs');
fs.readFile('hello.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

3.  Initialize a project with `npm`:

```bash
npm init -y
```

---

##  Summary & Key Takeaways

* **Node.js** = JavaScript runtime for server-side applications, built on **V8**.
* Designed by **Ryan Dahl** to overcome Apache’s blocking model.
* Powered by **libuv** for non-blocking I/O, event loop for concurrency.
* **npm** is Node's package manager with millions of modules.
* Node.js gained **Windows support** via collaboration with Microsoft and Joyent.
* **io.js** was a fork that helped reform Node’s governance and speed of updates.

---
