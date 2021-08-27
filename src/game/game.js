import React, { useState } from 'react';
import Board from './board';
import CalculateWinner from './calculateWinner';
import './game.css';
const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const handleClick = (i) => {
        const his = history.slice(0, stepNumber + 1);
        const current = his[his.length - 1];
        const squares = current.squares.slice();
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        const newsquares = { squares: squares };
        setHistory([...his, newsquares]);
        setStepNumber(his.length);
        setXIsNext(!xIsNext);
    };
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }
    const moves = history.map((step, move)=> {
        const decs = move ?
            'Go to move#' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{decs}</button>
            </li>
        );
    });
    
    const current = history[stepNumber];
    const winner = CalculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'winner' + winner;
    } else {
        status = 'Next player :' + (xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default Game;

