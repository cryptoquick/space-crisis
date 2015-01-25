Modules = new Mongo.Collection("modules");
Crises = new Mongo.Collection("crises");

var card_actions = {
  "3d_printer": function (card, crisis) {
    
  },
  "suit": function (card, crisis) {
    
  }
}

if (Meteor.isClient) {
  Template.board.helpers({
    modules: function () {
      var player = Players.findOne(Session.get('player_id'));
      return Modules.find({
        game: player.game
      });
    }
  });
  
  Template.module.helpers({
    print_equipment: function() {
      var equipment_html =  "<p>";
      for (var i = 0; i < equipment.length; i++) {
        if (i !== 0) equipment_html += ",";
        equipment_html += equipment[i];
      }
      equipment_html += "</p>";
      return equipment_html;
    },
    pos: function () {
      return '"left:' + (this.left * 160) + 'px;top:' + (this.top * 160) + 'px'
    },
    clicked: function () {
      return this.clicked;
    }
  });
  
  Template.module.events({
    "click .module": function() {
      if (Session.get("player_done", true)) return;
      
      var targeting_mode = Session.get("targeting_mode");
      if (!targeting_mode) {
        this.clicked = !this.clicked;
      } else if (targeting_mode === "Module") {
        // Logic for using a Skill/Equipment on a Module
        Session.set("targeting_mode", "");
        Session.set("player_done", true);
      }
    },
    "click .card": function () {
      Session.set('active_crisis', null);
    },
    "mouseover .module": function () {
      Session.set('message', this.module_name);
    },
    "mouseout .module": function () {
      Session.set('message', '');
    }
  });
  
  Template.crisis.events({
    "click .crisis": function(evt) {
      var card_id = Session.get('selected_card');
      var crisis = this;
      var crisis_id = crisis._id;
      Session.set('active_crisis', crisis_id);
      
      if (card_id) {
        var card = Hands.findOne(card_id);
        var total_slots = crisis.slots.length;
        var solved_slots = crisis.slots.map(function (crisis_slot) {
          if (!crisis_slot.solved) {
            // This needs to get the Skill or Equipment the player clicked on and compare its slot-fixers to the crisis' open slots
            var slot_fixers = card.slots;
            if (slot_fixers) {
              slot_fixers.forEach(function (card_slot) {
                if (crisis_slot.type === card_slot) {
                  crisis_slot.solved = true;
                }
              });
            }
            return crisis_slot;
          }
        });
        if (total_slots === solved_slots.length) {
          Hands.remove(card_id);
          Session.set('selected_card', null);
        }
        Crises.update(crisis_id, {
          $set: {
            slots: solved_slots
          }
        });
      }
    }
  })
  
  Template.crisis.helpers({
    active_crisis: function() {
      return Crises.find({
        assigned_module: this._id
      });
    },
    crisis_slot_style: function() {
      if (this.solved) {
        return "text-decoration: line-through;";
      } else {
        return "";
      }
    },
    showing: function () {
//       console.log('check_showing', this._id, Session.get('active_crisis'), Session.get('active_crisis') === this._id);
      return Session.get('active_crisis') === this._id;
    }
  });
  
  Tracker.autorun(function () {
    var solved_crises = Crises.find({
      "slots.solved": true
    }).fetch();
    
    console.log('solved_crises', solved_crises);
    
    solved_crises.map(function (crisis) {
      console.log(crisis);
      var is_solved = crisis.slots.reduce(function (prev, slot) {
        if (!slot) {
          prev = slot;
        }
        return prev;
      }, true);
      console.log('is_solved', is_solved);
      if (is_solved) {
        Modules.update(crisis.assigned_module, {
          $set: {
            has_crisis: false
          }
        });
        
        Crises.remove(crisis._id);
        
        var remaining_crises = Crises.find({
          game: crisis.game
        }).count();
        
        if (remaining_crises === 0) {
//           Meteor.call("end_current_turn", crisis.game);
        }
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Clear
//     Modules.remove({});
//     Crises.remove({});
    // Populate
//     modules.map(function (module) {
//       Modules.insert(module);
//     });
  });
}