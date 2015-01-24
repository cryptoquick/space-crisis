if (Meteor.isClient) {
  Template.registerHelper('show_message', function () {
    return Session.get('message');
  });
}