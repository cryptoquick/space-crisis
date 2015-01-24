Skills = new Mongo.Collection("skills");
Equipment = new Mongo.Collection("equipment");

var skills = [
  {
    character: "Engineer",
    name: "Repair",
    slots: [
      "Short",
      "Damage"
    ],
    target: "Crisis",
    description: "Can repair shorts and/or damaged parts.",
  },
  
  {
    character: "Engineer",
    name: "Cannibalize",
    slots: [],
    target: "Module",
    description: "Damages a Module, but generates a new Equipment card."
  },
  
  {
    character: "Engineer",
    name: "MacGyver",
    slots: [],
    target: "Equipment",
    description: "Turns an Equipment card into a different Equipment card."
  },
  
  {
    character: "Engineer",
    name: "Quick Fix",
    slots: [],
    target: "Module",
    description: "Completely solves a Crisis, but next turn the Module is on fire."
  },
  
  {
    character: "Pilot",
    name: "Reverse Engineer",
    slots: [],
    target: "Module",
    description: "Change a Module into another random Module."
  },
  
  {
    character: "Pilot",
    name: "Jettison",
    slots: [],
    target: "Module",
    description: "Destroy a Module completely."
  },
  
  {
    character: "Pilot",
    name: "Evacuate",
    slots: ["Fire"],
    target: "Crisis",
    description: "Suffocates Fires but may cause a Wall Breach."
  },
  
  {
    character: "Pilot",
    name: "Return",
    slots: [],
    target: "Module",
    description: "Returns your Equipment to their Modules."
  }
];

var equipment = [
  {
    name: "Extinguisher",
    slots: ["Fire"],
    description: "Puts out a fire.",
    target: "Crisis",
    image: "FireExtinguisher"
  },
  
  {
    name: "Patch Kit",
    slots: ["Damage"],
    description: "Repairs damaged stuff.",
    target: "Crisis",
    image: ""
  },
  
  {
    name: "Electrical Kit",
    slots: ["Short"],
    description: "Repairs electrical shorts.",
    target: "Crisis",
    image: ""
  },
  
  {
    name: "3D Printer",
    slots: [],
    description: "Becomes an Equipment card that can solve a current Crisis.",
    target: "",
    image: ""
  }
];

if (Meteor.isServer) {
  Meteor.methods({
    init_cards: function () {
      // Clear
      Skills.remove({});
      Equipment.remove({});
      // Populate
      skills.map(function (skill) {
        Skills.insert(skill);
      });
      equipment.map(function (item) {
        Equipment.insert(item);
      });
    }
  });
}