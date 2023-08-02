import {useEffect, useState} from 'react'



const Album = ({album}) => {
    const keys = {0:'C', 1:'C♯/D♭', 2:'D', 3:'E♭', 4:'E', 5:'F', 6:'F♯/G♭', 7:'G', 8:'A♭', 9:'A', 10:'B♭', 11:'B/C♭'}
    const mode = {0: "Minor", 1: "Major"}
    
    const ms_to_s = (ms) =>{
        let min = Math.floor(ms/60000)
        let sec= ((ms % 60000)/1000).toFixed(0)
        return min + ":" + (sec < 10 ? '0' : '') + sec

    }

    return(
    <div>
        
        <h2> {album.name} </h2>
        <div> 
            
            {album.tracks && album.tracks.map((track, item)=>(
                <div>
                <p id={item}> {track.track_number}). {track.name}  {ms_to_s(album.features[item].duration_ms)} </p>
                <p>{Math.round(album.features[item].tempo)} bpm {album.features[item].time_signature}/4 </p>
                <p> {keys[album.features[item].key]} {mode[album.features[item].mode]} </p>
                </div>
            ))}

        </div>
    </div>
    )
}

export default Album