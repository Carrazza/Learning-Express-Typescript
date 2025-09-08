import express from 'express';
import mongoose, { mongo } from 'mongoose';
import User  from './Models/User';
const { MongoClient } = require('mongodb');
import { rateLimit } from 'express-rate-limit'
const Redis = require('ioredis')

const app = express();
app.use(express.json());

const PORT = 3000;

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db("admin")

mongoose.connect('mongodb://127.0.0.1:27017/admin');

const redis = new Redis();

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const path = req.path 
  const method = req.method 

  const currentTime = Date.now();
  const key = `rate-limit:${ip}:${method}:${path}`;

  const limit = 5; // Max requests
  const windowTime = 1 * 60; // 15 minutes in seconds

  const requests = await redis.incr(key);

  if (requests === 1) {
    // Set the expiration of the key to the time window on first request
    await redis.expire(key, windowTime);
  }

  if (requests > limit) {
    return res.status(429).json({ message: 'Too many requests, try again later.' });
  }

  next();
};

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