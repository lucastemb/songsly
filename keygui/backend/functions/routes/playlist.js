const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')

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
router.get('/', getPlaylist)

router.get("/token", (req,res)=>{
    res.render(process.env.SPOTIFY_REFRESH_TOKEN)
})

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
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
        console.error('Callback Error:', error);
        return res.status(400).send(`Callback Error: ${error}`);
    }

    // Exchange the code for an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const { access_token, refresh_token, expires_in } = data.body;

        // Set the access token and refresh token on the Spotify API object
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        // Redirect the user after successful login
        res.redirect("https://songsly-ec779.web.app/home");

        // Set up token refresh logic
        setInterval(async () => {
            try {
                const refreshData = await spotifyApi.refreshAccessToken();
                spotifyApi.setAccessToken(refreshData.body['access_token']);
                console.log('Access Token Refreshed Successfully');
            } catch (refreshError) {
                console.error('Error Refreshing Access Token:', refreshError);
            }
        }, (expires_in / 2) * 1000); // Refresh halfway before expiration

    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.status(500).send('Error getting tokens');
    });
});

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
                    console.log(featuresResponse.body.audio_features);
                    // Send album data as JSON response
                    res.json(albumData);
                });
        })
        .catch(error => {
            console.error('Error fetching album analysis:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        
    } catch (error) {
        console.error('Error fetching album analysis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports=router