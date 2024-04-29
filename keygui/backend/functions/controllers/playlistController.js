const Playlist = require('../models/playlistModel')


//get Billboard Top 100 from database
const getPlaylist = async(request, result) => {
        const billboardData = await Playlist.find({})
        result.status(200).json(billboardData)
} 

module.exports = {
        getPlaylist
}