if (Meteor.isClient) {
    Template.bets.helpers({
        activeWorksheet: function() {
            return Session.get('activeWorksheet');
        },
    });
};