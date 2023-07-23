const Playlist = require('../models/playlistModel')


//get Billboard Top 100 from database
const getPlaylist = async(request, result) => {
        const songs = await Playlist.find({})
        result.status(200).json(songs)
} 

module.exports = {
        getPlaylist
}