import {useEffect, useState} from 'react'


const Home = () => {
    const [billboardData, setBillboardData] = useState(null)

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
    return (
        <div className="home">
            <div className="songs">
                {billboardData && billboardData.map((data, index)=>(
                    <div key={data._id}>
                        <p> {data.topGenres} </p>
                        <p> {data.topArtists} </p>
                        <p> {data.bpmRangeCounter} </p>
                    </div> 

                ))}
            </div>
        </div>
    )
}

export default Home