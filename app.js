const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

//ROUTES
app.get('/', (req, res) =>{
    res.send('test');
});

app.get('/posts', (req, res) =>{
    res.send('posts');
});

//Connect To DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology:true }, 
    () => console.log('connected to DB!')
); 

//Listening
app.listen(3000);