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
    const graphInit = (windowWidth > 768 ? ["100%", "100%"] : ["100%", "100%"])
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
                setGraphSize(["100%", "100%"])
            }
            else {
                setGraphSize(["100%", "100%"])
            }
        }
        
    }, [windowWidth])

    return (
        <div className="flex flex-col bg-[#191414] h-[100vh] w-[100vw] justify-center items-center">
        <div className="flex flex-col justify-center items-center h-[100%] w-[80%]"> 
        <div className="flex w-full justify-center items-center pt-3"> 
           <h2 className="text-jakarta font-bold text-white text-3xl"> Billboard Top 100 </h2>
        </div>
        <div className="flex w-full justify-center items-center pt-3 pb-3"> 
            <input placeholder="Sorry, this search bar currently doesn't work. Try again later!" className="rounded-lg w-3/4 h-10 text-jakarta font-semibold m-4" type="text"/>
        </div>
        <div className="grid grid-rows-2 grid-cols-3 grid grid-flow-row-dense gap-4 h-[100%] w-[100%]">
                    {/* <div className="justify-items-center"> */}
                    <div className="col-span-1 bg-[#4B4848] rounded-lg">
                        {keyCounter && 
                            <Plot className="font-semibold tracking-wide" config={{'displayModeBar': false}} useResizeHandler={true} style={{width: graphSize[0], height: graphSize[1]}} 
                            layout={
                                {title: "<b> Keys </b>", 
                                paper_bgcolor:'rgba(0,0,0,0)', 
                                plot_bgcolor:'rgba(0,0,0,0)',
                                font:{
                                    family: 'Plus Jakarta Sans',
                                    color: 'white',
                                },
                                colorway: ['#1DB954']
                                
    
                            }
                            } 
                            data={[
                                {
                                    x: Object.keys(keyCounter), 
                                    y: Object.values(keyCounter),
                                    type: 'bar'
                                }
                            ]} />
                        }
                    </div>
                    <div className="flex font-jakarta justify-center col-span-1 items-center bg-[#4B4848] rounded-lg m-0.25"> 
                        <div>
                        {topArtists && topArtists.map((artist, item)=>(
                            <p className="text-white text-2xl font-semibold m-3" key={item}> {item+1}). {artist[0]} </p>))}
                        </div> 
                    </div>
                    <div className="flex justify-center items-center col-span-1 bg-[#4B4848] rounded-lg m-0.25">
                        {modeCounter && 
                            <Plot className="font-semibold tracking-wide" config={{'displayModeBar': false}} useResizeHandler={true} style={{width: graphSize[0], height: graphSize[1]}} 
                            layout={
                                {title: "<b> Modes </b>", 
                                paper_bgcolor:'rgba(0,0,0,0)', 
                                plot_bgcolor:'rgba(0,0,0,0)',
                                font:{
                                    family: 'Plus Jakarta Sans',
                                    color: 'white',
                                },
                                colorway: ['#1DB954', '#6FF29D','#26F06D','#347049','#1EBD56']   
                            }
                            } 
                            data={[
                                {
                                    label: Object.keys(modeCounter), 
                                    values: Object.values(modeCounter),
                                    type: 'pie'
                                }
                            ]}/>
                        }
                    </div>
                    {/* </div> */}
                    {/* <div className="justify-items-center overflow-hidden gap-y-4">  */}
                    <div className="flex font-jakarta justify-center col-span-1 grid items-center bg-[#4B4848] rounded-lg m-0.25 col-span-1"> 
                        <div>
                        {/* Need to include topGenres && because it ensures the value is not null */}
                        {topGenres && topGenres.map((genre, item)=>(
                            <p className="text-white text-2xl font-semibold m-3" key ={item}> {item+1}). {genre[0].charAt(0).toUpperCase() + genre[0].slice(1)} </p>))}
                        </div>
                    </div>
                    <div className="col-span-1 bg-[#4B4848] rounded-lg">
                        {bpmRangeCounter && 
                            <Plot className="font-semibold tracking-wide" 
                            layout={
                                {paper_bgcolor:'rgba(0,0,0,0)', 
                                plot_bgcolor:'rgba(0,0,0,0)', 
                                font:{
                                family: 'Plus Jakarta Sans',
                                color: 'white',
                                },
                                title: "<b>Bpm Ranges</b>",
                                colorway: ['#1DB954', '#6FF29D','#26F06D','#347049','#1EBD56']   
                                }
                            } 
                            config={{'displayModeBar': false}} useResizeHandler={true} style={{width: graphSize[0], height: graphSize[1]}} data={[
                                {
                                    labels: bpmRangeCounter.map(bpm => bpm[0]), 
                                    values: bpmRangeCounter.map(bpm => bpm[1]),
                                    type: 'pie',
                                }
                            ]}/>
                        }
                    </div>
                    <div className="col-span-1 bg-[#4B4848] rounded-lg m-0.25">
                        {keySignatureCounter && 
                            <Plot className="font-semibold tracking-wide" layout={
                                {
                                    paper_bgcolor:'rgba(0,0,0,0)', 
                                    plot_bgcolor:'rgba(0,0,0,0)', 
                                    font:{
                                    family: 'Plus Jakarta Sans',
                                    color: 'white',
                                    },
                                    title: "<b>Key Signatures</b>",
                                    colorway: ['#1DB954', '#6FF29D','#26F06D','#347049','#1EBD56'] 
                                }
                            } config={{'displayModeBar': false}} useResizeHandler={true} style={{width: graphSize[0], height: graphSize[1]}} data={[
                                {
                                    x: keySignatureCounter.map(ks => ks[0]), 
                                    y: keySignatureCounter.map(ks => ks[1]),
                                    type: 'bar',
                                }
                            ]}/>
                        }
                        </div>
                    </div>
                    {/* </div> */}
                    
                </div> 
        </div>
    )
}

export default Home