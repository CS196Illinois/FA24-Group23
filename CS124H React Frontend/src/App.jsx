import { useState } from 'react'
import './App.css'
import GameInterface from './components/GameInterface'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories.jsx';
import Difficulty from './components/Difficulty.jsx';
import Game from './components/Game.jsx';
import Logos from './components/Logos.jsx';
import Categories1 from './components/Categories1.jsx';

function App() {


  return (
    <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<GameInterface />} />
                    <Route path="/categories" element={<Categories1 />} />
                    <Route path="/difficulty" element={<Difficulty />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/logos" element={<Logos />} />
                </Routes>
            </div>
        </Router>
  )
}

export default App
