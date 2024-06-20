
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import './SudokuGrid.css'

const initialGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

const SudokuGrid = () => {
    const [grid,setGrid] = useState(initialGrid);
    const [showConfetti, setShowConfetti] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const handleInputChange= (row,col,value)=>{
      if (wrongAttempts >= 3) {
        return; // Game over, no more inputs allowed
      }
      const newGrid = grid.map((r, rowIndex) =>
        r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
      );
      setGrid(newGrid);

      if (isValidMove(row, col, value, newGrid)) {
        toast.success('Correct number!');
      } else {
        toast.error('Wrong number!');
        setWrongAttempts(prev => prev + 1);
      }
  
      if (checkWin(newGrid)) {
        setShowConfetti(true);
        toast.success('Congratulations, you won!');
      }
      if (wrongAttempts + 1 >= 3) {
        toast.error('Game Over! Too many wrong attempts.', 'error');
      }
    };
    const isValidMove = (row, col, value, newGrid) => {
      // Check row
      for (let c = 0; c < 9; c++) {
        if (newGrid[row][c] === value && c !== col) return false;
      }
      // Check column
      for (let r = 0; r < 9; r++) {
        if (newGrid[r][col] === value && r !== row) return false;
      }
      // Check 3x3 box
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (newGrid[r][c] === value && (r !== row || c !== col)) return false;
        }
      }
      return true;

    };
    const checkWin = (newGrid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (newGrid[row][col] === 0) return false;
          if (!isValidMove(row, col, newGrid[row][col], newGrid)) return false;
        }
      }
      return true;
    };

  return (
    <div>
      <div className="sudoku-grid">
        {grid.map((row,rowIndex)=>(
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell,colIndex)=>(
              <input type="number" key={colIndex}  min="1" max="9" value={cell || ''}
              onChange={(e) => handleInputChange(rowIndex, colIndex, parseInt(e.target.value))} />
             
            ))}

          </div>
        ))}
      </div>
      {showConfetti && <Confetti />}
      <ToastContainer />

      
    </div>

  )
}

export default SudokuGrid
