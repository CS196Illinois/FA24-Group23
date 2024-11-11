import { useState } from 'react'
import './App.css'
import GameInterface from './components/GameInterface'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories.jsx';
import Difficulty from './components/Difficulty.jsx';
import Game from './components/Game.jsx';

function App() {


  return (
    <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<GameInterface />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/difficulty" element={<Difficulty />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </div>
        </Router>
  )
}

export default App
