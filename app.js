const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');
const MONGODB = require('./utility/url.mongo');


// PARSERS
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;


//ROUTES
const podcastRoutes = require('./routes/podcasts');
const userRoutes = require('./routes/users');
const likeRoutes = require('./routes/likes');


app.use(bodyParser.json());



//CORS
app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, Content-Type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors({origin:true, credentials:true}));



//ROUTERS
app.use('/podcasts', podcastRoutes);
app.use('/auth', userRoutes);
app.use('/likes', likeRoutes);

//CONNECTING TO MONGODB
mongoose.connect(
  MONGODB
).then(() => {
    console.log("connected...")
});

//LISTENTING
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});