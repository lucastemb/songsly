const express = require('express')
var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:4000/home/callback'
});

const {
    getPlaylist
} = require("../controllers/playlistController")

const router = express.Router()

router.get('/', getPlaylist)

router.get("/token", (req,res)=>{
    res.render(process.env.SPOTIFY_REFRESH_TOKEN)
})

router.get('/login', (req, res)=>{
    res.redirect(spotifyApi.createAuthorizeURL([
        "ugc-image-upload",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "app-remote-control",
        "playlist-modify-public",
        "user-modify-playback-state",
        "playlist-modify-private",
        "user-follow-modify",
        "user-read-currently-playing",
        "user-follow-read",
        "user-library-modify",
        "user-read-playback-position",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "playlist-read-collaborative",
        "streaming"
    ]))
})

router.get('/callback', (req,res)=>{
    console.log('reqquery', req.query)
    const code = req.query.code
    spotifyApi.authorizationCodeGrant(req.query.code)
    .then((response)=>{
        res.send(JSON.stringify(response))
    })
})

module.exports=router