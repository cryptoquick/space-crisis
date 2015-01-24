Players = new Mongo.Collection("players");
Hands = new Mongo.Collection("hands");

if (Meteor.isServer) {
  Meteor.methods({
    new_players: function () {
      // Clear
      Players.remove({});
      Hands.remove({});
      
      // Add
      Players.insert({
        game: global_settings.game_id,
        character: 'Engineer',
        hand: 0,
        started: false
      });
    },
    start_game: function () {
      Game.update({
        game: global_settings.game_id
      }, {
        $set: {
          game_started: true
        }
      });
    }
  });
}

if (Meteor.isClient) {
  Template.start_screen.helpers({
    players: function () {
      return Players.find({
        game: 0
      });
    }
  });
  
  Template.start_player.events({
    "click button": function () {
      alert('You picked ' + this.character);
      Players.update(this._id, {
        $set: {
          started: true
        }
      });
    }
  });
}

if (Meteor.isClient) {
  Tracker.autorun(function () {
    var player_count = Players.find({
      game: global_settings.game_id,
      started: true
    }).count();

    console.log(player_count, global_settings.max_players);
    
    if (player_count === global_settings.max_players) {
      Meteor.call('start_game');
    }
  });
}
//   Meteor.call('new_game');
//   Meteor.call('new_cards');