import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

const ROWS = 15;
const COLS = 20;
const COLORS = ["#00FF00", "#00FFFF", "#FF00FF", "#FF4500", "#1E90FF", "#FFD700"];

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(false))
  );
  const [color, setColor] = useState(COLORS[0]);
  const dropCountRef = useRef(0);

  // animateDrop must be defined before useCallback
  const animateDrop = useCallback((col, row = 0) => {
    if (row >= ROWS) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = true;
      return newGrid;
    });

    setTimeout(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => [...r]);
        newGrid[row][col] = false;
        return newGrid;
      });
    }, 400);

    setTimeout(() => animateDrop(col, row + 1), 60);
  }, []);

  const startNewDrop = useCallback(() => {
    const col = Math.floor(Math.random() * COLS);
    animateDrop(col);
    dropCountRef.current++;

    if (dropCountRef.current % 30 === 0) {
      setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
  }, [animateDrop]);

  useEffect(() => {
    const interval = setInterval(() => {
      startNewDrop();
    }, 120);
    return () => clearInterval(interval);
  }, [startNewDrop]);

  return (
    <div className="game-container">
      <h1 className="title">Rainfall-Grid</h1>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell ? "active" : ""}`}
              style={{ backgroundColor: cell ? color : "#0a0a0a" }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
