const assert = require('chai').assert;
const calc = require('../src/calc');

describe('calc.js => tests calculator fn', () => {
	describe('calc.add()', () => {
		it('this fn should return sum', () => {
			assert.equal(calc.add(1, 2), 3);
		});
	});

	describe('calc.mul()', () => {
		it('this fn should return multiplication', () => {
			assert.equal(calc.mul(1, 2), 2);
		});

		it('cal.mul() should return number', () => {
			let mul = calc.mul(1, 2);
			assert.typeOf(mul, 'number');
		});

		it('cal.mul() should return >= 2', () => {
			let mul = calc.mul(1, 2);
			assert.isAtLeast(mul, 2);
		});

		it('cal.mul() should return > 1', () => {
			let mul = calc.mul(1, 2);
			assert.isAbove(mul, 1);
		});
	});
});
