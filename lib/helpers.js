if (Meteor.isClient) {
  Template.registerHelper('show_message', function () {
    return Session.get('message');
  });
  
  Template.registerHelper('log', function (message) {
    console.log(message);
  });
}