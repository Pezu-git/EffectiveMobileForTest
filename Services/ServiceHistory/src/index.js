const express = require('express')
const http = require("http");
const config = require("./config/config");
const cors = require('cors');
const db = require("./models");
const routes = require('./routes/routes')
const amqp = require("amqplib");
let order, channel, connection;


const app = express();
var server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/', routes);
// { force: true }
db.sequelize.sync()
    .then(() => {
        console.log("Drop and re-sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });



const PORT = process.env.PORT || 6060;

server.listen(PORT, () => {
    console.log('History Server listen port: ', PORT);
})