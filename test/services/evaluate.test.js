const assert = require('assert');
const app = require('../../src/app');
const chai = require('chai');
const expect = chai.expect;

describe('\'evaluate\' service', () => {

	it('registered the service', () => {
		const service = app.service('evaluate');
		assert.ok(service, 'Registered the service');
	});
	const evaluate = app.service('evaluate');
	context('isDigit', () => {

		it('operators should return false', () => {
			expect(evaluate.isDigit('+')).to.be.false;
			expect(evaluate.isDigit('-')).to.be.false;
			expect(evaluate.isDigit('/')).to.be.false;
			expect(evaluate.isDigit('*')).to.be.false;
		});
		it('digits & period should return true', () => {
			expect(evaluate.isDigit('0')).to.be.true;
			expect(evaluate.isDigit('10')).to.be.true;
			expect(evaluate.isDigit('.')).to.be.true;
		});
	});

	context('isOperator', () => {
		it('operators and parenthesis should return true', () => {
			expect(evaluate.isOperator('^')).to.be.true;
			expect(evaluate.isOperator('+')).to.be.true;
			expect(evaluate.isOperator('-')).to.be.true;
			expect(evaluate.isOperator('/')).to.be.true;
			expect(evaluate.isOperator('*')).to.be.true;
			expect(evaluate.isOperator('(')).to.be.true;
			expect(evaluate.isOperator(')')).to.be.true;
		});
		it('digits, alphabets & period should return false', () => {
			expect(evaluate.isOperator('0')).to.be.false;
			expect(evaluate.isOperator('10')).to.be.false;
			expect(evaluate.isOperator('.')).to.be.false;
		});
	});

	context('precedence', () => {
		it('should return correct precedence', () => {
			expect(evaluate.precedence('^')).to.be.equal(3);
			expect(evaluate.precedence('*')).to.be.equal(2);
			expect(evaluate.precedence('/')).to.be.equal(2);
			expect(evaluate.precedence('+')).to.be.equal(1);
			expect(evaluate.precedence('-')).to.be.equal(1);
			expect(evaluate.precedence('1')).to.be.equal(-1);
			expect(evaluate.precedence('a')).to.be.equal(-1);
		});
	});

	context('convertToPostfix', () => {
		it('should return expression in postfix notation', () => {
			expect(evaluate.convertToPostfix(['1', '+', '2', '*', '(', '3', '^', '4', '-', '5', ')', '^', '(', '6', '+', '7', '*', '8', ')', '-', '9']))
				.to.be.deep.equal(['1', '2', '3', '4', '^', '5', '-', '6', '7', '8', '*', '+', '^', '*', '+', '9', '-']);
		});
	});

	context('postfixEvaluation', () => {
		it('should evaluate the postfix expression', () => {
			expect(evaluate.postfixEvaluation(['1', '2', '+', '3', '+']))
				.to.be.equal(6);
			expect(evaluate.postfixEvaluation(['1', '2', '+', '3', '+', '6', '/', '2', '3', '^', '+', '9', '-']))
				.to.be.equal(0);
		});
	});

	context('tokenizeExpression', () => {
		it('should tokenize expression', () => {
			expect(evaluate.tokenizeExpression('(4+1)/2')).to.be.deep.equal(['(', '4', '+', '1', ')', '/', '2']);
			expect(evaluate.tokenizeExpression('-2+2')).to.be.deep.equal(['-2', '+', '2']);
			expect(evaluate.tokenizeExpression('-42+2')).to.be.deep.equal(['-42', '+', '2']);
			expect(evaluate.tokenizeExpression('4+42/2')).to.be.deep.equal(['4', '+', '42', '/', '2']);
			expect(evaluate.tokenizeExpression('(1+2)/3*(4-5)')).to.be.deep.equal(['(', '1', '+', '2', ')', '/', '3', '*', '(', '4', '-', '5', ')']);
		});
	});

	context('validateExpression', () => {
		it('should validate correct expressions as true', () => {
			expect(evaluate.validateExpression(['(', '4', '+', '1', ')', '/', '2'])).to.be.true;
			expect(evaluate.validateExpression(['-2', '+', '2'])).to.be.true;
			expect(evaluate.validateExpression(['-42', '+', '2'])).to.be.true;
			expect(evaluate.validateExpression(['4', '+', '42', '/', '2'])).to.be.true;
			expect(evaluate.validateExpression(['(', '1', '+', '2', ')', '/', '3', '*', '(', '4', '-', '5', ')'])).to.be.true;
		});
		it('should validate incorrect expressions as false', () => {
			expect(evaluate.validateExpression(['-', '+', '1'])).to.be.false;
			expect(evaluate.validateExpression(['1', '+', '-',])).to.be.false;
			expect(evaluate.validateExpression(['(', '4', '+', '1', '(', '2'])).to.be.false;
			expect(evaluate.validateExpression([')', '1', '+', '2',])).to.be.false;
			expect(evaluate.validateExpression(['(', '1', '+', '2', ')', ')',])).to.be.false;
		});

	});

});
