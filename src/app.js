import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Game from 'app/models/game';
// import Board from 'app/models/board';
// import BoardView from 'app/views/board_view';
import GameView from 'app/views/game_view';
import GameList from 'app/collections/game_list';

$(document).ready(function(){
  var gamelist = new GameList();
  gamelist.fetch();
  console.log('>>>>>>gamelist.fetch called');
  console.log(gamelist.fetch());

  var game = new Game();
  var gameview = new GameView({
    el: '#game',
    model: game
  });

  gameview.render();
});
