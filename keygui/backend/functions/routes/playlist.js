const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node')

const {
    getPlaylist
} = require("../controllers/playlistController")

const router = express.Router()
router.use(cors());
router.use(bodyParser.json());

router.get('/', getPlaylist)

router.post('/login', (req, res)=>{
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi.authorizationCodeGrant(code).then(data=> {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in

        })
    })
    .catch(()=>{
    res.sendStatus(400)
    })
})

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
        refreshToken
    });

    spotifyApi.refreshAccessToken().then((data)=>{
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })

        spotifyApi.setAccessToken(data.body['access_token']);
    }).catch(()=> {
        res.sendStatus(400);
    })
})

module.exports=router