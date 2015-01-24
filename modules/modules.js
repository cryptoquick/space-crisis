Modules = new Mongo.Collection("modules");

var modules = [
  {
    module_name: "Utility Module",
    points: 100,
    equipment: [
      {
        name: "Fire Extinguisher"
      }
    ]
  }
]

if (Meteor.isClient) {
  Template.board.helpers({
    modules: function () {
      return Modules.find({});
    }
  });
  
  Template.module_equipment.events({
    "click button": function () {
      alert("You clicked the: " + this.name);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Clear
    Modules.remove({});
    // Populate
    modules.map(function (module) {
      Modules.insert(module);
    });
  });
}