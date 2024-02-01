/* eslint-disable no-lonely-if */
/* eslint-disable complexity */
/* eslint-disable react/no-array-index-key */
/* eslint-disable canonical/filename-match-exported */
'use client';
import React, { useCallback, useEffect, useState } from 'react';

const words = [
  'abril',
  'amardeti',
  'camaymesa',
  'himalaya',
  'soñarte',
  'luzazul',
  'actofinal',
  'espacial',
  'quedate',
  'latregua',
  'sensible',
];

const WordSearch: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<
    Array<{ col: number; row: number }>
  >([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [gridSize, setGridSize] = useState({ cols: 10, rows: 10 });
  const [placedWords, setPlacedWords] = useState<string[]>([]); // New state variable
  const [showWords, setShowWords] = useState(false);
  const [wordPositions, setWordPositions] = useState<{
    [key: string]: Array<{ col: number; row: number }>;
  }>({});

  // Dynamically calculate grid size based on window size
  const calculateGridSize = useCallback(() => {
    const maxWidth = Math.min(window.innerWidth, 600);
    const maxHeight = Math.min(window.innerHeight, 600);
    const size = Math.min(maxWidth, maxHeight);
    const rowsCols = Math.floor(size / 44); // Ensure each box is at least 44px
    return { cols: rowsCols, rows: rowsCols };
  }, []);

  // eslint-disable-next-line no-console
  console.log('<<< grid size >>>', calculateGridSize, setGridSize);

  useEffect(() => {
    const initializeGrid = () => {
      const newGrid = Array.from({ length: gridSize.rows }, () =>
        Array.from({ length: gridSize.cols }, () => '.'),
      );

      const currentPlacedWords = []; // Local variable to store placed words for this render
      const localWordPositions: Record<
        string,
        Array<{ col: number; row: number }>
      > = {}; // Create a local copy of wordPositions

      let horizontalCount = 0;
      let verticalCount = 0;

      for (const word of words) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
          attempts += 1;

          let direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical

          // If the limit for a direction is reached, force the remaining words to be placed in the other direction
          if (horizontalCount >= 5) {
            direction = 1;
          } else if (verticalCount >= 5) {
            direction = 0;
          }

          const row = Math.floor(
            Math.random() *
              (gridSize.rows - (direction === 1 ? word.length : 0)),
          );
          const col = Math.floor(
            Math.random() *
              (gridSize.cols - (direction === 0 ? word.length : 0)),
          );
          const length = word.length;

          let canPlace = true;
          for (let index = 0; index < length; index++) {
            if (direction === 0) {
              // Horizontal placement
              if (newGrid[row][col + index] !== '.') {
                canPlace = false;
                break;
              }
            } else {
              // Vertical placement
              if (newGrid[row + index][col] !== '.') {
                canPlace = false;
                break;
              }
            }
          }

          if (canPlace) {
            for (let index = 0; index < length; index++) {
              if (direction === 0) {
                newGrid[row][col + index] = word[index];
                if (!localWordPositions[word]) {
                  localWordPositions[word] = [];
                }

                localWordPositions[word].push({ col: col + index, row });
              } else {
                newGrid[row + index][col] = word[index];
                if (!localWordPositions[word]) {
                  localWordPositions[word] = [];
                }

                localWordPositions[word].push({ col, row: row + index });
              }
            }

            placed = true;
            currentPlacedWords.push(word); // Add the word to the currentPlacedWords array

            // Increment the count for the direction in which the word was placed
            if (direction === 0) {
              horizontalCount += 1;
            } else {
              verticalCount += 1;
            }
          }
        }
      }

      // Fill the remaining cells with random letters
      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          if (newGrid[row][col] === '.') {
            let randomLetter;
            do {
              randomLetter = String.fromCodePoint(
                97 + Math.floor(Math.random() * 26),
              );
            } while (
              newGrid[row][col - 1] === randomLetter ||
              newGrid[row][col + 1] === randomLetter ||
              newGrid[row - 1]?.[col] === randomLetter ||
              newGrid[row + 1]?.[col] === randomLetter
            );

            newGrid[row][col] = randomLetter;
          }
        }
      }

      setGrid(newGrid);
      setPlacedWords(currentPlacedWords); // Set placedWords state variable to currentPlacedWords
      setWordPositions(localWordPositions); // Set wordPositions state variable to localWordPositions

      const parameters = new URLSearchParams(window.location.search);
      setShowWords(parameters.get('show') === 'true');
    };

    if (gridSize.rows > 0 && gridSize.cols > 0) {
      initializeGrid();
    }
  }, [gridSize]);

  // Mouse and touch event handlers to track word selection
  const handleMouseDown = (row: number, col: number) =>
    setSelectedCells([{ col, row }]);
  const handleMouseEnter = (row: number, col: number) => {
    if (selectedCells.length) {
      setSelectedCells((previous) => [...previous, { col, row }]);
    }
  };

  // Check if the selected cells match any of the words
  const checkSelection = useCallback(() => {
    const selectedWord = selectedCells
      .map(({ col, row }) => grid[row]?.[col])
      .join('');
    if (words.includes(selectedWord)) {
      const positions = wordPositions[selectedWord];
      if (
        positions.every((pos) =>
          selectedCells.some(
            (cell) => cell.row === pos.row && cell.col === pos.col,
          ),
        )
      ) {
        setFoundWords((previousWords) => [...previousWords, selectedWord]);
      }
    }
  }, [grid, selectedCells, wordPositions]);

  const handleMouseUp = () => {
    checkSelection();
    setSelectedCells([]);
  };

  console.log('<<< placed words >>>', placedWords);
  console.log('<<< word positions >>>', wordPositions);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="grid max-w-[600px] max-h-[600px] overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(44px, 1fr))`,
          height: `${Math.min(gridSize.rows * 44, 600)}px`,
          width: `${Math.min(gridSize.cols * 44, 600)}px`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              className={`text-4xl font-bold w-11 h-11 flex justify-center items-center select-none ${
                (showWords &&
                  placedWords.some(
                    (word) =>
                      wordPositions[word]?.some(
                        (pos) => pos.row === rowIndex && pos.col === cellIndex,
                      ),
                  )) ||
                foundWords.some(
                  (word) =>
                    wordPositions[word]?.some(
                      (pos) => pos.row === rowIndex && pos.col === cellIndex,
                    ),
                )
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500'
                  : 'bg-white'
              }`}
              key={`${rowIndex}-${cellIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              onTouchStart={() => handleMouseDown(rowIndex, cellIndex)}
              style={{
                lineHeight: '44px',
                minHeight: '44px',
                minWidth: '44px',
                userSelect: 'none',
              }}
            >
              {cell.toUpperCase()}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default WordSearch;
