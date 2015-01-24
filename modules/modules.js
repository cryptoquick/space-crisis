Modules = new Mongo.Collection("modules");
Crises = new Mongo.Collection("crises");

var modules = [
  {
    module_name: "Booster",
    points: 100,
    equipment: [
        "Fire Extinguisher"
    ],
    image: "Booster",
    has_crisis: false
  }
];

var crises = [
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
    ]
  },
  
  {
    name: "Hull Damage",
    turns: "3",
    slots: [
      {
        type: "Damage",
        solved: false
      }
    ]
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
    }
  });
  
  Template.module.events({
    "click .module": function() {
      if (Session.get("player_done", true)) return;
      
      var targeting_mode = Session.get("targeting_mode");
      if (targeting_mode === "") {
        if (!this.clicked) {
          this.clicked = true;
        } else {
          this.clicked = false;
        }
      } else if (targeting_mode === "Module") {
        // Logic for using a Skill/Equipment on a Module
        Session.set("targeting_mode", "");
        Session.set("player_done", true);
      }
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
        Session.set("targeting_mode", "");
        Session.set("player_done", true);
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Clear
    Modules.remove({});
    Crises.remove({});
    // Populate
    modules.map(function (module) {
      Modules.insert(module);
    });
    crises.map(function (crisis) {
      Crises.insert(crisis);
    });
  });
}