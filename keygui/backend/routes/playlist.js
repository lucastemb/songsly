const express = require('express')
const {
    getPlaylist
} = require("../controllers/playlistController")

const router = express.Router()

router.get('/', getPlaylist)


router.get('/:id', (request, response) => {
    response.json({message: "Specific Playlist"})
})


module.exports=router