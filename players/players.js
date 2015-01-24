Players = new Mongo.Collection("players");
Hands = new Mongo.Collection("hands");

if (Meteor.isServer) {
  Meteor.methods({
    reset_players: function () {
      // Clear
      Players.remove({});
      Hands.remove({});
    },
    
    init_players: function (game_id) {
      Meteor.call('new_player', 'Engineer', game_id);
      Meteor.call('new_player', 'Pilot', game_id);
    },
    
    new_player: function (character, game_id) {
      // Add
      var player_id = Players.insert({
        game: game_id,
        character: character
      });
      
      var skills = Skills.find({
        character: character
      }).fetch();
      var equipment_list = Equipment.find({}).fetch();
      
      for (i = 0; i < 2; i++) {
        var skill_card = Random.choice(skills);
        skill_card.player_id = player_id;
        skill_card.game_id = global_settings.game_id;
        skill_card.type = "Skill";
        delete skill_card._id;
        Hands.insert(skill_card);
      }
      
      for (i = 0; i < 3; i++) {
        var equipment_card = Random.choice(equipment_list);
        equipment_card.player_id = player_id;
        equipment_card.game_id = global_settings.game_id;
        equipment_card.type = "Equipment";
        delete equipment_card._id;
        Hands.insert(equipment_card);
      }
    },
    
    start_game: function (game_id) {
      Game.update(game_id, {
        $set: {
          game_started: true
        }
      });
    }
  });
}

if (Meteor.isClient) {
  Template.game_instance.helpers({
    players: function () {
      var players = Players.find({
        game: this._id
      });
      return players;
    }
  });
  
  Template.start_screen.helpers({
    players: function (game_id) {
      return Players.find({
        game: game_id
      });
    }
  });
  
  Template.class_selector.events({
    "click button": function () {
      var player_id = Session.get('player_id');
      if (player_id) {
        Players.update(player_id, {
          $set: {
            started: false
          }
        });
      }
      
      Session.set('message', 'You picked the ' + this.character + '!');
      Session.set('player_id', this._id);
      
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
    var started_players = Players.find({
      started: true
    }).fetch();
    
    if (started_players) {
      groups = _.groupBy(started_players, 'game');
    }
    
    _.map(groups, function (group) {
      if (group.length === global_settings.max_players) {
        console.log('starting!', group.length, global_settings.max_players);
        Meteor.call('start_game', group[0].game);
      }
    });
  });
}
