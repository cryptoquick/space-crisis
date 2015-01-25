Players = new Mongo.Collection("players");
Hands = new Mongo.Collection("hands");

var modules = [
  {
    module_name: "Environmental Control",
    points: 100,
    equipment: ["Fire Extinguisher"],
    image: "Booster",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 2,
    top: 0,
    border: 'bottom'
  },
  
  {
    module_name: "Oxygen Generator",
    points: 100,
    equipment: ["Fire Extinguisher"],
    image: "OxygenRecycle",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 2,
    top: 2,
    border: 'top'
  },
  
  {
    module_name: "Seed Bank",
    points: 100,
    equipment: [],
    image: "SeedBank",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 5,
    top: 1
  },
  
  {
    module_name: "Habitation",
    points: 100,
    equipment: ["Knife"],
    image: "SleepRoom",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 3,
    top: 1,
    border: 'right'
  },
  
  {
    module_name: "Mechanical",
    points: 100,
    equipment: ["3D Printer", "3D Printer", "Wrench", "Wire Kit", "Patch Kit", "Welder"],
    image: "ToolBox",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 2,
    top: 1,
    border: 'right'
  },
  
  {
    module_name: "Water Recovery",
    points: 100,
    equipment: ["Welder", "Patch Kit"],
    image: "WasteRecycle",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 1,
    top: 1,
    border: 'right'
  },
  
  {
    module_name: "Propulsion",
    points: 100,
    equipment: ["Fire Extinguisher", "Duct Tape", "Wrench"],
    image: "Moisturizer",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 0,
    top: 1,
    border: 'right'
  },
  
  {
    module_name: "Hydroponics",
    points: 100,
    equipment: ["Fire Extinguisher", "Wire Kit"],
    image: "Farm",
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
    has_crisis: false,
    left: 4,
    top: 1,
    border: 'right'
  },
  
  {
    module_name: "Starboard Rear Solar Panel",
    points: 50,
    equipment: [],
    image: "PanelLeft",
    potential_crises: [],
    has_crisis: false,
    left: 0,
    top: 0,
    solar: 'solar-rear'
  },
  
  {
    module_name: "Port Rear Solar Panel",
    points: 50,
    equipment: [],
    image: "PanelLeft",
    potential_crises: [],
    has_crisis: false,
    left: 0,
    top: 2,
    solar: 'solar-rear'
  },
  
  {
    module_name: "Starboard Forward Solar Panel",
    points: 50,
    equipment: [],
    image: "PanelRight",
    potential_crises: [],
    has_crisis: false,
    left: 3,
    top: 0,
    solar: 'solar-forward'
  },
  
  {
    module_name: "Port Forward Solar Panel",
    points: 50,
    equipment: [],
    image: "PanelRight",
    potential_crises: [],
    has_crisis: false,
    left: 3,
    top: 2,
    solar: 'solar-forward'
  }
];

var crises = [
  {
    name: "Fire",
    turns: "1",
    slots: [
      {
        type: "Fire",
        solved: false
      }
    ],
    assigned_module: 0
  },
  
  {
    name: "Electrical Fire",
    turns: "2",
    slots: [
      {
        type: "Fire",
        solved: false
      },
      {
        type: "Short",
        solved: false
      }
    ],
    assigned_module: 0
  },
  
  {
    name: "Hull Breach",
    turns: "1",
    slots: [
      {
        type: "Hull Damage",
        solved: false
      },
      {
        type: "Metal Tear",
        solved: false
      },
      {
        type: "Loose Bolts",
        solved: false
      }
    ],
    assigned_module: 0
  }
];


if (Meteor.isServer) {
  Meteor.methods({
    reset_players: function () {
      // Clear
      Players.remove({});
      Hands.remove({});
    },
    
    init_players: function (game_id) {
      Meteor.call('new_player', 'Engineer', 'CaptBhuvana', game_id);
      Meteor.call('new_player', 'Pilot', 'CaptPilot', game_id);
    },
    
    new_player: function (character, image_name, game_id) {
      // Add
      var player_id = Players.insert({
        game: game_id,
        character: character,
        image: image_name,
        started: false,
        in_game: false
      });
      
      var skills = _.where(global_settings.skills, {character: character});
      var equipment_list = global_settings.equipment;
      
      console.log(skills);
      
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
      var game = Game.findOne(game_id);
      if (game && !game.game_started) {
        console.log('starting!', game);
        modules.map(function (module, i) {
          module.health = 100;
          module.game = game_id;
          module.has_crisis = false;
          Modules.insert(module);
        });
        
        Game.update(game_id, {
          $set: {
            game_started: true
          }
        });
        Players.update({
          game: game_id
        }, {
          $set: {
            in_game: true
          }
        }, {
          multi: true
        });
      }

      Players.update({
        game: game_id
      }, {
        $set: {
          in_game: true
        }
      });
      
      return Meteor.call('generate_crisis', game_id);
    },
    
    generate_crisis: function(game_id) {
      var random_module = Random.choice(Modules.find({
        solar: {
          $nin: ['solar-rear', 'solar-forward']
        },
        game: game_id
      }).fetch());

      var random_crisis_name = Random.choice(random_module.potential_crises);
      var random_crisis = _.clone(_.find(crises, function (item) {
        return item.name === random_crisis_name;
      }));
      Modules.update(random_module._id, {
        $set: {
          has_crisis: true
        }
      });
      random_crisis.assigned_module = random_module._id;
      random_crisis.game = random_module.game;
      Crises.insert(random_crisis);
      
      return 'A Crisis has started in ' + random_module.module_name + "!";
    },
    
    end_current_turn: function(game_id) {
      Game.update(game_id, {
          $inc: {
            turns: 1
          }
      });
      Players.update({
          game: game_id
        }, {
          $set: {
            ended_turn: false
          }
        }, {
          multi: true
      });
      var game = Game.find(game_id);
      if (game.turns >= global_settings.max_turns) {
        return "You have saved the day!";
      } else {
        // Check for failure state
        var modules_with_crises = Modules.find({
          game: game_id,
          has_crisis: true
        });
        var damaged_modules = 0;
        modules_with_crises.forEach(function (module) {
          if (module.health != 100) {
            damaged_modules++;
          }
        });
        // Also need to update the health value of each damaged module, for next turn
        Modules.update({
          game: game_id,
          has_crisis: true
        }, {
          $set: {
            health: 0
          }
        }, {
          multi: true
        });
        if (damaged_modules >= 3) {
          return "Your team has failed! The space station is ruined!";
        } else {
          return Meteor.call('generate_crisis');
        }
      }
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
    "click .player_selector": function () {
      var player_id = Session.get('player_id');
      if (player_id) {
        Players.update(player_id, {
          $set: {
            started: false
          }
        });
      }

      Session.set('player_id', this._id);
      
      var player = Players.findOne(this._id);
      
      if (!player.started) {
        Game.update(this.game, {
          $inc: {
            players: 1
          }
        });
        Players.update(this._id, {
          $set: {
            started: true
          }
        });
      }
    }
  });
}

if (Meteor.isClient) {
  Tracker.autorun(function () {
    var started_players = Players.find({
      started: true,
      in_game: false
    }).fetch();
    
    if (started_players.length >= global_settings.max_players) {
      Session.set('message', Meteor.call('start_game', started_players[0].game));
    }
    
    var ended_players = Players.find({
      ended_turn: true
    }).fetch();
    
    if (ended_players.length >= global_settings.max_players) {
      Session.set('message', Meteor.call('end_current_turn', ended_players[0].game));
    }
  });
}
