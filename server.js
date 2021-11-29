
const express = require('express');
const server = express();

server.all('/', (req, res) => res.send("The bot is online."));

function keepAlive() {
server.listen(3000, () => {console.log("The server is ready.")});
}

module.exports = keepAlive;