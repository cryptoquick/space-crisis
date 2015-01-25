// Initialize Game
if (Meteor.isServer) {
  Meteor.startup(function () {
//     Meteor.call('quit_games');
//     Meteor.call('reset_players');
//     Meteor.call('init_cards');
  });
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set('message', '');
  });
}