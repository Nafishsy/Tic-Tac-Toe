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

  // alert(props);
  debugger
  
  // const [squares, setSquares] = React.useState(Array(9).fill(null));
  // const [xIsNext, set_xIsNext] = React.useState(true);
  
  
  // const winner = calculateWinner(squares);
  // let status;
  
  
  return (
    <div>
      {/* <div className="status">{status}</div> */}
      <div className="board-row">
        <Square value={props.squares[0]} onClick={() => props.onClick(0)}/>
        <Square value={props.squares[1]} onClick={() => props.onClick(1)}/>
        <Square value={props.squares[2]} onClick={() => props.onClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onClick={() => props.onClick(3)}/>
        <Square value={props.squares[4]} onClick={() => props.onClick(4)}/>
        <Square value={props.squares[5]} onClick={() => props.onClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onClick={() => props.onClick(6)}/>
        <Square value={props.squares[7]} onClick={() => props.onClick(7)}/>
        <Square value={props.squares[8]} onClick={() => props.onClick(8)}/>
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = React.useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, set_xIsNext] = React.useState(true);  
  const [stepNumber, setStepNumber] = React.useState(0);  
  const [current, setCurrent] = React.useState(history[history.length-1]);
  
  const winner = calculateWinner(current.squares);
  debugger
  let status;
  
  if(winner){
    status = 'Winner: ' + winner; 
  }else{
    status = "Next player:  "+ (xIsNext ? "X" : "O");
  }
  // console.log(current);
  React.useEffect(() => {
    debugger
    setCurrent(history[stepNumber])
    
  }, [history,stepNumber]); // Only re-run the effect if count changes

  const moves = history.map((step,move)=>{
    const desc = move ?
      'Go to move #' + move:
      'Go to game start';
      return(
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
  });

  function handleClick(i)
  {
    // const his = history;
    setHistory(history.slice(0,stepNumber+1));
    setCurrent(history[history.length-1]);
    const squares = current.squares.slice();
    
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    const x=history.concat([{squares: squares}]);
    setHistory(x)    
    // setCurrent(x[x.length-1]);
    setStepNumber(history.length);
    set_xIsNext(!xIsNext);
    debugger
    // setSquares(squares);
  }

  function jumpTo(step){
    setStepNumber(step);
    if(step%2)
    {
      set_xIsNext(0)
    }
    else{
      set_xIsNext(1)
    }
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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