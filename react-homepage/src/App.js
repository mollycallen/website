import './App.css';
import Header from './components/Header';
import About from './components/About';
import RightRail from './components/RightRail';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router >
      <div className="App">
        <Header />

        <div className="main-container">
          <section className='left-side'>
            <Routes >
              <Route path="/" exact element={< About />} />

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
