Customer = function(id) {
    //actual data
    this.id = id;

    //computed data
    this.settledBetCount = 0;
    this.settledStakeSum = 0;
    this.winCount = 0;
    this.unsettledBetCount = 0;
    this.unsettledStakeSum = 0;
};

//events
Customer.prototype.settledBetArrived = function(settledBet) { /*will care later*/ };
Customer.prototype.unsettledBetArrived = function(unsettledBet) { /*will care later*/ };