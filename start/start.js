if (Meteor.isClient) {
  Template.games_list.helpers({
    game_instances: function () {
      return Game.find({});
    }
  });
  
  Template.start_screen.helpers({
    slots_available: function () {
      return !!Game.find({
        players: {
          $lt: global_settings.max_players
        }
      }).count();
    }
  })
  
  Template.start_screen.events({
    "click .new_game": function () {
      Meteor.call('init_game');
    }
  })
}