
import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {useEffect, useState} from 'react'
import Album from './Album'




const AlbumAnalysis = (props) => {
    const [album, setAlbum] = useState("")
    const [features, setFeatures] = useState(null)
    
    const accessToken = ""
    const spotifyApi = new SpotifyWebApi({
        clientId: '',
        clientSecret: '',
        redirectUri: ''
    })
    const album_id = props.uri.substring(31,53) //playlist uri
    useEffect(()=> {
        const ids = []
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getAlbum(album_id).then((response)=>{
           (response.body.tracks.items.map((songs)=>{
                ids.push(songs.id)
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
    }, [])
    
    return(
        <Album album={album}/>
    )
}

export default AlbumAnalysis