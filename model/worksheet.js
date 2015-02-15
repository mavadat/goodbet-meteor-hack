Worksheet = function() {
    var customers = {
        getOrCreate: function(id){
            return new Customer(id); //actual code will come soon
        }
    };

    var events = {
        getOrCreate: function(id){
            return new Event(id); //actual code will come soon
        }
    };

    var participants = {
        getOrCreate: function(id){
            return new Participant(id); //actual code will come soon
        }
    };

    var settledBets = {
    };

    var unsettledBets = {
    };

    this.customers = customers;
    this.events = events;
    this.participants = participants;
    this.settledBets = settledBets;
    this.unsettledBets = unsettledBets;
};