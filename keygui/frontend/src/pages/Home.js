import {useEffect, useState} from 'react'
import Plot from 'react-plotly.js'


const Home = () => {
    const [topGenres, setTopGenres] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    const [keyCounter, setKeyCounter] = useState(null)
    const [bpmRangeCounter, setBpmRangeCounter] = useState(null)
    const [keySignatureCounter, setKeySignatureCounter] = useState(null)
    const [modeCounter, setModeCounter] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const graphInit = (windowWidth > 768 ? ["33vw", "50vh", true] : ["85vw", "50vh", false])
    const [graphSize, setGraphSize] = useState(graphInit)

    const detectWidth = () =>{
        setWindowWidth(window.innerWidth)
    }

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


    useEffect(()=> {
        window.addEventListener('resize', detectWidth)
        return()=> {
            window.removeEventListener('resize', detectWidth)
            if (windowWidth < 768){
                setGraphSize(["85vw", "50vh", false])
            }
            else {
                setGraphSize(["33vw","50vh", true])
            }
        }
        
    }, [windowWidth])

    return (
        <div className="home">
        <div className="songs">
                <div className="grid grid-rows-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center">
                    <div className="col-span-1 overflow-hidden">
                        {keyCounter && 
                            <Plot useResizeHandler={graphSize[2]} style={{width: graphSize[0], height: graphSize[1]}} layout={{title: "Keys"}} data={[
                                {
                                    x: Object.keys(keyCounter), 
                                    y: Object.values(keyCounter),
                                    type: 'bar'
                                }
                            ]} />
                        }
                    </div>
                    <div className="grid items-center col-span-1 overflow-hidden"> 
                        <div>
                        {topArtists && topArtists.map((artist, item)=>(
                            <p className="text-2xl font-medium m-3" key={item}> {item+1}). {artist[0]} </p>))}
                        </div> 
                    </div>
                    <div className="col-span-1 overflow-hidden">
                        {modeCounter && 
                            <Plot useResizeHandler={graphSize[2]} style={{width: graphSize[0], height: graphSize[1]}} layout={{title: "Modes"}} data={[
                                {
                                    label: Object.keys(modeCounter), 
                                    values: Object.values(modeCounter),
                                    type: 'pie'
                                }
                            ]}/>
                        }
                    </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center overflow-hidden gap-y-4"> 
                    <div className="grid items-center col-span-1"> 
                        <div>
                        {/* Need to include topGenres && because it ensures the value is not null */}
                        {topGenres && topGenres.map((genre, item)=>(
                            <p className="text-2xl font-medium m-3" key ={item}> {item+1}). {genre[0].charAt(0).toUpperCase() + genre[0].slice(1)} </p>))}
                        </div>
                    </div>
                    <div>
                        {bpmRangeCounter && 
                            <Plot useResizeHandler={graphSize[2]} style={{width: graphSize[0], height: graphSize[1]}} data={[
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
                            <Plot useResizeHandler={graphSize[2]} style={{width: graphSize[0], height: graphSize[1]}} data={[
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