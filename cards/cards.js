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
    description: "Can repair shorts and/or damaged parts.",
  },
  
  {
    character: "Engineer",
    name: "Cannibalize",
    slots: [],
    description: "Damages a module and generates a new Equipment card."
  }
];

var equipment = [
  {
    name: "Fire Extinguisher",
    slots: ["Fire"],
    description: "Puts out a fire.",
    image: "FireExtinguisher"
  },
  
  {
    name: "Patch Kit",
    slots: ["Damage"],
    description: "Repairs damaged stuff.",
    image: ""
  },
  
  {
    name: "Electrical Kit",
    slots: ["Short"],
    description: "Repairs electrical shorts.",
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
  Meteor.startup(function () {
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
  });
}