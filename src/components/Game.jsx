import React, { useRef, useState } from 'react';
import cross_icon from '/cross.png';
import circle_icon from '/circle.png';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || board[num] !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? 'x' : 'o';
    setBoard(newBoard);
    setCount(count + 1);

    const result = checkWin(newBoard);
    if (result) {
      setLock(true);
      if (result === 'draw') {
        titleRef.current.innerHTML = "It's a Draw!";
      } else {
        titleRef.current.innerHTML = `Congratulations: <img class="ml-4 items-center h-12 w-12" src=${result === 'x' ? cross_icon : circle_icon} />`;

      }
    }
  };

  const checkWin = (board) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];  // Return the winner ('x' or 'o')
      }
    }

    if (board.every(cell => cell)) {
      return 'draw';  // Return 'draw' if all cells are filled
    }

    return null;  // No winner yet and no draw
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span className="pl-[15px] text-[#26ffcb]">React</span>';
  };

  return (
    <div className="container text-center">
      <h1 ref={titleRef} className="title pt-[50px] text-[60px] text-white flex justify-center items-center">
        Tic Tac Toe Game In
        <span className="pl-[15px] text-[#26ffcb]">React</span>
      </h1>

      <div className="board">
        {board.map((cell, idx) => (
          <div
            key={idx}
            className={`box ${cell === 'x' ? 'cross' : 'circle'}`}
            onClick={(e) => toggle(e, idx)}
            style={{
              backgroundImage: cell ? `url(${cell === 'x' ? cross_icon : circle_icon})` : 'none',
              backgroundSize: '40%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        ))}
      </div>

      <div className="reset" onClick={resetGame}>
        Reset
      </div>
    </div>
  );
};

export default Game;
