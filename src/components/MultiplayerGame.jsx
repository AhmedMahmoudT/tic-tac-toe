import { useEffect, useState } from "react";
import Box from "./Box";
import { O, X } from "./XO";
import { motion } from "framer-motion";
import {
  // DrawLine,
  HorizontalLine,
  RotatedLine,
  VerticalLine,
} from "./Line";

const MultiplayerGame = () => {
  const [tictactoe, setT3] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [visible, setVisible] = useState(false);
  const [gamesCount, setGamesCount] = useState(1);
  const [winLine, setWinLine] = useState(null);

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

  const checkWinner = () => {
    for (let i = 0; i < wins.length; i++) {
      const win = wins[i];
      const [a, b, c] = win;
      if (
        tictactoe[a] !== "" &&
        tictactoe[a] == tictactoe[b] &&
        tictactoe[b] == tictactoe[c]
      ) {
        setWinLine(checkWinLine(win));
        if (tictactoe[a] == "X") {
          return <X />;
        } else {
          return <O />;
        }
      }
    }
    return null;
  };

  const handleClick = (k) => {
    if (visible && tictactoe[k] == "" && checkWinner() === null) {
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
    setTurn(gamesCount % 2 == 0 ? "X" : "O");
    setWinner(null);
    setWinLine(null);
    setT3(Array(9).fill(""));
    setGamesCount(gamesCount + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1500);
  }, []);

  useEffect(() => {
    const W = checkWinner();
    if (!winner && W !== winner) {
      setWinner(W);
    }

    let count = 0;
    for (let box of tictactoe) {
      if (box !== "") {
        count++;
      }
    }

    if (count === tictactoe.length && !W) {
      setWinner("Draw");
    }
  }, [tictactoe]);

  const checkWinLine = (winIndex) => {
    switch (winIndex) {
      case wins[0]:
        return <HorizontalLine margin={"top-[96px]"} />;

      case wins[1]:
        return <HorizontalLine margin={"top-[296px]"} />;

      case wins[2]:
        return <HorizontalLine margin={"top-[497px]"} />;

      case wins[3]:
        return <VerticalLine margin={"left-[497px]"} />;

      case wins[4]:
        return <VerticalLine margin={"left-[296px]"} />;

      case wins[5]:
        return <VerticalLine margin={"left-[96px]"} />;

      case wins[6]:
        return <RotatedLine from={"left"} />;

      case wins[7]:
        return <RotatedLine from={"right"} />;

      default:
        // return <DrawLine />;
        return null;
    }
  };

  const showWinLine = () => {
    return winLine;
  };

  return (
    <div className="h-full">
      <motion.p
        initial={{ y: "350px" }}
        animate={visible ? { y: 0 } : { y: "350px" }}
        className="text-8xl text-center mb-14 title select-none"
      >
        <a href="/">Tic Tac Toe</a>
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        className="absolute left-20 flex text-6xl title items-center justify-center mt-5"
      >
        <div className="mt-5">{turn == "X" ? <X /> : <O />}</div>
        <p className="ms-10">:Turn</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        className="grid grid-cols-3 w-[600px] h-[600px] scale-[85%]"
      >
        {tictactoe.map((t3, k) => {
          return (
            <Box key={k} num={k} value={t3} onClick={() => handleClick(k)} />
          );
        })}
        {winner && showWinLine()}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        className="flex items-center justify-between mt-5"
      >
        <p
          onClick={newGame}
          className="title text-4xl border-2 pb-2 px-4 border-yellow-200 text-center hover:bg-yellow-200 hover:text-black transition-all cursor-pointer"
        >
          New Game
        </p>
        {winner == "Draw" && (
          <p className="title text-4xl pb-2">!!It's a Draw</p>
        )}
        {winner && winner !== "Draw" && (
          <>
            <p className="text-5xl ms-44">{winner}</p>
            <p className="title text-4xl pb-2">:Winner</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MultiplayerGame;
