import { useEffect, useState } from "react";
import Box from "./Box";
import { O, X } from "./XO";
import { motion } from "framer-motion";

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
        if (tictactoe[a]=="X"){
          return <X scale={3} />
        } else {
          return <O scale={3} />
        }
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
        <div>
          <motion.p initial={{y:'35vh'}} animate={visible?{y:0}:{y:'35vh'}} className="text-8xl text-center mb-14 title select-none">
            Tic Tac Toe
          </motion.p>

          <motion.div initial={{opacity:0}} animate={visible?{opacity:1}:{opacity:0}} className="grid grid-cols-3 w-[600px] h-[600px] scale-[85%]">
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
          </motion.div>

          <motion.div initial={{opacity:0}} animate={visible?{opacity:1}:{opacity:0}} className="flex items-center justify-between mt-5">
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
                <p className="text-5xl ms-44">{winner}</p>
                <p className="title text-4xl pb-2">:Winner</p>
              </>
            )}
          </motion.div>

        </div>
    </div>
  );
};

export default TicTacToe;
