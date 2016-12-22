import $ from 'jquery';
import Backbone from 'backbone';
import Game from 'app/models/game';

const GameListView = Backbone.View.extend({
  initialize: function(options) {
    games = this.model.parse();
    console.log(this.model);
  },
  // render: function() {
  //   var gamerecord = this.$('#games');
  //
  // }
});
