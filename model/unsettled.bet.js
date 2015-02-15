UnsettledBet = function(customer, event, participant, stake, toWin) {
    this.customer = customer;
    this.event = event;
    this.participant = participant;
    this.stake = stake;
    this.toWin = toWin;

    //fire events - allow aggregate calculations propagate
    customer.unsettledBetArrived(this);
};