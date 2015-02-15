describe('Single customer with multiple unsettled bets', function () {
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
        var betA = new UnsettledBet(customer, eventA, participantA, 100, 200);
        var betB = new UnsettledBet(customer, eventA, participantB, 10, 15);
        var betC  = new UnsettledBet(customer, eventA, participantB, 50, 100);

        //act
        worksheet.unsettledBets.add(betA);
        worksheet.unsettledBets.add(betB);
        worksheet.unsettledBets.add(betC);

        //assert
        expect(customer.unsettledBetCount).toEqual(3);
    });


    it('should calculate stake sum', function () {
        //arrange
        var betA = new UnsettledBet(customer, eventA, participantA, 100, 200);
        var betB = new UnsettledBet(customer, eventA, participantB, 10, 15);
        var betC  = new UnsettledBet(customer, eventA, participantB, 50, 100);

        //act
        worksheet.unsettledBets.add(betA);
        worksheet.unsettledBets.add(betB);
        worksheet.unsettledBets.add(betC);

        //assert
        expect(customer.unsettledStakeSum).toEqual(160);
    });
});