if (Meteor.isClient) {
  Template.cards_list.helpers({
    skills: function () {
      return Skills.find({});
    },
    equipment: function () {
      return Equipment.find({});
    },
    crises: function () {
      return Crises.find({});
    }
  });
}