if (Meteor.isClient) {
  Template.skill_list.helpers({
    skills: function () {
      return Hands.find({
        player_id: Session.get('player_id'),
        type: "Skill"
      });
    }
  });
  
  Template.equipment_list.helpers({
    equipment: function () {
      return Hands.find({
        player_id: Session.get('player_id'),
        type: "Equipment"
      });
    }
  });
  
  Template.skill_card.events({
    "click .skill": function() {
      Session.set('selected_skill', this._id);
      
//       if (Session.get("player_done", true)) return;
      
//       var targeting_mode = Session.get("targeting_mode");
//       if (targeting_mode === "") {
//         if (!this.clicked) {
//           this.clicked = true;
//           Session.set("targeting_mode", this.target);
//           Session.set("active_action", {
//             slots: this.slots,
//             action: this.action
//           });
//         } else {
//           this.clicked = false;
//           Session.set("targeting_mode", "");
//           Session.set("active_action", "");
//         }
//       }
    }
  });
  
  Template.skill_card.helpers({
    clicked: function () {
      if (this.clicked) {
        return "highlighted";
      } else {
        return "";
      }
    }
  });
  
  Template.equipment_card.events({
    "click .equipment": function() {
      Session.set('selected_skill', this._id);
      
//       if (Session.get("player_done", true)) return;
      
//       var targeting_mode = Session.get("targeting_mode");
//       if (targeting_mode === "") {
//         if (!this.clicked) {
//           this.clicked = true;
//           Session.set("targeting_mode", this.target);
//           Session.set("active_action", {
//             slots: this.slots,
//             action: this.action
//           });
//         } else {
//           this.clicked = false;
//           Session.set("targeting_mode", "");
//           Session.set("active_action", {
//             slots: this.slots,
//             action: this.action
//           });
//         }
//       } else if (targeting_mode === "Equipment") {
//         // Logic for targeting Equipment with Skills/other Equipment
//         Session.set("targeting_mode", "");
//         Session.set("player_done", true);
//         Session.set("active_action", "");
//       }
    }
  });
  
  Template.equipment_card.helpers({
    clicked: function () {
      if (this.clicked) {
        return "highlighted";
      } else {
        return "";
      }
    }
  });
}