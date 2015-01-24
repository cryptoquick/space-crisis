Game = new Mongo.Collection("game");

if (Meteor.isServer) {
  Meteor.methods({
    init_game: function () {
      // 1. Initialize the game state (turn number, which character the player is using)
      // 2. Initialize the player's skills based on their class.
      //    This list of AvailableSkills should then be the collection that is iterated through in cards.html
      
      Game.insert({
        game: global_settings.game_id,
        game_started: false,
        players: 0,
        turn_count: 0,
        turn_maximum: 10
      });
      
//       var player_settings = new ReactiveDict();
//       player_settings.set("character", "Engineer");
//       var player_skills = Skills.find({character: "Engineer"}).fetch();
//       var skills_count = 0;
//       AvailableSkills = new Mongo.Collection("available_skills");
//       player_skills.forEach(function(skill) {
//         AvailableSkills.insert(skill);
//         skills_count++;
//         if (skills_count == 2) {
//           return;
//         }
//       });
    },
    
    quit_games: function () {
      Game.remove({});
    }
  });
}

if (Meteor.isClient) {
  Template.game.helpers({
    game: function () {
      return Game.findOne({
        game: global_settings.game_id
      });
    },
    log: function (item) {
      console.log(item);
    }
  });
  
  Template.game.events({
    "click .reset_game": function () {
      Meteor.call('new_players');
      Meteor.call('quit_games');
      Meteor.call('init_game');
    }
  });
}