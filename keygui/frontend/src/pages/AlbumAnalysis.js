
import React from 'react'
//import { useAlbum } from 'react-spotify-api'
//import {useEffect, useState} from 'react'

const AlbumAnalysis = (props) =>{
    return(
     <h1> {props.uri.substring(31,53)} </h1>
    )
}

export default AlbumAnalysis