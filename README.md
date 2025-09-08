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


## JWT creation and JWT refresh token

https://medium.com/@sahilattar87860/secure-your-node-js-and-express-js-api-with-jwt-authentication-f25f1ebc4435

https://medium.com/@kizito917/jwt-refresh-token-implementation-with-node-js-postgres-and-sequelize-106ef6b3de68


## Input sanitization

https://article.arunangshudas.com/how-do-you-ensure-request-validation-and-data-sanitization-in-a-production-express-js-application-90ab32fdab94

https://medium.com/devmap/7-best-practices-for-sanitizing-input-in-node-js-e61638440096