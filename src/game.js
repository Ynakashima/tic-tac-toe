// import Player from 'player';
// import Board from 'board';
//
//
// var Game = function () {
//   // for each game, we make two players
//   this.player1 = new Player();
//   this.player1.mark = "X";
//   this.player2 = new Player();
//   this.player2.mark = "O";
//
//   this.board = new Board();
//
//   //starting game with turn being equal to player 1 (X)
//   this.turn = this.player1;
//   this.winner = undefined;
// };
//
// Game.prototype.toggleTurn = function () {
//   if (this.turn == this.player1) {
//     this.turn = this.player2;
//   } else if (this.turn == this.player2) {
//     this.turn = this.player1;
//   }
//   return this.turn;
// };
//
// Game.prototype.gameOver = function () {
//   for (var i = 0; i < this.board.positions.length; i++) {
//     if(this.board.positions[i] == " "){
//       return false;
//     }
//   }
//   return true;
// };
//
// Game.prototype.winHorizontal = function () {
//   for(var i = 0; i < this.board.positions.length; i += 3){
//     if ((this.board.positions[i] == this.board.positions[i+1]) && (this.board.positions[i] == this.board.positions[i+2])){
//       if(this.board.positions[i] != " "){
//         this.winner = this.turn;
//         return true;
//       }
//     }
//   }
//   return false;
// };
//
// Game.prototype.winVertical = function () {
//   for(var i = 0; i < 3; i++) {
//     if((this.board.positions[i] == this.board.positions[i+3]) && (this.board.positions[i] == this.board.positions[i+6])) {
//       if(this.board.positions[i] != " ") {
//         this.winner = this.turn;
//         return true;
//       }
//     }
//   }
//   return false;
// };
//
// Game.prototype.winDiagonal = function () {
//   // both diagonals use index 4, so check to make sure that it's not an empty string, and if it is, return false
//   if(this.board.positions[4] == " "){
//     return false;
//   }
//
//   // this is the left to right diagonal
//   if((this.board.positions[0] == this.board.positions[4]) && (this.board.positions[0] == this.board.positions[8])) {
//     this.winner = this.turn;
//     return true;
//   }
//
//   // this is the right to left diagonal
//   if((this.board.positions[2] == this.board.positions[4]) && (this.board.positions[2] == this.board.positions[6])) {
//     this.winner = this.turn;
//     return true;
//   }
//   return false;
// };
//
// Game.prototype.gameWin = function () {
//   if(this.winVertical() || this.winHorizontal() || this.winDiagonal()) {
//     return true;
//   } else {
//     return false;
//   }
// };
//
// Game.prototype.takeTurn = function (position) {
//   //this.turn is whose turn it is
//   this.board.markPlay(this.turn.mark, position);
//
//   //let that exception fly!
//   if (this.gameWin()) {
//     return this.winner;
//   } else if (this.gameOver()) {
//     return "gameOver";
//   } else {
//     this.toggleTurn();
//   }
// };
//
//
//
//
//
//
//
//
//
//
//
//
//
// export default Game;
