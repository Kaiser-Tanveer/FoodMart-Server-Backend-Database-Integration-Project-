const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middlewares 
app.use(cors());
app.use(express.json());


// MongoDB Connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// All the crud operations inside this async function
const run = async () => {
    try {
        // creating Services collection in MongoDB 
        const halfCollection = client.db('foodMart').collection('home');
        const foodCollection = client.db('foodMart').collection('services');
        // MongodB Reviews Collection
        const reviewCollection = client.db('foodMart').collection('reviews');


        // Read from DB
        app.get('/home', async (req, res) => {
            const query = {};
            const cursor = halfCollection.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        })

        // Read from DB
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        })

        // Read specific data by id 
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await foodCollection.findOne(query); res.send(result);
        })


        // Creating extra new service data in MongoDB 
        app.post('/services', async (req, res) => {
            const query = req.body;
            const service = await foodCollection.insertOne(query);
            res.send(service);
        })

        // Get review data from DB 
        app.get('/review', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })

        // Creating Review data in MongoDB 
        app.post('/review', async (req, res) => {
            const review = req.body;
            const query = await reviewCollection.insertOne(review);
            res.send(query);
        })

        // Deleting review data from DB 
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await foodCollection.deleteOne(query);
            res.send(result);
        })


    }
    finally {

    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('food server is running..');
});


app.listen(port, () => {
    console.log('server is running on port: ', port);
})