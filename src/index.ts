import express from 'express';
import mongoose, { mongo } from 'mongoose';
import User  from './Models/User';
const { MongoClient } = require('mongodb');
import { rateLimit } from 'express-rate-limit'
import rateLimiter from './rate-limit';


const app = express();
app.use(express.json());

const PORT = 3000;

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db("admin")

mongoose.connect('mongodb://127.0.0.1:27017/admin');

app.use(rateLimiter)

app.get('/', async (_req, res) => {

  const ack = await db.collection("ACK").find({},{projection: {_id:0}}).toArray()

  const users = await User.find({})


  res.send(`ACK ${JSON.stringify(ack[0])}\n\n${JSON.stringify(users)}`);

});


app.post('/', async (req, res) => { 
  console.log(req.body)

  let new_user=await req.body

  const user = await User.create(new_user)


  res.status(201).json(user);

});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });