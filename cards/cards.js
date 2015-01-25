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
    image: "",
    action: "console.log('You just used the Engineer skill Repair.')"
  },
  
  {
    character: "Engineer",
    name: "Cannibalize",
    slots: [],
    target: "Module",
    description: "Damages a Module, but generates a new Equipment card.",
    image: "Cannibalize",
    action: "console.log('You just used the Engineer skill Cannibalize.')"
  },
  
  {
    character: "Engineer",
    name: "MacGyver",
    slots: [],
    target: "Equipment",
    description: "Turns an Equipment card into a different Equipment card.",
    image: "MacGyver",
    action: "console.log('You just used the Engineer skill MacGyver.')"
  },
  
  {
    character: "Engineer",
    name: "Quick Fix",
    slots: [],
    target: "Module",
    description: "Completely solves a Crisis, but next turn the Module is on fire.",
    image: "QuickFix",
    action: "console.log('You just used the Engineer skill Quick Fix.')"
  },
  
  {
    character: "Pilot",
    name: "Reverse Engineer",
    slots: [],
    target: "Module",
    description: "Change a Module into another random Module.",
    image: "ReverseEngineer",
    action: "console.log('You just used the Engineer skill Reverse Engineer.')"
  },
  
  {
    character: "Pilot",
    name: "Jettison",
    slots: [],
    target: "Module",
    description: "Destroy a Module completely.",
    image: "Jettison",
    action: "console.log('You just used the Pilot skill Jettison.')"
  },
  
  {
    character: "Pilot",
    name: "Evacuate",
    slots: ["Fire"],
    target: "Crisis",
    description: "Suffocates Fires but may cause a Wall Breach.",
    image: "Evacuate",
    action: "console.log('You just used the Pilot skill Evacuate.')"
  },
  
  {
    character: "Pilot",
    name: "Return",
    slots: [],
    target: "Module",
    description: "Returns your Equipment to their Modules.",
    image: "Return",
    action: "console.log('You just used the Pilot skill Return.')"
  }
];

var equipment = [
  {
    name: "Extinguisher",
    slots: ["Fire"],
    description: "Puts out a fire.",
    target: "Crisis",
    image: "FireExtinguisher",
    action: "console.log('You just used the Equipment card Extinguisher.')"
  },
  
  {
    name: "Wrench",
    slots: ["Damage"],
    description: "Repairs damaged stuff.",
    target: "Crisis",
    image: "Wrench",
    action: "console.log('You just used the Equipment card Wrench.')"
  },
  
  {
    name: "Wire Kit",
    slots: ["Short"],
    description: "Repairs electrical shorts.",
    target: "Crisis",
    image: "WireKit",
    action: "console.log('You just used the Equipment card Wire Kit.')"
  },
  
  {
    name: "3D Printer",
    slots: [],
    description: "Becomes an Equipment card that can solve a current Crisis.",
    target: "",
    image: "3DPrinter",
    action: "console.log('You just used the Equipment card 3D Printer.')"
  },
  
  {
    name: "Suit",
    slots: [],
    description: "If there's a Hull Breach, you can live for another turn.",
    target: "",
    image: "Suit",
    action: "console.log('You just used the Equipment card Suit.')"
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