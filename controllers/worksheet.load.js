if (Meteor.isClient) {
    Template.worksheetLoad.helpers({
        worksheetNotAvailable: function() {
            return !Session.get('activeWorksheet');
        },
    });

    var worksheetFromCsv = function(event) {
        var settledCsvText = event.target.settledCsv.value;
        var unsettledCsvText = event.target.unsettledCsv.value;

        var worksheet = new Worksheet();
        worksheet.loadSettledCsv(settledCsvText);
        worksheet.loadUnsettledCsv(unsettledCsvText);

        return worksheet;
    };

    Template.worksheetLoad.events({
        'submit form': function(event) {
            debugger;
            var worksheet = worksheetFromCsv(event);

            if (worksheet) {
                Session.set('activeWorksheet', worksheet);
            };

            return false;
        }
    });
};