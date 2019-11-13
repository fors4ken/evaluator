/* eslint-disable no-unused-vars */
exports.Evaluate = class Evaluate {
	constructor(options) {
		this.options = options || {};
	}

	isDigit(str) {
		if (isNaN(str)) return false;
		else return true;
	}

	isOperator(str) {
		if (str === '+' || str === '-' || str === '*' || str === '/' || str === '(' || str === ')') return true;
		else return false;
	}

	/**
	 * 
	 * @param {string} str Expression string
	 * @returns {Array} tokenArray
	 * @description Converts an expression string into tokens
	 * @example '(a+b)/c' --> ['(','a','+','b',')','/','c']
	 */
	tokenizeExpression(str) {
	}

	/**
	 * 
	 * @param {Array} tokenArray Token array to validate
	 * @returns {Boolean} boolean
	 * @description Returns true if the tokenized expression is valid otherwise false
	 */
	validateExpression(tokenArray) {

	}


	/**
	 * 
	 * @param {Array} tokenArray Token array to evaluate
	 * @returns {number} Evaluated result
	 * @description Evaluates a mathematical expression
	 */
	evaluate(tokenArray) {

	}

	async create(data, params) {
		let expression = data.expression;
	}
};
