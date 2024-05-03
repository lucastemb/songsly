import {useState, useEffect} from 'react'
import axios from 'axios';


const useAuth = (code) => {

    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();


    useEffect(()=> {
        axios.post('https://us-central1-songsly-ec779.cloudfunctions.net/app/home/login', {
            code,
        }).then(res=> {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);

            console.log(res.data);
            window.history.pushState({}, null, "/")
        }).catch(()=> {
            window.location = "/"
        })
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn ) return 

        const interval = setInterval(()=>{
            axios.post("https://us-central1-songsly-ec779.cloudfunctions.net/app/home/refresh", {
                refreshToken,
            }).then(res=> {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            }).catch(()=> {
                window.location = "/"
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}

export default useAuth