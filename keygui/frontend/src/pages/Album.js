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
    <div className="flex justify-center flex-col">
        
        <div>
        <h2 className="font-jakarta font-semibold"> {album.name} </h2>
        </div>
        <div> 
            
            {album.tracks && album.tracks.map((track, item)=>(
                <div className="flex flex-row justify-center items-center w-full"> 
                <img className="w-1/6" src={album.images[0].url}></img>
                <div className="font-jakarta font-semibold flex flex-col h-25">
                <div className="flex flex-row justify-between">
                <p classid={item}> {track.name} </p>
                <p>{album.features[item].time_signature}/4 {ms_to_s(album.features[item].duration_ms)} </p>
                </div>
                <div className="flex flex-row justify-between"> 
                <p>{Math.round(album.features[item].tempo)} Bpm </p>
                <p> {keys[album.features[item].key]} {mode[album.features[item].mode]} </p>
                </div>
                </div>
                </div>
            ))}

        </div>
    </div>
    )
}

export default Album