Skills = new Mongo.Collection("skills");
Equipment = new Mongo.Collection("equipment");

var skills = global_settings.skills = [
  {
    character: "Engineer",
    name: "Repair",
    slots: [
      "Short",
      "Loose Bolts"
    ],
    target: "Crisis",
    description: "Can repair shorts and/or loose bolts.",
    image: "Repair",
    action: ""
  },
  
  /*{
    character: "Engineer",
    name: "Cannibalize",
    slots: [],
    target: "Module",
    description: "Damages a Module, but generates a new Equipment card.",
    image: "Cannibalize",
    action: "cannibalize_skill"
  },
  
  {
    character: "Engineer",
    name: "MacGyver",
    slots: [],
    target: "Equipment",
    description: "Turns an Equipment card into a different Equipment card.",
    image: "MacGyver",
    action: "macgyver_skill"
  },
  
  {
    character: "Engineer",
    name: "Quick Fix",
    slots: [],
    target: "Module",
    description: "Completely solves a Crisis, but next turn the Module is on fire.",
    image: "QuickFix",
    action: "quickfix_skill"
  },
  
  {
    character: "Pilot",
    name: "Reverse Engineer",
    slots: [],
    target: "Module",
    description: "Change a Module into another random Module.",
    image: "ReverseEngineer",
    action: "reverseengineer_skill"
  },
  
  {
    character: "Pilot",
    name: "Jettison",
    slots: [],
    target: "Module",
    description: "Destroy a Module completely.",
    image: "Jettison",
    action: "jettison_skill"
  },*/
  
  {
    character: "Pilot",
    name: "Evacuate",
    slots: ["Fire"],
    target: "Crisis",
    description: "Suffocates Fires, but may cause a Hull Breach.",
    image: "Evacuate",
    action: "evacuate_skill"
  },
  
  {
    character: "Pilot",
    name: "Gum Up",
    slots: ["Leak", "Metal Tear"],
    target: "Crisis",
    description: "Fixes leaks and metal tears.",
    image: "Gum",
    action: ""
  },
  
  /*{
    character: "Pilot",
    name: "Return",
    slots: [],
    target: "Module",
    description: "Returns your Equipment to their Modules.",
    image: "Return",
    action: "return_skill"
  }*/
];

var all_crises = ["Fire", "Loose Bolts", "Short", "Leak", "Metal Tear", "Hull Damage"];

var equipment = global_settings.equipment = [
  {
    name: "Duct Tape",
    slots: ["Leak"],
    description: "Fixes leaks.",
    target: "Crisis",
    image: "DuctTape",
    action: ""
  },
  
  /*{
    name: "Knife",
    slots: [],
    description: "Works on any problem, but can only repair one slot.",
    target: "Crisis",
    image: "Knife",
    action: "swiss_knife"
  },*/
  
  {
    name: "Welder",
    slots: ["Metal Tear"],
    description: "Fixes metal tear.",
    target: "Crisis",
    image: "Welder",
    action: ""
  },
  
  {
    name: "Extinguisher",
    slots: ["Fire"],
    description: "Puts out a fire.",
    target: "Crisis",
    image: "FireExtinguisher",
    action: ""
  },
  
  {
    name: "Wrench",
    slots: ["Loose Bolts"],
    description: "Fixes loose bolts.",
    target: "Crisis",
    image: "Wrench",
    action: ""
  },
  
  {
    name: "Wire Kit",
    slots: ["Short"],
    description: "Repairs electrical shorts.",
    target: "Crisis",
    image: "WireKit",
    action: ""
  },
  
  /*{
    name: "3D Printer",
    slots: [],
    description: "Becomes an Equipment card that can solve a current Crisis.",
    target: "",
    image: "3DPrinter",
    action: "3d_printer"
  },
  
  {
    name: "Suit",
    slots: [],
    description: "If there's a Hull Breach, you can live for another turn.",
    target: "",
    image: "Suit",
    action: "suit"
  },*/
  
  {
    name: "Patch Kit",
    slots: ["Hull Damage"],
    description: "Fixes hull damage.",
    target: "Crisis",
    image: "PatchKit",
    action: ""
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