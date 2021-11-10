const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const MONGODB = require('./utility/url.mongo');


// PARSERS
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;


//ROUTES
const podcastRoutes = require('./routes/podcasts');
const userRoutes = require('./routes/users');
const likeRoutes = require('./routes/likes');


app.use(bodyParser.json());


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