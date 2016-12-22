
import Backbone from 'backbone';
import Board from 'app/models/board';
//may need to import board model

const Game = Backbone.Model.extend({
  defaults: {
    winner: undefined,
    isOver: false
  },

  url: 'http://localhost:3000/api/v1/games',
  parse: function(response) {
    console.log(response);
    return response;

  },

  toJSON : function() {
    console.log(">>>>" + this.board.positions);
    console.log(this.get("winner"));

    var object = {
      "board": this.board.positions,
      "players": ["X Player", "O Player"],
      "outcome": this.get("winner"),
    };
    console.log(object);
    return object;
  },

  initialize: function(options) {
    //for each game we make 2 players
    this.player1 = "X";
    this.player2 = "O";

    this.board = new Board();

    //starting game with turn being equal to player 1 (X)
    this.turn = this.player1;
  },

  toggleTurn: function () {
    if (this.turn == this.player1) {
      this.turn = this.player2;
    } else if (this.turn == this.player2) {
      this.turn = this.player1;
    }
    return this.turn;
  },

  gameOver: function () {
    for (var i = 0; i < this.board.positions.length; i++) {
      if(this.board.positions[i] == " "){
        return false;
      }
    }
    this.set({isOver: true});
    this.save();
    return true;
  },

  winHorizontal: function () {
    for(var i = 0; i < this.board.positions.length; i += 3){
      if ((this.board.positions[i] == this.board.positions[i+1]) && (this.board.positions[i] == this.board.positions[i+2])){
        if(this.board.positions[i] != " "){
          this.set("winner", this.turn);
          return true;
        }
      }
    }
    return false;
  },

  winVertical: function () {
    for(var i = 0; i < 3; i++) {
      if((this.board.positions[i] == this.board.positions[i+3]) && (this.board.positions[i] == this.board.positions[i+6])) {
        if(this.board.positions[i] != " ") {
          this.set("winner", this.turn);
          return true;
        }
      }
    }
    return false;
  },

  winDiagonal: function () {
    // both diagonals use index 4, so check to make sure that it's not an empty string, and if it is, return false
    if(this.board.positions[4] == " "){
      return false;
    }

    // this is the left to right diagonal
    if((this.board.positions[0] == this.board.positions[4]) && (this.board.positions[0] == this.board.positions[8])) {
      this.set("winner", this.turn);
      return true;
    }

    // this is the right to left diagonal
    if((this.board.positions[2] == this.board.positions[4]) && (this.board.positions[2] == this.board.positions[6])) {
      this.set("winner", this.turn);
      return true;
    }
    return false;
  },

  gameWin: function () {
    if(this.winVertical() || this.winHorizontal() || this.winDiagonal()) {
      this.set({isOver: true});
      console.log(this.get('isOver'));
      this.save();
      return true;
    } else {
      return false;
    }
  },

  takeTurn: function (position) {
    //this.turn is whose turn it is
    this.board.markPlay(this.turn, position);

    //let that exception fly!
    if (this.gameWin()) {
      return this.winner;
    } else if (this.gameOver()) {
      return "gameOver";
    } else {
      this.toggleTurn();
    }
  }



});
export default Game;
