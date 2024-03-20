import React, {} from 'react'
import Square from './Square';

export default class Board extends React.Component {
    constructor(props){
      super(props);
      this.state ={ squares: Array(9).fill(null), xIsNext:true, history: [] };

    }
  
    renderSquare(i) {
      return (
      <Square
       value ={this.state.squares[i]} abc={() => this.handleClick(i)} 
        />
        );
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) return;
  
      squares[i] = this.state.xIsNext ? 'X' : 'O';
  
      const winner = calculateWinner(squares);
      if (winner) {
        this.props.onWinner(winner);
      }
      
      const history = this.state.history.slice();
      history.push(squares.slice());
  
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        history: history,
      });
     

    }
    checkDraw() {
      const { board } = this.state;
      if (board.every(square => square !== null)) {
        return true; 
      }
      return false; 
    }

    resetBoard() {
        this.setState({
          squares: Array(9).fill(null),
          xIsNext: true,
          history:[],
        });
      }

      rollBackPlay() {
        const history = this.state.history.slice();
        if (history.length === 0) return;
       
        if (history.length === 1) {
          
      this.setState({
        squares: Array(9).fill(null), 
        xIsNext: true,
        history: [],
      });
    
    } else {
      history.pop(); 
      const lastPlay = history[history.length - 1];
      this.setState({
        squares: lastPlay.slice(), 
        xIsNext: !this.state.xIsNext,
        history: history,
      });
     
    }
    }
      
    render() {
      const winner = calculateWinner(this.state.squares); // O, X, null
      let status= "";
      if (winner) status = 'Winner ' + winner;
      else if(this.state.history.length >8 && winner === null)
      status = "It's a draw. Play again."
      else{
      status = this.state.xIsNext ? 'Next player: X': 'Next player: O'; // status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
      }
      
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

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
