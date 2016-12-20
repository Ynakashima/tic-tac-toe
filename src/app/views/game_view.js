import $ from 'jquery';
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
    this.listenTo(board, 'userPlay', this.turnPlay);
    // this.listenTo(this.model.on('change: isOver', this.showEnd, this));
    this.listenTo(this.model, 'change:isOver', this.showEnd);
    board.render();
  },

  render: function() {

    return this;
  },

  events: {
    'click button': 'restartGame'
  },

  turnPlay: function(options) {
    console.log('turnPlay called');
    console.log();
    if (this.model.winner === undefined){ this.model.takeTurn(JSON.parse(options.position));
    } else {
      console.log(this.model.winner);
    }
  },

  showEnd: function(options) {
    console.log('showEnd called');
    $('.end-of-game').fadeIn();
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
