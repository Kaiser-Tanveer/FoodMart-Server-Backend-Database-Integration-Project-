const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middlewares 
app.use(cors());
app.use(express.json());

// MongoDB Connection 

const uri = "mongodb+srv://<username>:<password>@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('food server is running..');
});

userName: foodMartDB
passWord: JUTyUmbwcNZhGUB1

app.listen(port, () => {
    console.log('server is running on port: ', port);
})