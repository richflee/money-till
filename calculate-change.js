

var changeMachine = (function() {
    var centsPerDollar = 100;

    var publicAPI = {
        isValidCurrency: function(money) {
            return !!money && typeof money === 'number';
        },
        convertToCents: function(dollars) {

            if (!dollars && dollars !== 0) {
                throw Error('Invalid dollars: please provide dollars!');
            }
            
            if (dollars < 0) {
                throw Error('Invalid dollars: negative dollars are invalid.');
            }

            return dollars * centsPerDollar;
        },
        returnChange: function(price, moneyPaid) {

            if (!moneyPaid) {
                if (!price) {
                    throw Error("Invalid transaction: No price or money paid.");
                } else {
                    throw Error("No money paid!");
                }
            }

            if (!price) {
                return moneyPaid;
            }

            if (!this.isValidCurrency(moneyPaid)) {
                throw Error("Invalid money: type of money must be number.");
            }

            if (moneyPaid < price) {
                throw Error("Not enough money for this item!");
            }

            return moneyPaid - price;
        },
        processChange: function(price, moneyPaid) {
            var changeInDollars = this.returnChange(price, moneyPaid);
            var changeInCents = this.convertToCents(changeInDollars);
            return this.returnChangeDenominations(changeInCents);
        },
        returnChangeDenominations: function calculateDenomiations(cents) {
            var denominations = {};
            var leftover;

            if (cents >= 10000) {
                denominations['100'] = Math.floor(cents / 10000);
                leftover = cents % 10000;
            }
            else if (cents >= 200) {
                denominations['2'] = Math.floor(cents / 200);
                leftover = cents % 200;
            }
            else if (cents >= 100) {
                denominations['1'] = Math.floor(cents / 100);
                leftover = cents % 100;
            }
            else if (cents >= 50) {
                denominations['50 cents'] = Math.floor(cents / 50);
                leftover = cents % 50;
            }
            else if (cents >= 20) {
                denominations['20 cents'] = Math.floor(cents / 20);
                leftover = cents % 20;
            }
            else if (cents >= 10) {
                denominations['10 cents'] = Math.floor(cents / 10);
                leftover = cents % 10;
            }
            else if (cents >= 5) {
                denominations['5 cents'] = Math.floor(cents / 5);
                leftover = cents % 5;
            }
            
            if (leftover > 0) { 
                var moreDenominations = calculateDenomiations(leftover);
                var finalDenominations = Object.assign({}, denominations, moreDenominations);
                return finalDenominations;
            } else {
                return denominations;
            }
        }        
    }
    return publicAPI;
})();


module.exports = changeMachine;
