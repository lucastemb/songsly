require('dotenv').config()

const express = require('express')
const playlistRoutes = require('./routes/playlist')

//express
const app = express()

//middleware
app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

//routes
app.use('/api/playlist', playlistRoutes)

app.listen(process.env.PORT, ()=> {
    console.log('listening on port 4000!')
})


