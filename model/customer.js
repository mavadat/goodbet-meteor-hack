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

Customer.prototype.settledBetArrived = function(settledBet) {
    this.settledBetCount++;
    this.settledStakeSum += settledBet.stake;
    this.winCount += (settledBet.win > 0) ? 1 : 0;
};

Customer.prototype.unsettledBetArrived = function(unsettledBet) {
    this.unsettledBetCount++;
    this.unsettledStakeSum += unsettledBet.stake;
};

Customer.prototype.isUnusual = function() {
    return (this.winCount / this.settledBetCount) > 0.6; //more than 60% winning history
};

Customer.prototype.getAverageStake = function() {
    return this.settledBetCount > 0 ? this.settledStakeSum / this.settledBetCount : 0;
};