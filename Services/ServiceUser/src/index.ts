import express, { Request, Response } from "express";
import { createServer } from 'http';
import cors from 'cors'
import routes from "./routes/routes.js";
import serverConfig from './config/config.js';
import { appDataSource } from "./db/app-data-source.js";

appDataSource.initialize()
    .then(() => {
        console.log('Data sourse has been init!')
    }).catch((err) => {
        console.log('Error during Data Source init', err)
    })

const app = express()
const server = createServer(app)

const middleware = [
    cors(),
    express.json({ type: '*/*' }),
    express.urlencoded({ extended: true }),
];

app.use(middleware);
app.use('/', routes);

console.log('User history service host: ', process.env.HISTORY_SERVICE_HOST)
console.log('User history service port: ', process.env.HISTORY_SERVICE_PORT)
const PORT = serverConfig.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listen port: ${PORT}`)
})