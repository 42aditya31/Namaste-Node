const { MongoClient } = require("mongodb");

// The original URL is not valid, because it contains special characters that need to be encoded.
// Use the following URL format for MongoDB Atlas connection strings
// mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites
// we used %40 to encode the '@' character in the password

const url =
  "mongodb+srv://adityasharma:Adiya%404231@namstenodejs.vuug01n.mongodb.net/";
const client = new MongoClient(url);

const dbName = "Test";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("TestUserCollection");

  //Insert a document into the collection
  const data = {
    firstname: "Nandan",
    lastname: "Jogi",
    city: "Ahmedabad",
    age: 25,
  };
    const insertResult = await collection.insertOne(data);
    console.log("Inserted document =>", insertResult);


  //Find all documents in the collection
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
