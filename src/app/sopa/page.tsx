/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
/* eslint-disable complexity */
/* eslint-disable react/no-array-index-key */
/* eslint-disable canonical/filename-match-exported */
'use client';
import React, { useCallback, useEffect, useState } from 'react';

const words = [
  'camaymesa',
  'actofinal',
  'amardeti',
  'himalaya',
  'espacial',
  'latregua',
  'sensible',
  'luzazul',
  'soñarte',
  'quedate',
  'abril',
] as const;

type Word = {
  colors: {
    start: string;
    stop: string;
  };
};

type WordPosition = {
  col: number;
  direction: 'horizontal' | 'vertical';
  row: number;
};

type WordPositions = {
  [K in WordKeys]?: WordPosition[];
};

type WordKeys = (typeof words)[number];

const wordsMap: Record<WordKeys, Word> = {
  abril: {
    colors: {
      start: '#fcfbae',
      stop: '#ffddd2',
    },
  },
  actofinal: {
    colors: {
      start: '#f0c8ff',
      stop: '#f594bd',
    },
  },
  amardeti: {
    colors: {
      start: '#ffb59b',
      stop: '#ffef97',
    },
  },
  camaymesa: {
    colors: {
      start: '#e49cff',
      stop: '#ffe0ed',
    },
  },
  espacial: {
    colors: {
      start: '#f4f3a4',
      stop: '#9eee9a',
    },
  },
  himalaya: {
    colors: {
      start: '#6790e3',
      stop: '#b2ecf9',
    },
  },
  latregua: {
    colors: {
      start: '#4795e5',
      stop: '#86e17c',
    },
  },
  luzazul: {
    colors: {
      start: '#ffdda8',
      stop: '#90d289',
    },
  },
  quedate: {
    colors: {
      start: '#fcaecf',
      stop: '#ffddd2',
    },
  },
  sensible: {
    colors: {
      start: '#ff92c1',
      stop: '#7ce1b5',
    },
  },
  soñarte: {
    colors: {
      start: '#c5dee8',
      stop: '#f39ac0',
    },
  },
};

const getLinearGradient = (
  word: WordKeys,
  direction: 'horizontal' | 'vertical' | undefined = 'horizontal',
) => {
  return `linear-gradient(${direction === 'horizontal' ? '0deg' : '90deg'}, ${
    wordsMap[word].colors.start
  } 0%, ${wordsMap[word].colors.stop} 100%)`;
};

const CELL_SIZE = 44;

