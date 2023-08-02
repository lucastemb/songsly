import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {SpotifyApiContext} from 'react-spotify-api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Home from './pages/Home'
import AlbumAnalysis from './pages/AlbumAnalysis'




function App() {
  const accessToken = "AQC12HuFfZiF5_bQnkwvJQwiLIVmhHPJO8SzWbcm6ofX1Q3UhBIJlLHFuU0uJFWJ3qb-2arFjzUSzXChbXfehP4IJYXmWtSLzIzCpw2FKz14uTu4NxjTXHwpcZli2LpPHPw"
  const [uri, setUri] = useState("")
  return (
    <div className="App">
        <div className ="pages">
          <SpotifyApiContext.Provider token={accessToken}>
          <BrowserRouter>
            <Routes>
              <Route path ="/" element={<Home setUri={setUri} />}/>
              <Route path="/album" element={<AlbumAnalysis uri={uri}/>}/>
            </Routes>
          </BrowserRouter>
          </SpotifyApiContext.Provider>
        </div>
    </div>
  );
}

export default App;
