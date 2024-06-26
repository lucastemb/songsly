import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import AlbumAnalysis from './pages/AlbumAnalysis'
import Login from './pages/Login'




function App() {
  const [uri, setUri] = useState("")
  const [accessToken, setAccessToken] = useState()
  return (
    <div className="App">
        <div className ="pages">
          <BrowserRouter>
            <Routes>
              <Route path ="/" element={<Login/>}/>
              <Route path ="/home" element={<Home setUri={setUri} setAccessToken={setAccessToken} />}/>
              <Route path="/album" element={<AlbumAnalysis uri={uri} accessToken={accessToken}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
