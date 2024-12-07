import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes

const uri = 'mongodb+srv://aryan:1234@cluster0.hnkhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI if needed
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('Logos'); // The database is called Logos

    const collections = await database.listCollections().toArray();

    // API endpoint to get all collections and their documents
    app.get('/collections', async (req, res) => {
      console.log('GET /collections was called'); // Debugging log
      try {
        const data = {};

        // Loop through each collection and fetch its documents
        for (const collection of collections) {
          const collectionName = collection.name;
          const documents = await database.collection(collectionName).find({}).toArray();
          data[collectionName] = documents; // Store documents under the collection name
        }
        res.json(data); // Send the aggregated data as JSON
      } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).send('Error fetching collections');
      }
    });

    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);