const WordSearch: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<
    Array<{ col: number; row: number }>
  >([]);
  const [foundWords, setFoundWords] = useState<WordKeys[]>([]);
  const [gridSize, setGridSize] = useState({ cols: 10, rows: 10 });
  const [placedWords, setPlacedWords] = useState<string[]>([]); // New state variable
  const [showWords, setShowWords] = useState(false);
  const [wordPositions, setWordPositions] = useState<WordPositions>({});

  const calculateGridSize = useCallback(() => {
    const maxWidth = Math.min(window.innerWidth, 600);
    const maxHeight = Math.min(window.innerHeight, 600);
    const longestWordLength = Math.max(...words.map((word) => word.length));
    const size = Math.min(maxWidth, maxHeight);
    const rowsCols = Math.floor(size / CELL_SIZE); // Ensure each box is at least 44px
    let cols = Math.max(rowsCols, longestWordLength);
    const rows = Math.max(rowsCols, longestWordLength);

    // Adjust cols if the total width of the grid would exceed the window width
    cols = Math.min(cols, Math.floor(window.innerWidth / CELL_SIZE));

    return { cols, rows };
  }, []);

  useEffect(() => {
    const calculatedGridSize = calculateGridSize();
    setGridSize(calculatedGridSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initializeGrid = () => {
      const newGrid = Array.from({ length: gridSize.rows }, () =>
        Array.from({ length: gridSize.cols }, () => '.'),
      );

      const currentPlacedWords = []; // Local variable to store placed words for this render
      const localWordPositions: WordPositions = {}; // Create a local copy of wordPositions

      let horizontalCount = 0;
      let verticalCount = 0;

      // Sort words by length, descending
      const sortedWords = [...words].sort((a, b) => b.length - a.length);

      for (const word of sortedWords) {
        let placed = false;
        let attempts = 0;

        if (word.length > gridSize.rows && word.length > gridSize.cols) {
          throw new Error(
            `The word "${word}" is too long to fit into the grid.`,
          );
        }

        while (!placed && attempts < 100) {
          attempts += 1;

          // Attempt to place words in the direction with fewer words
          let direction = horizontalCount < verticalCount ? 0 : 1; // 0 for horizontal, 1 for vertical

          const row = Math.floor(
            Math.random() *
              (gridSize.rows - (direction === 1 ? word.length - 1 : 0)),
          );
          const col = Math.floor(
            Math.random() *
              (gridSize.cols - (direction === 0 ? word.length - 1 : 0)),
          );

          const length = word.length;

          let canPlace = true;
          for (let index = 0; index < length; index++) {
            if (direction === 0) {
              // Horizontal placement
              if (
                newGrid[row][col + index] !== '.' &&
                newGrid[row][col + index] !== word[index]
              ) {
                canPlace = false;
                break;
              }
            } else {
              // Vertical placement
              if (
                newGrid[row + index][col] !== '.' &&
                newGrid[row + index][col] !== word[index]
              ) {
                canPlace = false;
                break;
              }
            }
          }

          if (!canPlace && horizontalCount !== verticalCount) {
            // If the word can't be placed in the direction with fewer words, try the other direction
            direction = 1 - direction;
            for (let index = 0; index < length; index++) {
              if (direction === 0) {
                // Horizontal placement
                if (
                  newGrid[row][col + index] !== '.' &&
                  newGrid[row][col + index] !== word[index]
                ) {
                  canPlace = false;
                  break;
                }
              } else {
                // Vertical placement
                if (
                  newGrid[row + index]?.[col] !== '.' &&
                  newGrid[row + index]?.[col] !== word[index]
                ) {
                  canPlace = false;
                  break;
                }
              }
            }
          }

          if (canPlace) {
            for (let index = 0; index < length; index++) {
              if (direction === 0) {
                // Horizontal placement
                newGrid[row][col + index] = word[index];

                if (!localWordPositions[word]) {
                  localWordPositions[word] = [];
                }

                localWordPositions[word]?.push({
                  col: col + index,
                  direction: 'horizontal',
                  row,
                });
              } else {
                // Vertical placement
                newGrid[row + index][col] = word[index];

                if (!localWordPositions[word]) {
                  localWordPositions[word] = [];
                }

                localWordPositions[word]?.push({
                  col,
                  direction: 'vertical',
                  row: row + index,
                });
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
      setWordPositions(localWordPositions); //

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
    if (words.includes(selectedWord as WordKeys)) {
      const positions = wordPositions[selectedWord as WordKeys];
      if (
        positions?.every((pos) =>
          selectedCells.some(
            (cell) => cell.row === pos.row && cell.col === pos.col,
          ),
        )
      ) {
        setFoundWords((previousWords) => [
          ...previousWords,
          selectedWord as WordKeys,
        ]);
      }
    }
  }, [grid, selectedCells, wordPositions]);

  const handleMouseUp = () => {
    checkSelection();
    setSelectedCells([]);
  };

  const cellBelongsToFoundWord = useCallback(
    (row: number, col: number) => {
      return foundWords.some(
        (word) =>
          wordPositions[word]?.some(
            (pos) => pos.row === row && pos.col === col,
          ),
      );
    },
    [foundWords, wordPositions],
  );

  const foundWordForCell = useCallback(
    (row: number, col: number) => {
      return foundWords.find(
        (word) =>
          wordPositions[word]?.some(
            (pos) => pos.row === row && pos.col === col,
          ),
      );
    },
    [foundWords, wordPositions],
  );

  const cellIsInWordPosition = useCallback(
    (row: number, col: number) => {
      return Object.values(wordPositions).some((positions) =>
        positions.some((pos) => pos.row === row && pos.col === col),
      );
    },
    [wordPositions],
  );

  const wordForCell = useCallback(
    (row: number, col: number) => {
      return Object.keys(wordPositions).find(
        (word) =>
          wordPositions[word as WordKeys]?.some(
            (pos) => pos.row === row && pos.col === col,
          ),
      );
    },
    [wordPositions],
  );

  const getColorForCell = useCallback(
    (rowIndex: number, cellIndex: number) => {
      if (
        cellBelongsToFoundWord(rowIndex, cellIndex) &&
        foundWordForCell(rowIndex, cellIndex)
      ) {
        const foundWord = foundWordForCell(
          rowIndex,
          cellIndex,
        ) as keyof typeof wordsMap;

        const direction = wordPositions[foundWord]?.[0].direction;

        return getLinearGradient(foundWord, direction);
      }

      if (showWords && cellIsInWordPosition(rowIndex, cellIndex)) {
        const foundWord = wordForCell(
          rowIndex,
          cellIndex,
        ) as keyof typeof wordsMap;

        const direction = wordPositions[foundWord]?.[0].direction;

        return getLinearGradient(foundWord, direction);
      }

      return 'white';
    },
    [
      cellBelongsToFoundWord,
      cellIsInWordPosition,
      foundWordForCell,
      showWords,
      wordForCell,
      wordPositions,
    ],
  );

  // console.log('<<< placed words >>>', placedWords);
  // console.log('<<< word positions >>>', wordPositions);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="grid max-w-[600px] max-h-[600px] overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(${CELL_SIZE}px, 1fr))`,
          height: `${Math.min(gridSize.rows * CELL_SIZE, 600)}px`,
          width: `${Math.min(gridSize.cols * CELL_SIZE, 600)}px`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            return (
              <div
                className="font-bold flex justify-center items-center select-none"
                key={`${rowIndex}-${cellIndex}`}
                onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                onTouchStart={() => handleMouseDown(rowIndex, cellIndex)}
                style={{
                  background: getColorForCell(rowIndex, cellIndex),
                  fontSize: `${CELL_SIZE * 0.9}px`,
                  lineHeight: `${CELL_SIZE}px`,
                  minHeight: `${CELL_SIZE}px`,
                  minWidth: `${CELL_SIZE}px`,
                }}
              >
                {cell.toUpperCase()}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default WordSearch;
