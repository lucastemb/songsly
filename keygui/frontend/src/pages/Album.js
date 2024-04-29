const Album = ({album}) => {
    const keys = {0:'C', 1:'C♯/D♭', 2:'D', 3:'E♭', 4:'E', 5:'F', 6:'F♯/G♭', 7:'G', 8:'A♭', 9:'A', 10:'B♭', 11:'B/C♭'}
    const mode = {0: "Minor", 1: "Major"}
    
    const ms_to_s = (ms) =>{
        let min = Math.floor(ms/60000)
        let sec= ((ms % 60000)/1000).toFixed(0)
        return min + ":" + (sec < 10 ? '0' : '') + sec

    }

    if(!album || !album.tracks || album.tracks.length === 0){
        return <div> No Tracks Returned </div>
    }

    return(
    <div className="bg-[#191414]">
        
        <div className ="flex flex-col justify-center items-center pt-6">
        <h1 className="font-jakarta font-bold text-white text-4xl"> {album.name} </h1>
        </div>
        <div className="flex justify-center pt-3"> 
        <div className="w-3/6"> 
            
            {album.tracks && album.tracks.map((track, item)=>(
                <div className="grid grid-cols-[25%_75%] w-full items-center bg-[#4B4848] rounded-2xl text-white mt-6 mb-6"> 
                <img className="w-3/4 mt-2 mb-2 ml-2" src={album.images[0].url}></img>
                <div className="font-jakarta font-semibold flex flex-col mr-6">
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
    </div>
    )
}

export default Album