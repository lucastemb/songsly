import {useEffect, useState} from 'react'
import Album from './Album'
import axios from 'axios'




const AlbumAnalysis = (props) => {
    const [album, setAlbum] = useState(null);
    
    const album_id = props.uri.substring(31,53) //playlist uri
    useEffect(()=> {
        axios.get(`https://us-central1-songsly-ec779.cloudfunctions.net/app/home/album-analysis/${encodeURIComponent(album_id)}`, {withCredentials: true})
            .then(response=> {
                const { name, images, tracks, features} = response.data;
                setAlbum({
                    name: name,
                    images: images,
                    tracks: tracks,
                    features: features
                });
            })
    }, [album_id])
    
    return(
        <Album album={album}/>
    )
}

export default AlbumAnalysis