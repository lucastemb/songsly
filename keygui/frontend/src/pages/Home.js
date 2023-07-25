import {useEffect, useState} from 'react'
import Plot from 'react-plotly.js'


const Home = () => {
    const [topGenres, setTopGenres] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    const [keyCounter, setKeyCounter] = useState(null)
    const [bpmRangeCounter, setBpmRangeCounter] = useState(null)
    // const [keySigantureCounter, setKeySignatureCounter] = useState(null)
    // const [modeCounter, setModeCounter] = useState(null)

    useEffect(()=> {
        const fetchBillboardData = async () => {
            const response = await fetch('/home')
            const json = await response.json()

            if (response.ok){
                setTopGenres((json[0]["topGenres"])) //extract top genres only, not their frequency 
                setTopArtists((json[0]["topArtists"])) //extract top artists only, not their frequency
                setKeyCounter((json[0]["keyCounter"]))
                setBpmRangeCounter((json[0]["bpmRangeCounter"]))
                console.log(bpmRangeCounter)
                
            }
        }
        fetchBillboardData()
    }, [])

    return (
        <div className="home">
            <div className="songs">
                    <div>
                        <div> 
                            {/* Need to include topGenres && because it ensures the value is not null */}
                            {topGenres && topGenres.map((genre, item)=>(
                                <p key ={item}> {item+1}). {genre[0]} </p>))}
                        </div>
                        <div> 
                            {topArtists && topArtists.map((artist, item)=>(
                                <p key={item}> {item+1}). {artist[0]} </p>))}
                        </div>
                        <div>
                            {keyCounter && 
                                <Plot data={[
                                    {
                                        x: Object.keys(keyCounter), 
                                        y: Object.values(keyCounter),
                                        type: 'bar',
                                    }
                                ]}/>
                            }
                        </div>
                        <div>
                            {bpmRangeCounter && 
                                <Plot data={[
                                    {
                                        labels: bpmRangeCounter.map(bpm => bpm[0]), 
                                        values: bpmRangeCounter.map(bpm => bpm[1]),
                                        type: 'pie',
                                    }
                                ]}/>
                            }
                        </div>
                        
                    </div> 
            </div>
        </div>
    )
}

export default Home