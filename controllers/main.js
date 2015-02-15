if (Meteor.isClient) {
    var activeWorksheet;

    Template.worksheetLoad.helpers({
        activeWorksheetNotAvailable: function() {
            return !Session.get('activeWorksheetAvailable');
        },

        sampleSettledCsv: Sample.SettledCsvText,
        sampleUnsettledCsv: Sample.UnsettledCsvText
    });

    var worksheetFromCsv = function(event) {
        var settledCsvText = event.target.settledCsv.value.trim();
        var unsettledCsvText = event.target.unsettledCsv.value.trim();

        var worksheet = new Worksheet();
        worksheet.loadSettledCsv(settledCsvText);
        worksheet.loadUnsettledCsv(unsettledCsvText);

        return worksheet;
    };

    Template.worksheetLoad.events({
        'submit form': function(event) {
            var worksheet = worksheetFromCsv(event);

            if (worksheet) {
                activeWorksheet = worksheet;
                Session.set('activeWorksheetAvailable', true);
            };

            return false;
        }
    });

    var getRisks = function(unsettledBet) {
        debugger;
        var result = [];

        if(unsettledBet.isTooRisky()) {
            result.push({label: 'Too Risky 30x'});
        } else if(unsettledBet.isRisky()) {
            result.push({label: 'Risky 10x'});
        };

        if(unsettledBet.customer.isUnusual()) {
            result.push({label: 'Unusual'});
        };

        if(unsettledBet.isHigh()) {
            result.push({label: 'Too High'});
        };

        return result;
    };

    Template.bets.helpers({
        activeWorksheetAvailable: function() {
            return Session.get('activeWorksheetAvailable');
        },

        settledBets: function() {
            return _.map(activeWorksheet.settledBets.all(), function(item){
                return {
                    customer: item.customer.id,
                    event: item.event.id,
                    participant: item.participant.id,
                    stake: item.stake,
                    win: item.win,
                    unusualCustomer: item.customer.isUnusual()
                }});
        },

        unsettledBets: function() {
            return _.map(activeWorksheet.unsettledBets.all(), function(item){
                return {
                    customer: item.customer.id,
                    event: item.event.id,
                    participant: item.participant.id,
                    stake: item.stake,
                    toWin: item.toWin,
                    risks: getRisks(item)
                }});
        }
    });
};