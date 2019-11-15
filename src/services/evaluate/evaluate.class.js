/* eslint-disable no-unused-vars */
exports.Evaluate = class Evaluate {
	constructor(options) {
		this.options = options || {};
	}

	isDigit(ch) {
		if (ch === '.') return true;
		if (isNaN(ch)) return false;
		else return true;
	}

	isOperator(ch) {
		if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '(' || ch === ')') return true;
		else return false;
	}

	isDecimal(ch) {
		if (ch === '.') return true;
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
		str = str.split("");
		let tokenArray = [];
		let numBuffer = "";
		for (let i = 0; i < str.length; i++) {

			if (this.isOperator(str[i]) && str[i] !== '-') {
				if (numBuffer !== "") {
					tokenArray.push(numBuffer);
					numBuffer = "";
				}
				tokenArray.push(str[i]);
			}
			else if (str[i] === '-') {
				if (i > 0 && this.isDigit(str[i - 1])) {
					if (numBuffer) {
						tokenArray.push(numBuffer);
						numBuffer = "";
					}
					tokenArray.push(str[i]);
				}
				else {
					numBuffer = numBuffer + str[i];
				}
			}

			else if (this.isDigit(str[i])) {
				numBuffer = numBuffer + str[i];
			}
		}
		if (numBuffer) {
			tokenArray.push(numBuffer);
		}
		return tokenArray;

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
		this.tokenizeExpression('(1+2)/3*(4-5)');
	}
};
