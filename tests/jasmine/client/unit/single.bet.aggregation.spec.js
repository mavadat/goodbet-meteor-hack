describe('', function () {
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

    describe('Single bet aggregate calculation', function () {
        it('should have no settled/unsettled bet history when no settled bet is imported for', function () {
            //arrange

            //act
            //none - no settled bet to add to the customer

            //assert
            expect(customer.settledBetCount).toEqual(0);
            expect(customer.settledStakeSum).toEqual(0);
            expect(customer.winCount).toEqual(0);
            expect(customer.unsettledBetCount).toEqual(0);
            expect(customer.unsettledStakeSum).toEqual(0);        });
    })
});