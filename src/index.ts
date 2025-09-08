import express from 'express';
import mongoose, { mongo } from 'mongoose';
import User  from './Models/User';
const { MongoClient } = require('mongodb');
import { rateLimit } from 'express-rate-limit'


const app = express();
app.use(express.json());

const PORT = 3000;

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db("admin")

const mongoo = mongoose.connect('mongodb://127.0.0.1:27017/admin');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)



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