import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {useEffect, useState} from 'react'
import Album from './Album'




const AlbumAnalysis = (props) => {
    const [album, setAlbum] = useState(null)
    const [error, setError] = useState("")
    
    const album_id = props.uri.substring(31,53) //playlist uri
    useEffect(()=> {
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI
        })
        const ids = []
        spotifyApi.setAccessToken(props.accessToken)
        spotifyApi.getAlbum(album_id).then((response)=>{
           (response.body.tracks.items.map((songs)=>{
                ids.push(songs.id)
                return songs
            }))
            spotifyApi.getAudioFeaturesForTracks(ids).then((res)=>{
                console.log(res.body.audio_features)
                setAlbum({
                    name: response.body.name,
                    images: response.body.images,
                    tracks: response.body.tracks.items,
                    features: res.body.audio_features
                })
            }) 
        })
        .catch((error)=> {
            setError('Error fetching data: ' + error.message);
            console.error('Error fetching data', error)
        })
    }, [album_id, props.accessToken])
    
    return(
        <Album album={album} error={error}/>
    )
}

export default AlbumAnalysis