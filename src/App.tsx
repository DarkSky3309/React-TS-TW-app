import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import BoardComponent from "./components/BoardComponent";

function App() {

  return (
    <div className="w-screen h-screen flex justify-center align-middle">
      <BoardComponent/>
    </div>
  )
}

export default App
