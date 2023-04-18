import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'

function App() {
  const [openLogin, setOpenLogin] = useState(false)
  return (
    <div className='App'>
      <Router>
        <Header openLogin={setOpenLogin} />
        {openLogin ? <Login closeLogin={setOpenLogin} /> : <></>}
      </Router>
    </div>
  )
}

export default App
