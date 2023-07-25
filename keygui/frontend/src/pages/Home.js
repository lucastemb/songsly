import {useEffect, useState} from 'react'


const Home = () => {
    const [billboardData, setBillboardData] = useState(null)
    const [keyCounter, setKeyCounter] = useState(null)
    const [topGenres, setTopGenres] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    // const [bpmRangeCounter, setBpmRangeCounter] = useState(null)
    // const [keySigantureCounter, setKeySignatureCounter] = useState(null)
    // const [modeCounter, setModeCounter] = useState(null)

    useEffect(()=> {
        const fetchBillboardData = async () => {
            const response = await fetch('/home')
            const json = await response.json()

            if (response.ok){
                setBillboardData(json)
                console.log(json)
            }
        }
        fetchBillboardData()
    }, [])

    useEffect(() => {
        const setVars = async () => {
            setKeyCounter((billboardData[0]["keyCounter"]))
            setTopGenres((billboardData[0]["topGenres"]).map((genre)=> genre[0]))
            setTopArtists((billboardData[0]["topArtists"]).map((artist)=> artist[0]))
        }
        setVars()
    }, [billboardData])

    return (
        <div className="home">
            <div className="songs">
                {billboardData && billboardData.map((data)=>(
                    <div key={data._id}>
                        <p> {topGenres} </p>
                        <p> {topArtists} </p>
                        <p> {JSON.stringify(data.bpmRangeCounter)} </p>
                        <p> {JSON.stringify(keyCounter)} </p>
                        <p> {JSON.stringify(data.modeCounter)} </p>
                    </div> 

                ))}
            </div>
        </div>
    )
}

export default Home