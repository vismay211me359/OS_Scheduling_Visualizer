import React from 'react'
import Navbar from './components/Navbar'
import InputScreen from './screens/InputScreen'

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className='flex-none'>
        <Navbar />
      </div>
      <div className='flex-grow overflow-y-auto'>
        <InputScreen />
      </div>
    </div>
  )
}

export default App
