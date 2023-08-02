import {useEffect, useState} from 'react'

const Album = ({album}) => {
    return(
    <div>
        <h2> {album.name} </h2>
        <div> 
            {album.tracks && album.tracks.map((track, item)=>(
                <p id={item}> {track.track_number}). {track.name} </p>
            ))}
        </div>
    </div>
    )
}

export default Album