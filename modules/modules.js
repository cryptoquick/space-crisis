Modules = new Mongo.Collection("modules");
Crises = new Mongo.Collection("crises");

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
    "mouseover .module": function () {
      Session.set('message', this.module_name);
    },
    "mouseout .module": function () {
      Session.set('message', '');
    }
  });
  
  Template.crisis.events({
    "click .crisis": function(evt) {
      Session.set('message', this.name);
      
      var skill_id = Session.get('selected_skill');
      var crisis_id = this._id;
      
      if (skill_id) {
        var skill = Hands.findOne(skill_id);
        var crisis_slots = this.slots;
        
        var solved_slots = this.slots.map(function (crisis_slot) {
          if (!crisis_slot.solved) {
            // This needs to get the Skill or Equipment the player clicked on and compare its slot-fixers to the crisis' open slots
            var slot_fixers = skill.slots;
            slot_fixers.forEach(function (skill_slot) {
              if (crisis_slot.type === skill_slot) {
                crisis_slot.solved = true;
              }
            });
            return crisis_slot;
          }
        });
        Crises.update(crisis_id, {
          $set: {
            slots: solved_slots
          }
        });
      }
      
      
//       if (skill) {
        
//       }
      
//       if (Session.get("player_done", true)) return;
      
//       var targeting_mode = Session.get("targeting_mode");
//       if (targeting_mode === "") {
//         if (!this.clicked) {
//           this.clicked = true;
//         } else {
//           this.clicked = false;
//         }
//       } else if (targeting_mode === "Crisis") {
//         // Logic for using a Skill/Equipment on a Crisis
//         
//         // Active action is a string literal of a direct JavaScript function
//         var futher_action = Session.get("active_action").action;
//         if (further_action) {
//           var action_function = new Function(further_action);
//           action_function.call(this);
//         }
//         Session.set("active_action", "");
//       }
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
    }
  });
  
  Tracker.autorun(function () {
    var solved_crises = Crises.find({
      "slots.solved": true
    }).fetch();
    
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