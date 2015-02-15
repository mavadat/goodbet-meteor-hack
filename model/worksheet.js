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
        }
    };

    var events = {
        getOrCreate: function(id) {
            var event = _events[id];
            return event ? event : _events[id] = new Event(id);
        }
    };

    var participants = {
        getOrCreate: function(id) {
            var participant = _participants[id];
            return participant ? participant : _participants[id] = new Participant(id);
        }
    };

    var settledBets = {
        add: function(settledBet) {
            _settledBets.push(settledBet);

            //raise events
            //TODO: design smell! Introduce pubsub rather than hacky middleman or hard dependency
            settledBet.customer.settledBetArrived(settledBet);
        }
    };

    var unsettledBets = {
        add: function(unsettledBet) {
            _unsettledBets.push(unsettledBet);

            //raise events
            //TODO: design smell! Introduce pubsub rather than hacky middleman or hard dependency
            unsettledBet.customer.unsettledBetArrived(unsettledBet);
        }
    };

    this.customers = customers;
    this.events = events;
    this.participants = participants;
    this.settledBets = settledBets;
    this.unsettledBets = unsettledBets;
};