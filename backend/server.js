const express = require('express');
const mongoose = require('./config/connect');
const articleApi = require('./routes/article.js');
const authorApi = require('./routes/author.js');
const cors = require('cors');
const app = express();
port = 3000;

app.use(express.json());
app.use(cors());
app.use('/article',articleApi)

app.use('/author',authorApi);

app.use('/getimage',express.static('./uploads'))

app.listen(port,()=>{
    console.log('server listening on port')
});