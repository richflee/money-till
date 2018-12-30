var changeMachine = require('./calculate-change');

describe('processCahnge', () => {
    test('returns 1 X 1 dollar change, for 5 dollars given for 4 dollar item', () => {
        var denominations = {
            '1': 1
        };
        expect(changeMachine.processChange(4, 5)).toEqual(denominations);
    });
    test('returns 1 X 1 dollar change 1 x 50 cents 1 x 20 cents 1 x 5 cents, for 5 dollars given for 3.23 dollar item', () => {
        var denominations = {
            '1': 1,
            '50 cents': 1,
            '20 cents': 1,
            '5 cents': 1
        };
        expect(changeMachine.processChange(3.23, 5)).toEqual(denominations);
    });
});

describe('convertToCents', () => {
    test('returns 100 when given 1', () => {
        expect(changeMachine.convertToCents(1)).toEqual(100);
    });

    test('returns 150 when given 1.5', () => {
        expect(changeMachine.convertToCents(1.5)).toEqual(150);
    });

    test('returns 199 when given 1.99', () => {
        expect(changeMachine.convertToCents(1.99)).toEqual(199);
    });

    test('returns 1325 when given 13.25', () => {
        expect(changeMachine.convertToCents(13.25)).toEqual(1325);
    });

    test('returns 0 when given 0', () => {
        expect(changeMachine.convertToCents(0)).toEqual(0);
    });

    test('throws an Error when given undefined', () => {
        expect(function() { changeMachine.convertToCents(undefined); }).toThrow(Error);
    });

    test('throws an Error when given null', () => {
        expect(function() { changeMachine.convertToCents(null); }).toThrow(Error);
    });

    test('throws an Error when given -0.05', () => {
        expect(function() { changeMachine.convertToCents(-0.05); }).toThrow(Error);
    });
});

describe('returnChangeDenominations', () => {
    test('returns 1 x 2 Dollar for 200 cents change', () => {
        var denominations = {
            '2': 1
        };
        expect(changeMachine.returnChangeDenominations(200)).toEqual(denominations);
    });

    test('returns 1 x 2 Dollar, 1 X 1 dollar for 300 cents change', () => {
        var denominations = {
            '2': 1,
            '1': 1
        };
        expect(changeMachine.returnChangeDenominations(300)).toEqual(denominations);
    });

    test('returns 1 x 2 Dollar, 1 X 1 dollar, 1 x 5 cents for 305 cents change', () => {
        var denominations = {
            '2': 1,
            '1': 1,
            '5 cents': 1
        };
        expect(changeMachine.returnChangeDenominations(305)).toEqual(denominations);
    });

    test('returns 1 x 50 cents, 1 X 10 cents, 1 x 5 cents for 67 cents change', () => {
        var denominations = {
            '50 cents': 1,
            '10 cents': 1,
            '5 cents': 1
        };
        expect(changeMachine.returnChangeDenominations(67)).toEqual(denominations);
    });
});

describe('isValidCurrency', () => {
    test('returns false when money is not provided', () => {
        expect(changeMachine.isValidCurrency()).toBe(false);
    });

    test('returns false when null is provided', () => {
        expect(changeMachine.isValidCurrency(null)).toBe(false);
    });

    test('returns false when undefined is provided', () => {
        expect(changeMachine.isValidCurrency(undefined)).toBe(false);
    });

    test('returns false when -1 is provided', () => {
        expect(changeMachine.isValidCurrency(-1)).toBe(false);
    });

    test('returns false when "" is provided', () => {
        expect(changeMachine.isValidCurrency("")).toBe(false);
    });

    test('returns false when "1" is provided', () => {
        expect(changeMachine.isValidCurrency("1")).toBe(false);
    });
});

describe('returnChange', () => {
    test('returns 1 for a 9 dollar item paid for by 10', () => {
        expect(changeMachine.returnChange(9, 10)).toBe(1);
    });
    
    test('return 3.5 for a 1.5 dollar item paid for by 5', () => {
        expect(changeMachine.returnChange(1.5, 5)).toBe(3.5);
    });

    test('return 5 for an item with undefined price paid for by 5', () => {
        expect(changeMachine.returnChange(undefined, 5)).toBe(5);
    });

    test('throws an Error when moneyPaid is not provided', () => {
        expect(function() { changeMachine.returnChange(10) }).toThrow(Error);
    });

    test('throws an Error when 5 dollar item is paid for with 4 dollars', () => {
        expect(function() { changeMachine.returnChange(5, 4) }).toThrow(Error);
    });

    test('throws an Error when no price provided and no money provided', () => {
        expect(function() { changeMachine.returnChange() }).toThrow('Invalid transaction');
    });

    test('throws an Error when money provided is "Foo"', () => {
        expect(function() { changeMachine.returnChange(10, "Foo") }).toThrow('Invalid money');
    });
});

