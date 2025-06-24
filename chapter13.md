
# **MongoDB – In-Depth Guide**

---

## 1. What is MongoDB?

### Definition and Core Concepts:

* MongoDB is a **NoSQL**, **document-based** database.
* It stores data in **JSON-like format** called BSON (Binary JSON).
* It is **schema-less**, meaning documents in the same collection can have different structures.
* MongoDB is **non-relational**, but supports relationships using techniques like embedded documents and referencing.

### Why MongoDB?

* Flexible data model (ideal for agile, iterative development).
* High scalability (horizontal scaling using sharding).
* High availability (via replica sets).
* Suitable for large, unstructured or semi-structured datasets.

---

## 2. Community vs Enterprise Edition

| Feature                 | Community Edition                  | Enterprise Edition                      |
| ----------------------- | ---------------------------------- | --------------------------------------- |
| Cost                    | Free and open source               | Paid, licensed                          |
| Security Features       | Basic (role-based access control)  | Advanced (LDAP, Kerberos, auditing)     |
| Monitoring & Automation | Basic tools                        | Integration with Ops Manager            |
| Support                 | Community forums                   | Professional MongoDB Inc. support       |
| Use Case                | Startups, students, small projects | Enterprises, banks, production at scale |

---

## 3. What is a Cluster in MongoDB?

* A **cluster** is a **group of MongoDB servers** working together to manage data.
* It can be of two types:

  * **Replica Set** – ensures high availability and data redundancy.
  * **Sharded Cluster** – enables horizontal scaling for handling large datasets.
* Clusters increase fault tolerance and performance by distributing or duplicating data.

---

## 4. Replica Set vs Sharded Cluster

| Feature          | Replica Set                      | Sharded Cluster                           |
| ---------------- | -------------------------------- | ----------------------------------------- |
| Purpose          | High availability and redundancy | Horizontal scaling and load distribution  |
| Structure        | Primary + Multiple Secondaries   | Multiple shards (each is a replica set)   |
| Writes           | Always to the **primary**        | Distributed based on shard key            |
| Reads            | Can be from secondaries          | Can be from multiple shards               |
| Example Use Case | E-commerce cart history          | Social media posts with millions of users |

**Behind the scenes:**

* **Replica Set** uses **oplog** (operations log) for syncing data from primary to secondaries.
* **Sharded Cluster** uses:

  * **config servers** (store metadata),
  * **query router (mongos)** (routes query to right shard),
  * **shards** (actual data storage).

---

## 5. MongoDB Compass

### What is it?

* A **GUI tool** to interact with MongoDB visually.
* You can use it instead of the command line.

### Key Features:

* Visualize collections and documents.
* Build and run queries.
* Analyze schema structure.
* Monitor performance.
* Index suggestion and creation.

### Why it's useful:

* Makes data inspection, debugging, and prototyping faster.
* Ideal for beginners or teams working with live production data.

---

## 6. Database and Collection in MongoDB

### Terminology:

* **Database**: Logical container for data (like a folder).
* **Collection**: A group of documents (like a table in SQL).
* **Document**: The basic unit of data (like a row), in BSON format.

```js
// Example document in a "users" collection
{
  name: "Aditya Sharma",
  age: 21,
  skills: ["React", "Node.js"],
  isActive: true
}
```

---

## 7. How to Add a Database in a Cluster

1. Connect to your cluster using MongoDB Compass or CLI.
2. Use the `use` keyword to switch/create a DB:

```bash
use projectDB
```

3. Insert a document to create a collection:

```js
db.users.insertOne({ name: "John Doe", age: 30 });
```

MongoDB creates the database and collection lazily when data is inserted.

---

## 8. Connecting MongoDB with Node.js

### Using MongoDB native driver:

1. Install the package:

```bash
npm install mongodb
```

2. Code to connect:

```js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("myAppDB");
    const users = db.collection("users");
    await users.insertOne({ name: "Aditya" });
    console.log("Data inserted");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

---

## 9. CRUD Operations in MongoDB using Node.js

### Example using Mongoose (preferred in production):

```bash
npm install mongoose
```

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myAppDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Model
const User = mongoose.model('User', userSchema);

// Create
User.create({ name: "Aditya", age: 21 });

// Read
User.find({ name: "Aditya" });

// Update
User.updateOne({ name: "Aditya" }, { age: 22 });

// Delete
User.deleteOne({ name: "Aditya" });
```

---

## 10. What is Mongoose and Why Use It?

### Definition:

* **Mongoose** is an **ODM** (Object Data Modeling) library for MongoDB + Node.js.

### Key Features:

* Schema-based data modeling.
* Data validation out-of-the-box.
* Middleware support (like pre-save hooks).
* Easy relationship modeling (population).

### Difference from MongoDB:

| MongoDB Native Driver     | Mongoose ODM                     |
| ------------------------- | -------------------------------- |
| Low-level database access | High-level abstraction           |
| Manual data validation    | Built-in validation              |
| Free schema               | Schema enforced via models       |
| Good for small scripts    | Good for structured applications |

### When to use:

* Use Mongoose in **structured apps** (e.g., full-stack apps with React).
* Use native MongoDB driver for **lightweight scripts** or performance-critical services.

---

## 11. Common Mistakes and Misconceptions

* **Misconception**: MongoDB is always schema-less → You can (and should) define schemas using Mongoose.
* Forgetting to close connections in Node.js → leads to memory leaks.
* Overusing embedded documents → leads to bloated documents and performance issues.
* Not indexing fields → causes slow read queries.

---

## 12. Best Practices

* Use **Mongoose** for schema and validation in structured apps.
* Define indexes explicitly on frequently queried fields.
* Use **replica sets** in production for high availability.
* Avoid large documents (>16MB), use references if needed.
* Secure MongoDB: use authentication, disable open ports, whitelist IPs.

---

## 13. Mini-FAQ Box

**Q: Should I use Mongoose or the native driver?**
A: Use Mongoose when you need structured schemas, validation, and cleaner code.

**Q: Can I store different fields in different documents?**
A: Yes, MongoDB allows schema flexibility, but it's best to keep a consistent schema.

**Q: What if my app needs to scale beyond one server?**
A: Use **sharded clusters** to distribute data horizontally.

---

