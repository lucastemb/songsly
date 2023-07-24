import {useEffect, useState} from 'react'


const Home = () => {
    const [songs, setSongs] = useState(null)

    useEffect(()=> {
        const fetchSongs = async () => {
            const response = await fetch('/home')
            const json = await response.json()

            if (response.ok){
                setSongs(json)
                console.log(json)
            }
        }
        fetchSongs()
    }, [])
    return (
        <div className="home">
            <div className="songs">
                {songs && songs.map((song, index)=>(
                    <div key={song._id}>
                        <h2>{song.name}</h2>
                        <p>{song.bpm}</p>
                        <p>{song.time_signature}</p>
                        <p>{song.artist}</p>
                        <p> {song.genres} </p>
                        <img src ={song.img}/>

                    </div> 

                ))}
            </div>
        </div>
    )
}

export default Home