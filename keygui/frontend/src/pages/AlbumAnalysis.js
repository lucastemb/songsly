
import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {useEffect, useState} from 'react'




const AlbumAnalysis = (props) => {
    const [album, setAlbum] = useState("")
    const accessToken = ""
    const spotifyApi = new SpotifyWebApi({
        clientId: '',
        clientSecret: '',
        redirectUri: ''
    })
    const id = props.uri.substring(31,53) //playlist uri
    useEffect(()=> {
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getAlbum(id).then((response)=>{
            console.log(response);
            setAlbum({
                name: response.body.name
            })
        })
    }, [])
    
    
    return(
        <h1> {album.name} </h1>
    )
}

export default AlbumAnalysis