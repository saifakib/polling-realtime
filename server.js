require('dotenv').config();
const express = require('express');
const path = require('path');
//const cors = require('cors');
const mongoose = require('mongoose');

const route = require('./routes/route');

const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
//server.use(cors);

server.use('/poll', route);


const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true, useUnifiedTopology: true
})
 .then(() => {
    server.listen(PORT, () => console.log(`Server Open in this ${PORT}`));
 })
 .catch((err) => console.log(err.message));



module.exports = server;