import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import AlbumAnalysis from './pages/AlbumAnalysis'




function App() {
  const [uri, setUri] = useState("")
  return (
    <div className="App">
        <div className ="pages">
          <BrowserRouter>
            <Routes>
              <Route path ="/" element={<Home setUri={setUri} />}/>
              <Route path="/album" element={<AlbumAnalysis uri={uri}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
