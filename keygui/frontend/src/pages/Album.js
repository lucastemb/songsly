import {useEffect, useState} from 'react'



const Album = ({album}) => {
    console.log(album.features)

    return(
    <div>
        
        <h2> {album.name} </h2>
        <div> 
            
            {album.tracks && album.tracks.map((track, item)=>(
                <p id={item}> {track.track_number}). {track.name} {album.features[item].key} {album.features[item].mode} {album.features[item].tempo} {album.features[item].time_signature}/4 {album.features[item].duration_ms} </p>
            ))}

        </div>
    </div>
    )
}

export default Album