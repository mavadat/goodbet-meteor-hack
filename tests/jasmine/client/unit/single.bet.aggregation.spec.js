describe('Single bet aggregate calculation', function () {
    'use strict';

    var worksheet;
    var customer;
    var event;
    var participant;

    beforeEach(function () {
        worksheet = new Worksheet();
        customer = worksheet.customers.getOrCreate(1);
        event = worksheet.events.getOrCreate(1);
        participant = worksheet.participants.getOrCreate(1);
    });

    it('should have no settled/unsettled bet history when no settled bet is imported for', function () {
        //arrange

        //act
        //none - no settled bet to add to the customer

        //assert
        expect(customer.settledBetCount).toEqual(0);
        expect(customer.settledStakeSum).toEqual(0);
        expect(customer.winCount).toEqual(0);
        expect(customer.unsettledBetCount).toEqual(0);
        expect(customer.unsettledStakeSum).toEqual(0);
    });
    

    it('should have one settled bet and no win when the only settled bet is unfortunate', function() {
        //arrange
        var unfortunateBet = new SettledBet(customer, event, participant, 100, 0 /*no win*/);

        //act
        worksheet.settledBets.add(unfortunateBet);

        //assert
        expect(customer.settledBetCount).toEqual(1);
        expect(customer.winCount).toEqual(0);
    });


    it('should have one settled bet count and single win when the only settled bet is fortunate', function() {
        //arrange
        var fortunateBet = new SettledBet(customer, event, participant, 100, 200);

        //act
        worksheet.settledBets.add(fortunateBet);

        //assert
        expect(customer.settledBetCount).toEqual(1);
        expect(customer.winCount).toEqual(1);
    });
});