const Stack = require('./stack');
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
		if (ch === '^' || ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '(' || ch === ')') return true;
		else return false;
	}

	isDecimal(ch) {
		if (ch === '.') return true;
		else return false;
	}

	precedence(ch) {
		if (ch === '^')
			return 3;
		else if (ch === '*' || ch === '/')
			return 2;
		else if (ch === '+' || ch === '-')
			return 1;
		else
			return -1;
	}

	isParenthesis(ch) {
		if (ch === '(' || ch === ')') return true;
		return false;
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

			if (this.isOperator(str[i])) {
				if (numBuffer !== "") {
					tokenArray.push(numBuffer);
					numBuffer = "";
				}
				tokenArray.push(str[i]);
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
		let evaluationResult = {
			error: null,
			result: null
		}
		if (this.validateExpression(tokenArray)) {
			console.log("lul");
		}
		else {

			let postfixArray = this.convertToPostfix(tokenArray);
			evaluationResult.error = "Parse Error";
		}
		return evaluationResult;
	}

	convertToPostfix(tokenArray) {
		let stack = new Stack();

		let postfixArray = [];

		tokenArray.forEach(token => {

			if (this.isDigit(token)) {
				postfixArray.push(token);
			}

			else if (this.isOperator(token) && !this.isParenthesis(token)) {
				if (this.precedence(token) > this.precedence(stack.top())) {
					stack.push(token);
				}
				else {
					while (!this.isParenthesis(stack.top()) && !(this.precedence(stack.top()) < this.precedence(token))) {
						//if (this.precedence(stack.top()) >= this.precedence(token)) {
						let op = stack.pop();
						postfixArray.push(op);
						//		}
						//		else break;
					}
					stack.push(token);
				}
			}

			else if (token === '(') {
				stack.push(token);
			}

			else if (token === ')') {
				let op = stack.pop();
				while (op !== '(') {
					postfixArray.push(op);
					op = stack.pop();
				}
			}

		});
		while (!stack.isEmpty()) {
			postfixArray.push(stack.pop());
		}
		return postfixArray;
	}

	async create(data, params) {
		let expression = data.expression;

		let tokenArray = this.tokenizeExpression('1+2*(3^4-5)^(6+7*8)-9');

		let result = this.evaluate(tokenArray);
		return result;
	}
};
