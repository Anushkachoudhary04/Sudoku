import React from 'react'
import SudokuGrid from './Components/SudokuGrid'
import Timer from './Components/Timer'
import './App.css'

const App = () => {
  return (
    <div classname="App">
      <h1 className='heading'>Sudoku</h1>
      <Timer/>
      <SudokuGrid/>
      
    </div>
  )
}

export default App
