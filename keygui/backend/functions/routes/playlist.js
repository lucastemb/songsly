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
router.use(bodyParser.urlencoded({extended: true}));

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
    .catch(error=>{
        console.error(error);
        res.sendStatus(400)
    })
})

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log("woo!");
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


router.get('/album-analysis/:uri', async (req, res) => {
    try {
        const albumId = req.params.uri; // Extract album ID from URI
        spotifyApi.getAlbum(albumId)
        .then(albumResponse => {
            // Extract track IDs from album response
            const trackIds = albumResponse.body.tracks.items.map(song => song.id);
    
            // Get audio features for tracks
            return spotifyApi.getAudioFeaturesForTracks(trackIds)
                .then(featuresResponse => {
                    // Construct album data object
                    const albumData = {
                        name: albumResponse.body.name,
                        images: albumResponse.body.images,
                        tracks: albumResponse.body.tracks.items,
                        features: featuresResponse.body.audio_features
                    };
                    // Send album data as JSON response
                    res.json(albumData);
                });
        })
        .catch(error => {
            console.error('Error fetching album analysis:', error);
            res.status(500).json({ error: 'Internal Server Error', error});
        });

        
    } catch (error) {
        console.error('Error fetching album analysis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports=router