describe('Risky unsettled bet', function () {
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

        //average stake regardless of win or no-win will be $500 (100+500+1000+400 / 4)
        var fortunateBetA = new SettledBet(customer, event, participant, 100, 200);
        var fortunateBetB = new SettledBet(customer, event, participant, 500, 750);
        var unfortunateBetA = new SettledBet(customer, event, participant, 1000, 0 /*no win*/);
        var unfortunateBetB = new SettledBet(customer, event, participant, 400, 0 /*no win*/);

        worksheet.settledBets.add(fortunateBetA);
        worksheet.settledBets.add(fortunateBetB);
        worksheet.settledBets.add(unfortunateBetA);
        worksheet.settledBets.add(unfortunateBetB);
    });

    it('should NOT be below 10x customer average history', function () {
        //arrange

        //act
        var unsettledBet = new UnsettledBet(customer, event, participant, 50, 100);

        //assert
        expect(unsettledBet.isRisky()).toBeFalsy();
    });

    it('should NOT be exactly 10x customer average history', function () {
        //arrange

        //act
        var unsettledBet = new UnsettledBet(customer, event, participant, 5000, 1000);

        //assert
        expect(unsettledBet.isRisky()).toBeFalsy();
    });

    it('should be 10x more than customer average history', function () {
        //arrange

        //act
        var unsettledBet = new UnsettledBet(customer, event, participant, 5001, 1000);

        //assert
        expect(unsettledBet.isRisky()).toBeTruthy();
    });
});