require('dotenv').config()


const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const playlistRoutes = require('./routes/playlist')
const router = express.Router()
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

//express
const app = express()

app.use(cors());

//middleware
app.use(express.json())

app.use((request, response, next) => {
    next()
})

//routes
app.use('/home', playlistRoutes)


//connect 
mongoose.connect(process.env.MONGO_URI, {
    dbName: "spotifydata",
});

//used by firebase for firebase functions
exports.app = functions.https.onRequest(app);