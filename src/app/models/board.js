import Backbone from 'backbone';

const Board = Backbone.Model.extend({

  initialize: function(options) {
    this.positions = [];
    for(var i = 0; i < 9; i++){
      this.positions.push(" ");
    }
  },

  validPlay: function(position) {
    if (!(Number.isInteger(position))) {
      throw new Error('Input must be an integer between 0 and 8');
    } else if (this.positions[position] == " ") {
      return true;
    } else {
      return false;
    }
  },

  markPlay: function(mark, position) {
    if(position === undefined) {
      throw new Error('Wrong number of arguments');
    } else if(this.validPlay(position)) {
      this.positions[position] = mark;
      return position;
    } else {
      throw new Error('that position is already taken');
    }
  }
});

export default Board;
