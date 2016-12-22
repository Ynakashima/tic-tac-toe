import Backbone from 'backbone';
import Game from 'app/models/game';

var GameList = Backbone.Collection.extend({
  model: Game,
  url: 'http://localhost:3000',
  parse: function(data) {
    console.log('>>>>>gamelist collection called');
    console.log(data.games);
    return data.games;

  }
});

export default GameList;
