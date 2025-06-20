

# **Databases in Backend Development (Node.js Context)**

---

## **1. What is a Database?**

A **database** is an organized collection of data that allows for efficient storage, retrieval, and manipulation of information.

### **Definition**

A database helps store structured or unstructured data electronically and allows users/applications to perform operations like insert, read, update, and delete (CRUD).

---

## **2. What is DBMS?**

**DBMS** stands for **Database Management System** — it is software used to interact with databases.

### **Key Features**

* Data storage, retrieval, and manipulation
* Data security and integrity
* User access control
* Backup and recovery

---

## **3. Types of Databases (As per Image)**

| Type                  | Examples          | Purpose / Use-Case                         |
| --------------------- | ----------------- | ------------------------------------------ |
| 1. Relational DB      | MySQL, PostgreSQL | Structured data, strong relationships      |
| 2. NoSQL DB           | MongoDB           | Unstructured data, schema-less             |
| 3. In-memory DB       | Redis             | Fast caching and session management        |
| 4. Distributed SQL DB | CockroachDB       | Distributed relational DB                  |
| 5. Time-series DB     | InfluxDB          | IoT, real-time sensor data                 |
| 6. Object-Oriented DB | db4o              | Objects stored directly                    |
| 7. Graph DB           | Neo4j             | Complex graph relationships                |
| 8. Hierarchical DB    | IBM IMS           | Tree-like structure, legacy systems        |
| 9. Network DB         | IDMS              | More complex than hierarchical, uses graph |
| 10. Cloud DB          | Amazon RDS        | Managed databases on cloud                 |

---

## **4. Relational Databases (RDBMS)**

### **Key Concepts**

* Tables, Rows, Columns
* Structured data
* Fixed Schema
* Supports relationships (foreign keys, joins)
* Uses SQL (Structured Query Language)

### **Example**

**MySQL**, **PostgreSQL**

### **Use-Cases**

* Banking systems
* Inventory management
* Applications requiring ACID compliance

---

## **5. E. F. Codd’s 12 Rules of RDBMS**

1. **Information Rule** – Data must be stored in tables.
2. **Guaranteed Access** – Every data item must be logically accessible.
3. **Systematic Null Values**
4. **Active Online Catalog**
5. **Comprehensive Data Sublanguage Rule** – SQL support
6. **View Updating Rule**
7. **High-level Insert, Update, and Delete**
8. **Physical Data Independence**
9. **Logical Data Independence**
10. **Integrity Independence**
11. **Distribution Independence**
12. **Non-subversion Rule**

> All 12 must be satisfied for a true RDBMS. Most RDBMS like MySQL partially fulfill these.

---

## **6. NoSQL Databases**

### **Definition**

**NoSQL** stands for “Not Only SQL.” It includes databases that don’t use traditional table-based storage.

### **Types of NoSQL DB**

| Type           | Description                      | Example   |
| -------------- | -------------------------------- | --------- |
| Document DB    | Stores documents (JSON/BSON/XML) | MongoDB   |
| Key-Value DB   | Simple key-value pairs           | Redis     |
| Wide Column DB | Stores columns in families       | Cassandra |
| Graph DB       | Stores nodes and edges           | Neo4j     |
| Multi-model DB | Supports multiple models         | ArangoDB  |

### **Advantages**

* Schema-less
* Highly scalable (horizontal and vertical)
* Better for unstructured or semi-structured data
* Supports nested and complex relationships without joins

---

## **7. MongoDB (Document-Based NoSQL DB)**

### **Data Structure**

* Database → Collection → Document
* Documents are JSON-like structures

```json
{
  "_id": "001",
  "name": "John",
  "email": "john@example.com",
  "orders": [{ "item": "book", "qty": 2 }]
}
```

### **Key Characteristics**

* Uses BSON (Binary JSON)
* Supports nested documents
* No predefined schema
* Built-in replication and sharding
* Queries use MQL (Mongo Query Language)

### **No Joins / Normalization Needed**

* MongoDB encourages embedding data instead of joining tables
* Denormalized structure for faster reads

---

## **8. Comparison: RDBMS vs NoSQL (Document)**

| Feature        | RDBMS (MySQL/PostgreSQL) | NoSQL (MongoDB)           |
| -------------- | ------------------------ | ------------------------- |
| Data Structure | Tables (rows/columns)    | Documents (JSON/BSON)     |
| Schema         | Fixed                    | Flexible                  |
| Query Language | SQL                      | MQL                       |
| Scalability    | Vertical                 | Horizontal                |
| Relationships  | Foreign keys + joins     | Embedded/nested documents |
| Use-case       | Transaction-heavy apps   | Real-time apps, big data  |
| Normalization  | Required                 | Not required              |

---

## **9. How Data is Stored and Retrieved**

### **In SQL (Relational)**

* Data is normalized
* Stored in multiple tables
* Joins are used for combining data
* Example: `SELECT * FROM users JOIN orders ON users.id = orders.user_id`

### **In MongoDB**

* Data is denormalized
* Stored in embedded documents
* No joins; nested structures used
* Example:

```json
{
  "user": {
    "name": "Alice",
    "orders": [{ "item": "pen", "qty": 3 }]
  }
}
```

---

## **10. Summary & Key Takeaways**

* RDBMS is best for structured, relational data and strong consistency.
* NoSQL is ideal for unstructured, fast-changing, scalable, and high-volume applications.
* MongoDB provides a flexible schema and high performance for JSON-like data.
* Always choose the right DBMS based on the application requirements.

---

