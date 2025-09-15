import express from 'express';
import mongoose, { mongo } from 'mongoose';
import User  from './Models/User';
const { MongoClient } = require('mongodb');
import { rateLimit } from 'express-rate-limit'
import rateLimiter from './rate-limit';
import bcrypt from 'bcryptjs';
const morgan = require('morgan');
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import jsonwebtoken from 'jsonwebtoken'

const app = express();
app.use(express.json());
app.use(morgan('combined'));

const PORT = 3000;

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db("admin")

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(rateLimiter)

app.get('/', async (req, res) => {

  const ack = await db.collection("ACK").find({},{projection: {_id:0}}).toArray()

  const users = await User.find({})

  console.log(req.body)


  res.send(`ACK ${JSON.stringify(ack[0])}\n\n${JSON.stringify(users)}`);

});


app.post('/', async (req, res) => { 

  console.log(req.body)

  let new_user=await req.body

  console.log(req.query['teste'])

  const user = await User.create(new_user)


  res.status(201).json(user);

});


app.post('/register',async (req,res) => {
  const { name,email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store the new user
  const user = await User.create({ name:name, email:email, password: hashedPassword })
  
  res.status(201).json({ message: 'User registered successfully',id:user});

})


app.post('/login', async (req,res)=>
{
    const {email, password } = req.body;

    const user = await User.findOne({'email':email})

    if(await bcrypt.compare(password, user.password)) 
    {
      const token = jsonwebtoken.sign(
        {user:user.name},"senha" ,{expiresIn:'60m'}

      )
      res.status(200).json({message:user,token:token})
      return
    }    

    console.log(user)
    res.status(400).json({message:"error"})


})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });