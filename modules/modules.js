Modules = new Mongo.Collection("modules");
Crises = new Mongo.Collection("crises");
ActiveCrises = new Mongo.Collection("active_crises");

var modules = [
  {
    module_name: "Environmental Control",
    points: 100,
    equipment: [
        "Fire Extinguisher"
    ],
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
    equipment: [],
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
    equipment: [],
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
    equipment: [],
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
    equipment: [],
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
    equipment: [],
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
    equipment: [],
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
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
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
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
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
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
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
    potential_crises: [
      "Fire",
      "Hull Breach"
    ],
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
    name: "Hull Damage",
    turns: "3",
    slots: [
      {
        type: "Damage",
        solved: false
      }
    ],
    assigned_module: 0
  }
];

if (Meteor.isClient) {
  Template.board.helpers({
    modules: function () {
      return Modules.find({});
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
      console.log(this);
      return this.clicked;
    }
  });
  
  Template.module.events({
    "click .module": function() {
      if (Session.get("player_done", true)) return;
      
      var targeting_mode = Session.get("targeting_mode");
      if (!targeting_mode) {
        this.clicked = !this.clicked;
//         if (!this.clicked) {
//           this.clicked = true;
//         } else {
//           this.clicked = false;
//         }
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
    "click .crisis": function() {
      if (Session.get("player_done", true)) return;
      
      var targeting_mode = Session.get("targeting_mode");
      if (targeting_mode === "") {
        if (!this.clicked) {
          this.clicked = true;
        } else {
          this.clicked = false;
        }
      } else if (targeting_mode === "Crisis") {
        // Logic for using a Skill/Equipment on a Crisis
        for (var i = 0; i < this.slots.length; i++) {
          if (!this.slots[i].solved) {
            // This needs to get the Skill or Equipment the player clicked on and compare its slot-fixers to the crisis' open slots
            var selected_card = Session.get("active_action");
            var slot_fixers = selected_card.slots;
            for (var j = 0; j < slot_fixers.length; j++) {
              if (this.slots[i].type === slot_fixers[j]) {
                this.slots[i].solved = true;
                Session.set("targeting_mode", "");
                Session.set("player_done", true);
                Session.set("active_action", "");
              }
            }
          }
        }
      }
    }
  })
  
  Template.crisis.helpers({
    crisis_slot_style: function() {
      if (this.solved) {
        return "text-decoration: line-through;";
      } else {
        return "";
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Clear
    Modules.remove({});
    Crises.remove({});
    ActiveCrises.remove({});
    // Populate
    modules.map(function (module) {
      Modules.insert(module);
    });
    crises.map(function (crisis) {
      Crises.insert(crisis);
    });
  });
}