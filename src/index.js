import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board(props) {


  return (
    <div>
      <div className="board-row">
        <Square value={props.squares[0]} onClick={() => props.onClick(0)} />
        <Square value={props.squares[1]} onClick={() => props.onClick(1)} />
        <Square value={props.squares[2]} onClick={() => props.onClick(2)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onClick={() => props.onClick(3)} />
        <Square value={props.squares[4]} onClick={() => props.onClick(4)} />
        <Square value={props.squares[5]} onClick={() => props.onClick(5)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onClick={() => props.onClick(6)} />
        <Square value={props.squares[7]} onClick={() => props.onClick(7)} />
        <Square value={props.squares[8]} onClick={() => props.onClick(8)} />
      </div>
    </div>
  );
}

function Game() {
  
  const [history, setHistory] = React.useState([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext,set_xIsNext] = React.useState(true);
  const [current, setCurrent] = React.useState();
  const [squares, setSquares] = React.useState();
  const [winner, setWinner] = React.useState(
    calculateWinner(current.squares)
    );
  let status;

  function handleClick(i) {

    setCurrent(history[history.length-1]);
    setSquares(current.squares.slice());
      
      if (calculateWinner(squares) || squares[i]) 
      {
        return;
      }
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      {
        history: history.concat(
          [{
            squares: squares
          }]
        )
      }
    );
    set_xIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
