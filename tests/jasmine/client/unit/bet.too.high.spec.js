describe('Too high unsettled bet', function () {
    'use strict';

    it('should NOT be less than $1000', function () {
        //arrange

        //act
        var unsettledBet = new UnsettledBet(null, null, null, 100, 200);

        //assert
        expect(unsettledBet.isHigh()).toBeFalsy();
    });

    it('should be at-least $1000', function () {
        //arrange

        //act
        var unsettledBet = new UnsettledBet(null, null, null, 500, 1000);

        //assert
        expect(unsettledBet.isHigh()).toBeTruthy();
    });
});