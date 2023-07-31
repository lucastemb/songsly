import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Album from './pages/Album'

function App() {
  return (
    <div className="App">
        <div className ="pages">
          <BrowserRouter>
            <Routes>
              <Route path ="/" element={<Home/>}/>
              <Route path="/album" element={<Album/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
