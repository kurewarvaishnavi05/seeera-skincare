const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = "mongodb://kurewarvaishnavi05_db_user:DMSgAiCSKTy9i2ja@ac-jw6qsos-shard-00-00.vxo0k5v.mongodb.net:27017,ac-jw6qsos-shard-00-01.vxo0k5v.mongodb.net:27017,ac-jw6qsos-shard-00-02.vxo0k5v.mongodb.net:27017/seera-skincare?ssl=true&authSource=admin&retryWrites=true&w=majority";
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected successfully!");
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await client.close();
  }
}

testConnection();
