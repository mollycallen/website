import './App.css';
import { useState, createContext } from 'react';
import Header from './components/Header';
import About from './components/About';
import RightRail from './components/RightRail';
import Games from './components/Games';
import Tools from './components/Tools';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Recipe from './components/Recipe';

export const DisplayContext = createContext();

function App() {
  const [showAbout, setShowAbout] = useState(true);
  const [showNews, setShowNews] = useState(true);

  return (
    <DisplayContext.Provider value={[showAbout, setShowAbout, showNews, setShowNews]}>
      <Router >
        <div className="App">
          <Header />

          <div className="main-container">
            <section className='left-side'>
              <News></News>
              <About></About>
              <Recipe></Recipe>
              <Routes >
                <Route path="/" element={<></>} />
                <Route path="/website/about" element={< About />} />
                <Route path="/website/recipe" element={< Recipe />} />
                <Route path="/website/games" element={< Games />} />
                <Route path="/website/tools" element={< Tools />} />
              </Routes>
            </section>
            <section className='right-side'>
              <RightRail />
            </section>

          </div>
        </div>
      </Router>
    </DisplayContext.Provider >
  )
}

export default App;
