import Backbone from 'backbone';
import Game from 'app/models/game';
import Board from 'app/models/board';
import BoardView from 'app/views/board_view';


const GameView = Backbone.View.extend({
  initialize: function(options) {
    var playBoard = this.model.board;

    var board = new BoardView({
      el: '.board',
      model: playBoard
    });

    board.render();
  },

  render: function() {

    return this;
  },

  events: {
    'click button': 'restartGame'
  },

  restartGame: function(event) {
    console.log('restartGame called');
    this.model.destroy();

  //   var boardList = new Board();
  //
  //   this.board = new BoardView({
  //     el: '.board',
  //     model: boardList
  //   });
  //
  //   this.board.render();
  //
  var game = new Game();
  var newGame = new GameView({
    el: '#game',
    model: game
  });
  newGame.render();
  }
});

export default GameView;
