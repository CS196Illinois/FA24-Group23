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
    const database = client.db('Categories'); // Replace with your actual database name
    const collection = database.collection('College');

    // API endpoint to get categories
    app.get('/categories', async (req, res) => {
      const categories = await collection.find({}).toArray();
      res.json(categories);
    });

    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);