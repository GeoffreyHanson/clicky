import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import friends from './friends.json'

function Card(props) {
  return (
    // No need for arrow function, because `this` is not needed in a function component
    // <button className="card" onClick={props.onClick}> 
    //   <img alt={props.name} src={props.image} />
    // </button>

    // This actually works with the images.
    <img className='card' onClick={props.onClick}  alt={props.name} src={props.image} />
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Array(4).fill(null),
      score: 0,
      won: false,
      friends,
    };
  }
  
  handleClick(i) {
    const cards = this.state.cards.slice(); // .slice() to make a copy for immutability
    // ???
    if (endGame(cards) || cards[i]) { // If the game is over or clicking on an already filled card.
    // if (endGame(cards)) {
      // If resetting the score, is return needed?
      return this.setState({
        cards: Array(4).fill(null),
        score: this.state.score = 0, // eslint-disable-line
      });

      // return this.setState({
      //   cards: cards, // Refreshes the cards
      //   score: this.state.score = 0,
      // });
    }

    // else if (cards[i]) {
    //   return this.setState({
    //     cards: Array(4).fill(null),
    //     score: this.state.score = 0,
    //   });
    // }
    
    // If state is won, will not fill again.
    // cards[i] = this.state.won ? null : 'X'; // Fill an X on cards[i], prevents filling after

    cards[i] = 'X';

    this.setState({
      // this is where randomization should go
      cards: cards,
      score: this.state.score + 1,
      // xIsNext: !this.state.xIsNext,
    });
  }
  
  renderCard(i) {
    return (
      // <Card 
      // value={this.state.cards[i]} 
      // onClick={() => this.handleClick(i)}
      // />
      
      
        <Card 
          value={this.state.cards[i]} 
          onClick={() => this.handleClick(i)}
          image={friends[i].image}
          name={friends[i].name}
        />
    );
  }

  render() {
    // const status = (this.state.won ? 'You win!' : this.state.score);
    // const status = (this.state.xIsNext ? 'X' : 'O');

    // Handling winner
    const winner = endGame(this.state);
    let status;
    if (winner) {
      status = 'You win!';
    } else {
      status = 'Your score: ' + (this.state.score);
    }

    return (
      <div>
        <div className='score'>{status}</div>
        <div className='board-row'>
          {this.renderCard(0)}
          {this.renderCard(1)}
        </div>
        <div className='board-row'>
          {this.renderCard(2)}
          {this.renderCard(3)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function endGame(cards) { // need to pass cards as an argument? 
  // Yes, otherwise score is not defined.
  if (cards.score > 3) {
    return cards.won = true; // need return?
  }
  return null;
}