const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5002
require('dotenv').config();

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6m4yg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const todoTaskCollection = client.db('todoTaskList').collection('taskList')
        
        app.get('/todo',async(req, res)=>{
            const todoTask = await todoTaskCollection.find().toArray()
            res.send(todoTask)
        })
        app.post('/todo',async (req, res)=>{
            const todo = req.body 
            const result = await todoTaskCollection.insertOne(todo)
            res.send(result)
        })
        app.delete('/todo/:id',async(req, res)=>{
            const id = req.params.id 
            const query = {_id:ObjectId(id)}
            const result = await todoTaskCollection.deleteOne(query)
            res.send(result)
        })
    
       


    } finally {

    }
}
run().catch(console.dir);

app.get('/',(req, res)=>{
    res.send('to-do-task app is running')
})
app.listen(port, ()=>{
    console.log('listing', port)
})