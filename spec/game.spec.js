import Game from 'app/models/game';
import Player from 'app/models/player';
import Board from 'app/models/board';

describe('Game', function(){
  describe('constructor', function() {
    it('should make a new game', function(){
      var game1 = new Game();
      expect(game1 instanceof Game).toBeTruthy();

      expect(game1.player1 instanceof Player).toBeTruthy();

      expect(game1.player1.mark).toEqual("X");

      expect(game1.player2 instanceof Player).toBeTruthy();

      expect(game1.player2.mark).toEqual("O");

      expect(game1.board instanceof Board).toBeTruthy();

      expect(game1.turn).toEqual(game1.player1);
    });
  });

  describe('toggleTurn', function() {
    var game2 = new Game();
    it('should switch to player2 after player1', function() {
      expect(game2.toggleTurn()).toEqual(game2.player2);
    });
  });

  describe('gameOver', function(){
    var game3 = new Game();
    game3.board.positions = ["O","X","X","X","X","O","O","O","X"];
    it('should return true if all positions are filled', function(){
      expect(game3.board.positions.length).toEqual(9);

      expect(game3.gameOver()).toBeTruthy();
    });

    it('should return false if any positions are empty string', function(){
      game3.board.positions[1] = " ";

      expect(game3.gameOver()).toBeFalsy();
    });
  });

  describe('winHorizontal', function(){
    var game4 = new Game();
    it('should return false if matches are empty strings', function(){
      expect(game4.winHorizontal()).toBeFalsy();
    });

    it('should return true if there is a horizontal win in the first row', function(){
      game4.board.positions = ["X","X","X","O"," ","O","O","O","X"];
      expect(game4.winHorizontal()).toBeTruthy();
      expect(game4.winner).toEqual(game4.player1);
    });

    it('should return true if there is a horizontal win in the second row', function(){
      game4.board.positions = ["X","X"," ","O","O","O","X"," ","X"];
      game4.turn = game4.player2;
      expect(game4.winHorizontal()).toBeTruthy();
      expect(game4.winner).toEqual(game4.player2);
    });

    it('should return true if there is a horizontal win in the third row', function(){
      game4.board.positions = ["X","X","O","O"," ","O","X","X","X"];
      game4.turn = game4.player1;
      expect(game4.winHorizontal()).toBeTruthy();
      expect(game4.winner).toEqual(game4.player1);
    });

    it('should return false if there is no horizontal win yet', function (){
      game4.board.positions = ["X"," "," ","O"," "," "," "," "," "];
      expect(game4.winHorizontal()).toBeFalsy();
    });
  });

  describe('winVertical', function() {
    var game5 = new Game();
    it('should return false if matches are empty strings', function(){
      expect(game5.winVertical()).toBeFalsy();
    });

    it('should return true if there is a vertical win in the first column', function(){
      game5.board.positions = ["X"," ","X","X"," ","O","X","O","X"];
      game5.turn = game5.player1;
      expect(game5.winVertical()).toBeTruthy();
      expect(game5.winner).toEqual(game5.player1);
    });

    it('should return true if there is a vertical win in the second column', function(){
      game5.board.positions = [" ","X"," ","O","X","O","O","X"," "];
      game5.turn = game5.player1;
      expect(game5.winVertical()).toBeTruthy();
      expect(game5.winner).toEqual(game5.player1);
    });

    it('should return true if there is a vertical win in the third column', function(){
      game5.board.positions = [" "," ","X","O"," ","X","O","O","X"];
      game5.turn = game5.player1;
      expect(game5.winVertical()).toBeTruthy();
      expect(game5.winner).toEqual(game5.player1);
    });

    it('should return false if there is no vertical win yet', function (){
      game5.board.positions = ["X"," "," ","O"," "," "," "," "," "];
      expect(game5.winVertical()).toBeFalsy();
    });
  });

  describe('winDiagonal', function(){
    var game5 = new Game();
    it('should return false if matches are empty strings', function(){
      expect(game5.winDiagonal()).toBeFalsy();
    });

    it('should return true if there is a diagonal win left to right', function(){
      game5.board.positions = ["X"," ","O","X","X","O","X","O","X"];
      game5.turn = game5.player1;
      expect(game5.winDiagonal()).toBeTruthy();
      expect(game5.winner).toEqual(game5.player1);
    });

    it('should return true if there is a diagonal win right to left', function(){
      game5.board.positions = [" ","X","O","O","O","X","O","X"," "];
      game5.turn = game5.player2;
      expect(game5.winDiagonal()).toBeTruthy();
      expect(game5.winner).toEqual(game5.player2);
    });

    it('should return false if there is no diagonal win yet', function (){
      game5.board.positions = ["X"," "," ","O"," "," "," "," "," "];
      expect(game5.winDiagonal()).toBeFalsy();
    });
  });

  describe('gameWin', function(){
    var game6 = new Game();
    it('should return false at game start', function(){
      expect(game6.gameWin()).toBeFalsy();
    });

    it('should return true if a win in any direction', function(){
      game6.board.positions = ["X","X","O","O"," ","O","X","X","X"];
      expect(game6.gameWin()).toBeTruthy();

      game6.board.positions = [" "," ","X","O"," ","X","O","O","X"];
      expect(game6.gameWin()).toBeTruthy();

      game6.board.positions = [" ","X","O","O","O","X","O","X"," "];
      expect(game6.gameWin()).toBeTruthy();
    });
  });

  describe('takeTurn', function(){
    var game = new Game();

    it('should throw an error if the position is not valid', function(){
      game.board.positions[0] = "X";
      expect(function(){
        game.takeTurn(0);}).toThrow(new Error('that position is already taken'));
    });

    it('should return the winner if someone won', function(){
      game.board.positions = [" "," "," ","O"," ","X","O","O","X"];
      expect(game.takeTurn(2)).toEqual(game.player1);
    });

    it('should return gameOver if no one wins', function(){
      game.board.positions = ["O","X","X","X","X","O","O","O"," "];
      expect(game.takeTurn(8)).toEqual("gameOver");
    });

    it('should toggle the turn if nobody won and game is not over', function(){
      game.board.positions = ["X"," "," ","O"," "," "," "," "," "];
      expect(game.turn).toEqual(game.player1);
      game.takeTurn(2);
      expect(game.board.positions).toEqual(["X"," ","X","O"," "," "," "," "," "]);
      expect(game.turn).toEqual(game.player2);
    });
  });
});
