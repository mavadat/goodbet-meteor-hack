describe('Worksheet CSV import', function () {
    'use strict';

    var worksheet;
    var customer;
    var eventA;
    var eventB;
    var participantA;
    var participantB;

    beforeEach(function () {
        worksheet = new Worksheet();
    });

    it('should read settled bets with headers', function () {
        //arrange
        var csvText = 'Customer,Event,Participant,Stake,Win\r\n' +
            '1,1,6,50,250\r\n' +
            '2,1,3,5,0\r\n' +
            '1,1,3,20,0';

        //act
        worksheet.loadSettledCsv(csvText);

        //assert
        var customerA = worksheet.customers.getOrCreate(1);
        var customerB = worksheet.customers.getOrCreate(2);

        expect(customerA.settledBetCount).toEqual(2);
        expect(customerA.settledStakeSum).toEqual(70);
        expect(customerA.winCount).toEqual(1);

        expect(customerB.settledBetCount).toEqual(1);
        expect(customerB.settledStakeSum).toEqual(5);
        expect(customerB.winCount).toEqual(0);
    });


    it('should read unsettled bets with headers', function () {
        //arrange
        var csvText = 'Customer,Event,Participant,Stake,To Win\r\n' +
            '4,11,4,50,500\r\n' +
            '5,11,6,50,400\r\n' +
            '4,11,7,300,1200';

        //act
        worksheet.loadUnsettledCsv(csvText);

        //assert
        var customerA = worksheet.customers.getOrCreate(4);
        var customerB = worksheet.customers.getOrCreate(5);

        expect(customerA.unsettledBetCount).toEqual(2);
        expect(customerA.unsettledStakeSum).toEqual(350);

        expect(customerB.unsettledBetCount).toEqual(1);
        expect(customerB.unsettledStakeSum).toEqual(50);
    });
});