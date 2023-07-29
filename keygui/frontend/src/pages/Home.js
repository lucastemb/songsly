import {useEffect, useState} from 'react'
import Plot from 'react-plotly.js'


const Home = () => {
    const [topGenres, setTopGenres] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    const [keyCounter, setKeyCounter] = useState(null)
    const [bpmRangeCounter, setBpmRangeCounter] = useState(null)
    const [keySignatureCounter, setKeySignatureCounter] = useState(null)
    const [modeCounter, setModeCounter] = useState(null)

    useEffect(()=> {
        const fetchBillboardData = async () => {
            const response = await fetch('/home')
            const json = await response.json()

            if (response.ok){
                setTopGenres((json[0]["topGenres"])) //extract top genres only, not their frequency 
                setTopArtists((json[0]["topArtists"])) //extract top artists only, not their frequency
                setKeyCounter((json[0]["keyCounter"]))
                setBpmRangeCounter((json[0]["bpmRangeCounter"]))
                setKeySignatureCounter((json[0]["keySignatureCounter"]))
                setModeCounter((json[0]["modeCounter"]))
                
            }
        }
        fetchBillboardData()
    }, [])

    return (
        <div className="home">
            <div className="songs">
                    <div className="grid grid-rows-2">
                        <div className="grid grid-cols-3 justify-items-center">
                        <div className="col-span-1 overflow-hidden">
                            {keyCounter && 
                                <Plot style={{width: "33vw",height:"50vh"}} layout={{title: "Keys"}} data={[
                                    {
                                        x: Object.keys(keyCounter), 
                                        y: Object.values(keyCounter),
                                        type: 'bar'
                                    }
                                ]} />
                            }
                        </div>
                        <div className="grid items-center col-span-1 overflow-hidden"> 
                            {topArtists && topArtists.map((artist, item)=>(
                                <p className="text-2xl font-medium" key={item}> {item+1}). {artist[0]} </p>))}
                        </div>
                        <div className="col-span-1 overflow-hidden">
                            {modeCounter && 
                                <Plot style={{width: "33vw",height:"50vh"}} layout={{title: "Modes"}} data={[
                                    {
                                        label: Object.keys(modeCounter), 
                                        values: Object.values(modeCounter),
                                        type: 'pie'
                                    }
                                ]}/>
                            }
                        </div>
                        </div>
                        <div className="grid grid-cols-3 justify-items-center overflow-hidden gap-y-4"> 
                        <div className="grid items-center col-span-1"> 
                            {/* Need to include topGenres && because it ensures the value is not null */}
                            {topGenres && topGenres.map((genre, item)=>(
                                <p className="text-2xl font-medium" key ={item}> {item+1}). {genre[0].charAt(0).toUpperCase() + genre[0].slice(1)} </p>))}
                        </div>
                        <div>
                            {bpmRangeCounter && 
                                <Plot style={{width: "33vw",height:"50vh"}} data={[
                                    {
                                        labels: bpmRangeCounter.map(bpm => bpm[0]), 
                                        values: bpmRangeCounter.map(bpm => bpm[1]),
                                        type: 'pie',
                                    }
                                ]}/>
                            }
                        </div>
                        <div>
                            {keySignatureCounter && 
                                <Plot style={{width: "33vw",height:"50vh"}} data={[
                                    {
                                        x: keySignatureCounter.map(ks => ks[0]), 
                                        y: keySignatureCounter.map(ks => ks[1]),
                                        type: 'bar',
                                    }
                                ]}/>
                            }
                        </div>
                        </div>
                        
                    </div> 
            </div>
        </div>
    )
}

export default Home