# Learning-Express-Typescript

## Creating express server

```js
import express from 'express';
import mongoose, { mongo } from 'mongoose';
const { MongoClient } = require('mongodb');



const app = express();
app.use(express.json());


app.get('/', async (_req, res) => {

  const ack = await db.collection("ACK").find({},{projection: {_id:0}}).toArray()

  const users = await User.find({})


  res.send(`ACK ${JSON.stringify(ack[0])}\n\n${JSON.stringify(users)}`);

});
```

## Setting rate-limit

https://medium.com/@ignatovich.dm/creating-a-simple-api-rate-limiter-with-node-a834d03bad7a