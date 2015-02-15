Worksheet = function() {
    var _customers = {};
    var _events = {};
    var _participants = {};
    var _settledBets = [];
    var _unsettledBets = [];

    var customers = {
        getOrCreate: function(id) {
            var customer = _customers[id];
            return customer ? customer : _customers[id] = new Customer(id);
        },

        all: function() {
            return _.values(_customers);
        }
    };

    var events = {
        getOrCreate: function(id) {
            var event = _events[id];
            return event ? event : _events[id] = new Event(id);
        },

        all: function() {
            return _.values(_events);
        }
    };

    var participants = {
        getOrCreate: function(id) {
            var participant = _participants[id];
            return participant ? participant : _participants[id] = new Participant(id);
        },

        all: function() {
            return _.values(_participants);
        }
    };

    var settledBets = {
        add: function(settledBet) {
            _settledBets.push(settledBet);

            //raise events
            //TODO: design smell! Introduce pubsub rather than hacky middleman or hard dependency
            settledBet.customer.settledBetArrived(settledBet);

            return settledBet;
        },

        all: function() {
            return _settledBets;
        }
    };

    var unsettledBets = {
        add: function(unsettledBet) {
            _unsettledBets.push(unsettledBet);

            //raise events
            //TODO: design smell! Introduce pubsub rather than hacky middleman or hard dependency
            unsettledBet.customer.unsettledBetArrived(unsettledBet);

            return unsettledBet;
        },

        all: function() {
            return _unsettledBets;
        }
    };

    var loadSettledCsv = function(csvText) {
        var $that = this;

        results = Papa.parse(csvText, {
            header: true, //use header for JS object keys
            dynamicTyping: true //convert to numeric
        });

        if(results.errors.length > 0) {
            Meteor.Error("Invalid CSV content.");
            return;
        }

        _.each(results.data, function(row) {
            var customer = $that.customers.getOrCreate(row.Customer);
            var event = $that.events.getOrCreate(row.Event);
            var participant = $that.participants.getOrCreate(row.Participant);
            var settledBet = new SettledBet(customer, event, participant, row.Stake, row.Win);
            $that.settledBets.add(settledBet);
        });
    };

    var loadUnsettledCsv = function(csvText) {
        var $that = this;

        results = Papa.parse(csvText, {
            header: true, //use header for JS object keys
            dynamicTyping: true //convert to numeric
        });

        if(results.errors.length > 0) {
            Meteor.Error("Invalid CSV content.");
            return;
        }

        _.each(results.data, function(row) {
            var customer = $that.customers.getOrCreate(row.Customer);
            var event = $that.events.getOrCreate(row.Event);
            var participant = $that.participants.getOrCreate(row.Participant);
            var unsettledBet = new UnsettledBet(customer, event, participant, row.Stake, row['To Win']);
            $that.unsettledBets.add(unsettledBet);
        });
    };

    //exports
    this.customers = customers;
    this.events = events;
    this.participants = participants;
    this.settledBets = settledBets;
    this.unsettledBets = unsettledBets;

    this.loadSettledCsv = loadSettledCsv;
    this.loadUnsettledCsv = loadUnsettledCsv;
};