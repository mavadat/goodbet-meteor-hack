UnsettledBet = function(customer, event, participant, stake, toWin) {
    this.customer = customer;
    this.event = event;
    this.participant = participant;
    this.stake = stake;
    this.toWin = toWin;
};

UnsettledBet.prototype.isRisky = function() {
    return this.stake > this.customer.getAverageStake() * 10; //more than 10x bigger than customer's average stake
};

UnsettledBet.prototype.isTooRisky = function() {
    return this.stake > this.customer.getAverageStake() * 30; //more than 30x bigger than customer's average stake
};

UnsettledBet.prototype.isHigh = function() {
    return this.stake >= 1000; //$1000 or more is high stake
};
