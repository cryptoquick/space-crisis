if (Meteor.isClient) {
  Template.games_list.helpers({
    game_instances: function () {
      return Game.find({});
    }
  });
  
  Template.start_screen.events({
    "click .new_game": function () {
      Meteor.call('init_game');
    }
  })
}