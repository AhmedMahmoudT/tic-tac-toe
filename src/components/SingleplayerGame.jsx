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

const SingleplayerGame = () => {
  const [tictactoe, setT3] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [isComTurn, setIsComTurn] = useState(null);
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
        return tictactoe[a];
      }
    }
    return null;
  };

  const handleClick = (k) => {
    if (visible && tictactoe[k] == "" && checkWinner() === null) {
      const copyt3 = [...tictactoe];
      copyt3[k] = turn;
      setT3(copyt3);
      setIsComTurn(copyt3);
    }
  };

  const computerTurn = (t3) => {
  if (winner == null) {
    let availableMoves = [];
    for (let index = 0; index < t3.length; index++) {
      if (t3[index] === "") {
        availableMoves.push(index);
      }
    }

    if (availableMoves.length > 0) {
      const crypto = window.crypto || window.msCrypto; // Ensure compatibility
      const randomValues = new Uint32Array(1);
      crypto.getRandomValues(randomValues);

      const move = availableMoves[randomValues[0] % availableMoves.length];

      const newT3 = [...t3];
      newT3[move] = turn === "X" ? "O" : "X";
      setT3(newT3);

      console.log(availableMoves, move);
      setIsComTurn(null);
    }
  }
};


  useEffect(() => {
    if (isComTurn && checkWinner() === null) {
      computerTurn(isComTurn);
      console.log('test')
    }
  }, [isComTurn]);

  useEffect(() => {
    if (turn === "O") {
      setIsComTurn(Array(9).fill(""));
      console.log('test')
    }
  }, [turn]);

  // const scores = {
  //   X: -1,
  //   O: 1,
  //   tie: 0,
  // };

  // function bestMove(tictactoe) {
  //   // AI turn
  //   let bestScore = -Infinity;
  //   let moveIndex;
  //   for (let i = 0; i < tictactoe.length; i++) {
  //     // is spot available
  //     if (tictactoe[i] === null) {
  //       const t3Copy = [...tictactoe];
  //       t3Copy[i] = turn == "O" ? "X" : "O"; // AI
  //       let score = minimax(t3Copy, 0, false);
  //       if (score > bestScore) {
  //         bestScore = score;
  //         moveIndex = i;
  //       }
  //     }
  //   }
  //   return moveIndex;
  // }

  // function getBestScore(board, depth, isMax, player) {
  //   let bestScore = isMax ? -Infinity : Infinity;
  //   for (let i = 0; i < board.length; i++) {
  //     // is spot available
  //     if (board[i] === null) {
  //       const boardCopy = [...board];
  //       boardCopy[i] = player;
  //       let score = minimax(boardCopy, depth + 1, !isMax);
  //       bestScore = isMax
  //         ? Math.max(score, bestScore)
  //         : Math.min(score, bestScore);
  //     }
  //   }
  //   return bestScore;
  // }

  // function minimax(board, depth, isMax) {
  //   let result = checkWinner(board, () => {});
  //   if (result) {
  //     return scores[result];
  //   }

  //   if (isMax) {
  //     return getBestScore(board, depth, isMax, "O");
  //   } else {
  //     return getBestScore(board, depth, isMax, "X");
  //   }
  // }

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
      <div className="me-[700px]">
        {/* hange the ms (margin-start) once the hard mode is added */}
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
          <p className="ms-10">:You're</p>
        </motion.div>

        <div
          className="absolute left-10 bottom-14 text-5xl title mt-32 flex flex-col text-end"
        >
          <p>...This Computer is kinda dumb</p>
          <p>,don't worry though</p>
          <p>!<span className="font-black text-6xl">Hard</span> mode is coming soon</p>
          <p className="text-4xl mt-6">(😊 It'll be <span className="text-5xl font-black">S0</span> hard that you'll never win)</p>
        </div>

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
              <p className="text-5xl ms-44">{winner == "X" ? <X /> : <O />}</p>
              <p className="title text-4xl pb-2">:Winner</p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SingleplayerGame;
