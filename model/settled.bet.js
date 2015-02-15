SettledBet = function(customer, event, participant, stake, win) {
    this.customer = customer;
    this.event = event;
    this.participant = participant;
    this.stake = stake;
    this.win = win;

    //fire events - allow aggregate calculations propagate
    customer.settledBetArrived(this);
};