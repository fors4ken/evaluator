const assert = require('assert');
const app = require('../../src/app');
const chai = require('chai');
const expect = chai.expect;

describe('\'evaluate\' service', () => {

	it('registered the service', () => {
		const service = app.service('evaluate');
		assert.ok(service, 'Registered the service');
	});

	context('isDigit', () => {
		const evaluate = app.service('evaluate');
		it('operators should return false', () => {
			expect(evaluate.isDigit('+')).to.be.false;
			expect(evaluate.isDigit('-')).to.be.false;
			expect(evaluate.isDigit('/')).to.be.false;
			expect(evaluate.isDigit('*')).to.be.false;
		});
		it('digits & . should return true', () => {
			expect(evaluate.isDigit('0')).to.be.true;
			expect(evaluate.isDigit('10')).to.be.true;
			expect(evaluate.isDigit('.')).to.be.true;
		});
	});

});
