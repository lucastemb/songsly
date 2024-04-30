const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
const cookieParser = require('cookie-parser');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

const {
    getPlaylist
} = require("../controllers/playlistController")

const router = express.Router()
router.use(cors());
router.use(cookieParser());

router.get('/token', (req,res)=> {
    const { access_token, refresh_token } = req.cookies;
    res.json({ access_token, refresh_token });
})
router.get('/', getPlaylist)

router.get('/login', (req, res)=>{
    scopes=["ugc-image-upload",
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
    "streaming"]

    res.redirect(spotifyApi.createAuthorizeURL(scopes))
})

router.get('/callback', (req, res) => {
    const code  = req.query.code;

    // exchange code for access token 
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const { access_token, refresh_token, expires_in } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        const expirationTime = Date.now() + (expires_in * 1000);

        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
        res.cookie('expires_in', expires_in);
        res.cookie('expiration_time', expirationTime);
        res.redirect("https://songsly.netlify.app/home");

    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.status(500).send('Error getting tokens');
    });
});


const refreshTokenIfNeeded = (req, res, next) => {
    const { access_token, refresh_token, expires_in } = req.cookies;

    spotifyApi.setAccessToken(access_token);
    if (!access_token || Date.now() >= parseInt(req.cookies.expiration_time)) {
        spotifyApi.refreshAccessToken().then(data => {
            const newAccessToken = data.body['access_token'];

            const newExpirationTime = Date.now() + (expires_in * 1000);
            res.cookie('access_token', newAccessToken);
            res.cookie('expiration_time', newExpirationTime);
            spotifyApi.setAccessToken(newAccessToken);
            next();
        }).catch(err => {
            console.error('Could not refresh access token', err);
            res.status(500).send('Failed to refresh access token');
        });
    } else {
        next();
    }
}


router.get('/album-analysis/:uri', refreshTokenIfNeeded , async (req, res) => {
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