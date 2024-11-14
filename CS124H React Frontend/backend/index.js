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
    const database = client.db('Categories'); // The database is called Categories

    // API endpoint to get categories from College collection
    app.get('/Categories/College', async (req, res) => {
      const collegeCollection = database.collection('College');
      const colleges = await collegeCollection.find({}).toArray();
      res.json(colleges);
    });

    // API endpoint to get categories from Company collection
    app.get('/Categories/Company', async (req, res) => {
      const companyCollection = database.collection('Company');
      const companies = await companyCollection.find({}).toArray();
      res.json(companies);
    });

    // API endpoint to get categories from Sports collection
    app.get('/Categories/Sports', async (req, res) => {
      const sportsCollection = database.collection('Sports');
      const sports = await sportsCollection.find({}).toArray();
      res.json(sports);
    });

    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);