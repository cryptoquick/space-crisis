// Initialize Game
if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.call('quit_games');
//     Meteor.call('init_game');
    Meteor.call('reset_players');
    Meteor.call('init_cards');
//     Meteor.call('init_players');
  });
}