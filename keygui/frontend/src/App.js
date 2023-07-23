import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
        <div className ="pages">
          <BrowserRouter>
            <Routes>
              <Route path ="/" element={<Home/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
