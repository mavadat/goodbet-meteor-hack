if (Meteor.isClient) {
    Template.worksheetLoad.events({
        'submit form': function(event) {
            return false;
        }
    });
};