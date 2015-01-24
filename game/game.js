if (Meteor.isServer) {
  Meteor.startup(function () {
    // 1. Initialize the game state (turn number, which character the player is using)
    // 2. Initialize the player's skills based on their class.
    //    This list of AvailableSkills should then be the collection that is iterated through in cards.html
    
    /*Session.set("turn_count", 1);
    Session.set("turn_maximum", 11);
    Session.set("character", "Engineer");
    var player_skills = Skills.find({character: "Engineer"});
    var skills_count = 0;
    AvailableSkills = new Mongo.Collection("available_skills");
    AvailableSkills.remove({});
    player_skills.forEach(function(skill) {
      AvailableSkills.insert(this);
      skills_count++;
      if (skills_count == 2) {
        return;
      }
    });*/
  });
}