Skills = new Mongo.Collection("skills");
Equipment = new Mongo.Collection("equipment");
Crises = new Mongo.Collection("crises");

var skills = [
  {
    character: "Engineer",
    name: "Repair",
    slots: [
      "Short",
      "Damage"
    ],
    target: "Module",
    description: "Can repair shorts and/or damaged parts.",
  },
  
  {
    character: "Engineer",
    name: "Cannibalize",
    slots: [],
    target: "Equipment",
    description: "Damages a Module, but generates a new Equipment card."
  },
  
  {
    character: "Engineer",
    name: "MacGyver",
    slots: [],
    target: "Equipment",
    description: "Turns an Equipment card into a different Equipment card."
  }
];

var equipment = [
  {
    name: "Extinguisher",
    slots: ["Fire"],
    description: "Puts out a fire.",
    target: "Module",
    image: "FireExtinguisher"
  },
  
  {
    name: "Patch Kit",
    slots: ["Damage"],
    description: "Repairs damaged stuff.",
    target: "Module",
    image: ""
  },
  
  {
    name: "Electrical Kit",
    slots: ["Short"],
    description: "Repairs electrical shorts.",
    target: "Module",
    image: ""
  },
  
  {
    name: "3D Printer",
    slots: [],
    description: "Becomes an Equipment card that can solve a current Crisis.",
    target: "Equipment",
    image: ""
  }
];

var crises = [
  {
    name: "Electrical Fire",
    turns: "2",
    slots: [
      "Fire",
      "Short"
    ]
  },
  
  {
    name: "Hull Damage",
    turns: "3",
    slots: [
      "Damage"
    ]
  }
];

if (Meteor.isServer) {
  Meteor.methods({
    new_cards: function () {
      // Clear
      Skills.remove({});
      Equipment.remove({});
      Crises.remove({});
      // Populate
      skills.map(function (skill) {
        Skills.insert(skill);
      });
      equipment.map(function (item) {
        Equipment.insert(item);
      });
      crises.map(function (crisis) {
        Crises.insert(crisis);
      });
    }
  });
}