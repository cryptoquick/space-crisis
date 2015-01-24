// Initialize Game
if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.call('quit_games');
    Meteor.call('init_game');
    Meteor.call('new_players');
  });
}