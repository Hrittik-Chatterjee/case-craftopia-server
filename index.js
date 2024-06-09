require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const demoCaseDb = client.db("demoCaseDb");
    const demoCollections = demoCaseDb.collection("demoCollections");
    const reviewCollections = demoCaseDb.collection("reviewCollections");

    // app.post("/recipes", async (req, res) => {
    //   const recipesData = req.body;
    //   const result = await recipesCollection.insertOne(recipesData);
    //   res.send(result);
    // });
    app.get("/casedemos", async (req, res) => {
      const demoData = demoCollections.find();
      const result = await demoData.toArray();
      res.send(result);
    });
    app.get("/userreviews", async (req, res) => {
      const reviewData = reviewCollections.find();
      const result = await reviewData.toArray();
      res.send(result);
    });

    console.log("You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
