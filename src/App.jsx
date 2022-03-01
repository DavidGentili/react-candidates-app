import { React, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SingleCandidate from './pages/SingleCandidate';

import api from './api';


function App() {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        api.data.fetch().then((data) => {
            setCandidates(data);
        } )
    },[])

    return (
        
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage candidates={candidates} setCandidates={setCandidates} />}/>
                    <Route path='/candidate/:id' element={<SingleCandidate candidates={candidates} setCandidates={setCandidates} />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
