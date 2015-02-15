describe('Single customer with multiple settled bets', function () {
    'use strict';

    var worksheet;
    var customer;
    var eventA;
    var eventB;
    var participantA;
    var participantB;

    beforeEach(function () {
        worksheet = new Worksheet();
        customer = worksheet.customers.getOrCreate(1);

        eventA = worksheet.events.getOrCreate(1);
        eventB = worksheet.events.getOrCreate(2);

        participantA = worksheet.participants.getOrCreate(1);
        participantB = worksheet.participants.getOrCreate(2);
    });

    it('should track bet count', function () {
        //arrange
        var firstFortunateBet = new SettledBet(customer, eventA, participantA, 100, 200);
        var secondFortunateBet = new SettledBet(customer, eventA, participantB, 10, 15);
        var unfortunateBet  = new SettledBet(customer, eventA, participantB, 50, 0 /*no win*/);

        //act
        worksheet.settledBets.add(firstFortunateBet);
        worksheet.settledBets.add(secondFortunateBet);
        worksheet.settledBets.add(unfortunateBet);

        //assert
        expect(customer.settledBetCount).toEqual(3);
    });


    it('should calculate win count as zero when all bets are unfortunate', function () {
        //arrange
        var firstUnfortunateBet = new SettledBet(customer, eventA, participantA, 100, 0);
        var secondUnfortunateBet = new SettledBet(customer, eventA, participantB, 10, 0);

        //act
        worksheet.settledBets.add(firstUnfortunateBet);
        worksheet.settledBets.add(secondUnfortunateBet);

        //assert
        expect(customer.winCount).toEqual(0);
    });


    it('should track win count when mix of fortunate and unfortunate bets are made', function () {
        //arrange
        var firstFortunateBet = new SettledBet(customer, eventA, participantA, 100, 200);
        var secondFortunateBet = new SettledBet(customer, eventA, participantB, 10, 15);
        var unfortunateBet  = new SettledBet(customer, eventA, participantB, 50, 0 /*no win*/);

        //act
        worksheet.settledBets.add(firstFortunateBet);
        worksheet.settledBets.add(secondFortunateBet);
        worksheet.settledBets.add(unfortunateBet);

        //assert
        expect(customer.winCount).toEqual(2);
    });


    it('should calculate stake sum', function () {
        //arrange
        var firstFortunateBet = new SettledBet(customer, eventA, participantA, 100, 200);
        var secondFortunateBet = new SettledBet(customer, eventA, participantB, 10, 15);
        var unfortunateBet  = new SettledBet(customer, eventA, participantB, 50, 0 /*no win*/);

        //act
        worksheet.settledBets.add(firstFortunateBet);
        worksheet.settledBets.add(secondFortunateBet);
        worksheet.settledBets.add(unfortunateBet);

        //assert
        expect(customer.settledStakeSum).toEqual(160);
    });
});