const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    response.json({message: "Billboard Top 100"})
})


router.get('/:id', (request, response) => {
    response.json({message: "Specific Playlist"})
})


module.exports=router