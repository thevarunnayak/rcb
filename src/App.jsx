import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Squad from './components/Squad'
import Fixture from './components/Fixture'


const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/fixture" element={<Fixture />} />
      </Routes>
    </main>
  )
}

export default App