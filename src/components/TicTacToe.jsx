import { useEffect, useState } from "react";
import Box from "./Box";

const TicTacToe = () => {
  const [tictactoe, setT3] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [visible, setVisible] = useState(false);

  const checkWinner = () => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < wins.length; i++) {
      const win = wins[i];
      const [a, b, c] = win;
      if (
        tictactoe[a] !== "" &&
        tictactoe[a] == tictactoe[b] &&
        tictactoe[b] == tictactoe[c]
      ) {
        return tictactoe[a];
      }
    }
    return null;
  };

  const handleClick = (k) => {
    if (tictactoe[k] == "" && checkWinner() === null) {
      const copyt3 = [...tictactoe];
      copyt3[k] = turn;
      setT3(copyt3);
      if (turn == "X") {
        setTurn("O");
      } else {
        setTurn("X");
      }
    }
  };

  const newGame = () => {
    setTurn("X");
    setWinner(null);
    setT3(Array(9).fill(""));
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1500);
  }, []);

  useEffect(() => {
    const W = checkWinner();
    setWinner(W);
    let count = 0;
    for (let box in tictactoe) {
      if (tictactoe[box] !== "") {
        count++;
      }
    }

    if (count == tictactoe.length) {
      setWinner("Tie");
    }
  }, [tictactoe, winner]);

  return (
    <div className="h-full">
      {visible ? (
        <div>
          <p className="text-8xl text-center mb-14 title select-none">
            Tic Tac Toe
          </p>
          <div className="grid grid-cols-3 w-[600px] h-[600px] scale-[85%]">
            {tictactoe.map((t3, k) => {
              return (
                <Box
                  key={k}
                  num={k}
                  value={t3}
                  onClick={() => handleClick(k)}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-5">
            <p
              onClick={newGame}
              className="title text-4xl border-2 pb-2 px-4 border-yellow-200 text-center hover:bg-yellow-200 hover:text-black transition-all cursor-pointer"
            >
              New Game
            </p>
            {winner == "Tie" && (
              <p className="title text-4xl pb-2">!!It's a Tie</p>
            )}
            {winner && winner !== "Tie" && (
              <>
                <p className="xo text-5xl ms-56">{winner}</p>
                <p className="title text-4xl pb-2">:Winner</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-8xl title select-none">Tic Tac Toe</p>
      )}
    </div>
  );
};

export default TicTacToe;
