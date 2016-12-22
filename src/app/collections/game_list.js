import Backbone from 'backbone';
import Game from 'app/models/game';

var GameList = Backbone.Collection.extend({
  model: Game,
  url: 'http://localhost:3000/api/v1/games',
  parse: function(response) {
    console.log('>>>>>gamelist collection called');
    console.log(response);
    return response;
  },

  games: function() {
    for(var i = 0; i < this.response.length; i++) {
      console.log(this.response[i]);
    }
  }
});

export default GameList;
