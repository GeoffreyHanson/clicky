import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import friends from './friends.json'

function Card(props) {
  return (
    <img className='card' onClick={props.onClick} alt={props.name} src={props.image} />
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

    if (endGame(cards) || cards[i]) { // If the game is over or clicking on an already filled card.
      return this.setState({
        cards: Array(4).fill(null),
        score: this.state.score = 0, // eslint-disable-line
      });
    }

    cards[i] = 'X';

    return this.setState({
      cards: cards,
      score: this.state.score + 1,
    });
  }
  
  renderCard(i) {
    return (
      <Card 
        value={this.state.cards[i]} 
        onClick={() => this.handleClick(i)}
        image={friends[i].image}
        name={friends[i].name}
      />
    );
  }

  randomize() {
    let random = Math.floor((Math.random() * 3) + 1);
    console.log(random);
    return random;
  }

  render() {

    // Handling winner
    const winner = endGame(this.state);
    let status;
    winner ? status = 'You win!' : status = 'Your score: ' + (this.state.score);
    
    // RANDOMIZATION!!!
    let place0;
    let place1;
    let place2;
    let place3;
    if (this.state.score === 0) {
      place0 = this.renderCard(0);
      place1 = this.renderCard(1);
      place2 = this.renderCard(2);
      place3 = this.renderCard(3); 
    } 
    else if (this.state.score > 0) {
      place0 = this.renderCard(this.randomize());
      place1 = this.renderCard(this.randomize());
      place2 = this.renderCard(this.randomize());
      place3 = this.renderCard(this.randomize());
    }

    // At start, place0 = this.renderCard(0) in order for normal positions
    return (
      <div>
        <div className='score'>{status}</div>
        <div className='board-row'>
          {place0}
          {place1}
        </div>
        <div className='board-row'>
          {place2}
          {place3}
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