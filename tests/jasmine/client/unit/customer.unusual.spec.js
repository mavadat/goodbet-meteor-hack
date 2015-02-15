describe('Unusual customer', function () {
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

    it('should NOT have less than 60% win rate', function () {
        //arrange
        var fortunateBet = new SettledBet(customer, event, participant, 100, 200);
        var unfortunateBet = new SettledBet(customer, event, participant, 100, 0 /*no win*/);


        //act
        worksheet.settledBets.add(fortunateBet);
        worksheet.settledBets.add(unfortunateBet);

        //assert
        expect(customer.isUnusual()).toBeFalsy();
    });

    it('should NOT have exactly 60% win rate', function () {
        //arrange
        var fortunateBet1 = new SettledBet(customer, event, participant, 100, 200);
        var fortunateBet2 = new SettledBet(customer, event, participant, 100, 200);
        var fortunateBet3 = new SettledBet(customer, event, participant, 100, 200);
        var unfortunateBet1 = new SettledBet(customer, event, participant, 100, 0 /*no win*/);
        var unfortunateBet2 = new SettledBet(customer, event, participant, 100, 0 /*no win*/);


        //act
        worksheet.settledBets.add(fortunateBet1);
        worksheet.settledBets.add(fortunateBet2);
        worksheet.settledBets.add(fortunateBet3);
        worksheet.settledBets.add(unfortunateBet1);
        worksheet.settledBets.add(unfortunateBet2);

        //assert
        expect(customer.isUnusual()).toBeFalsy();
    });

    it('should have more than 60% win rate', function () {
        //arrange
        var fortunateBet1 = new SettledBet(customer, event, participant, 100, 200);
        var fortunateBet2 = new SettledBet(customer, event, participant, 100, 200);


        //act
        worksheet.settledBets.add(fortunateBet1);
        worksheet.settledBets.add(fortunateBet2);

        //assert
        expect(customer.isUnusual()).toBeTruthy();
    });
});