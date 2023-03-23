import './App.css';
import Header from './components/Header';
import About from './components/About';
import RightRail from './components/RightRail';
import Games from './components/Games';
import Tools from './components/Tools';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router >
      <div className="App">
        <Header />

        <div className="main-container">
          <section className='left-side'>
            <News></News>
            <Routes >
              <Route path="/" exact />
              <Route path="/about" element={< About />} />
              <Route path="/games" element={< Games />} />
              <Route path="/tools" element={< Tools />} />
            </Routes>
          </section>
          <section className='right-side'>
            <RightRail />
          </section>

        </div>
      </div>
    </Router>
  );
}

export default App;
