const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const route = require('./routes/route');

const server = express();

server.use(cors);
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/poll', route);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server Open in this ${PORT}`));

module.exports = server;