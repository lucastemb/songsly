require('dotenv').config()



const express = require('express')
const mongoose = require('mongoose')
const playlistRoutes = require('./routes/playlist')
const router = express.Router()


//express
const app = express()

//middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

//routes
app.use('/home', playlistRoutes)


//connect 
mongoose.connect(process.env.MONGO_URI, {
    dbName: "spotifydata",
})
    .then(()=>{
        app.listen(process.env.PORT, ()=> {
            console.log('listening on port 4000!')
        })
    })
    .catch((error)=>{console.log(error)})


