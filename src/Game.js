import React, {} from 'react'
import Board from './Board';

export default class Game extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            player1Wins: 0,
            player2Wins: 0,
        };
    }
    
    
    handleWinner = (winner) => {
        if (winner === 'X') {
            this.setState((count) => ({
                player1Wins: count.player1Wins + 1,
            }));
        } else if (winner === 'O') {
            this.setState((count) => ({
                player2Wins: count.player2Wins + 1,
            }));
        }
    };
    
    handleNewRound = () => {
        this.boardRef.resetBoard();
    };
    
    handleRestartGame = () => {
        this.setState({
            player1Wins: 0,
            player2Wins: 0,
        });
        this.handleNewRound();
    };

    handleRollBackPlay = () => {
        this.boardRef.rollBackPlay();
    }

    handleEmptyHistory= (isEmpty) => {
        if(isEmpty){
            this.setState(Object.assign({}, this.state, {noMorePlay: isEmpty}));
        }
    }
    
    render() {
        return (
            <div className="game">
            <div className="game-board">
            <Board onWinner={this.handleWinner} ref={(board) => {this.boardRef = board;}} />
            </div>
            <div className="game-info">
            <div>Player X Wins: {this.state.player1Wins}</div>
            <div>Player O Wins: {this.state.player2Wins}</div>
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            
            <div> <button onClick={this.handleNewRound}>New Round</button> </div>
            <div><button onClick={this.handleRestartGame}>Restart Game</button>  </div>
            <div><button onClick={this.handleRollBackPlay}>RollBack</button>  </div>
            </div>
            </div>
            );
        }
    }
    