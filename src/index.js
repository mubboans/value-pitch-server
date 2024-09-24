require('dotenv').config();
const express = require('express')
const cors = require("cors");
const morgan = require('morgan');
const { dbConnect } = require('./src/dbConfig/dbConfig');
const { route_not_found } = require('./src/helper/res-helper');
const { createSocket } = require('./src/controller/socket-controller');
const app = express()
const authroute = require('./route/auth-route')
const port = process.env.PORT || 8008;

const corsOptions = {
    // origin: 'http://127.0.0.1:5173', // to allow specific origin
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ['set-cookie'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.get('/life-check', (req, res) => {
    res.status(200).send('working fine  api test / | \ 👌👍 🎂 ✔');
})

app.use('/valuepitch', authroute);

app.use(route_not_found)