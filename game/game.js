Game = new Mongo.Collection("game");

if (Meteor.isServer) {
  Meteor.methods({
    init_game: function () {
      var game_id = Game.insert({
        game_started: false,
        players: 0,
        turn_count: 0,
        turn_maximum: 10
      });
      Meteor.call('init_players', game_id);
    },
    
    quit_games: function () {
      Game.remove({});
      Modules.remove({});
      Crises.remove({});
    }
  });
}

if (Meteor.isClient) {
  Template.game.helpers({
//     game: function () {
//       return Game.findOne({
//         game: global_settings.game_id
//       });
//     },
    game_started: function () {
      var player_id = Session.get('player_id');
      if (player_id) {
        var player = Players.findOne(player_id);
        if (player) {
          var game = Game.findOne(player.game);
          if (game) {
            return game.game_started;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
  });
  
  Template.game.events({
    "click .reset_game": function () {
      Meteor.call('quit_games');
      Meteor.call('reset_players');
      Session.set('message', '');
    }
  });
}