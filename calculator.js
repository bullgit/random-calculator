document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var buttons = document.querySelectorAll('button');

	var operators = {
		add: function (a, b) {
			return a + b;
		},
		subtract: function (a, b) {
			return a - b;
		},
		multiply: function (a, b) {
			return a * b;
		},
		divide: function (a, b) {
			return a / b;
		}
	};

	var storage= {
		outputIsResult: false,
		operands: [],
		operator: null,
		lastClick: null
	};

	var checkLength = function (output) {
		var length = String(output).length;
		if (length <= 8) {
			document.querySelectorAll('output')[0].classList.remove('small-text');
		}
		if (length > 8) {
			document.querySelectorAll('output')[0].classList.add('small-text');
		}
		if (length > 17) {
			debugger;
			clearOutput();
			addToOutput('TILT!');
			return;
		}
	};

	var renderOutput = function (output) {
		document.querySelectorAll('output')[0].textContent = output;
		checkLength(output);
	};

	var getInput = function () {
		return document.querySelectorAll('output')[0].textContent;
	}

	var addToOutput = function (value) {
		var output = getInput();

		if (output === 'TILT!') {
			return;
		}
		if (output === '0' || storage.outputIsResult === true) {
			output = value;
			storage.outputIsResult = false;
		} else {
			output = output + value;
		}
		renderOutput(output);
	};

	var clearOutput = function () {
		renderOutput(0);
		storage.outputIsResult = false;
		storage.operands = [];
		storage.operator = null;
		storage.lastClick = null;
	}

	var changeSign = function () {
		renderOutput(Number(getInput()) * -1);
		if (storage.lastClick !== 'number') {
			storage.operands.pop();
			storage.operands.push(Number(getInput()));
		}
		storage.outputIsResult = true;
	};

	var percentage = function () {
		renderOutput(Number(getInput()) / 100);
		storage.outputIsResult = true;
	};

	var makeFloat = function (e) {
		if (!getInput().includes('.') || storage.outputIsResult) {
			if (getInput() === '0' || storage.lastClick !== 'number') {
				addToOutput('0.');
			} else {
				addToOutput('.');
			}
		} else {
			e.target.blur();
		}
	};

	var operate = function (operator) {
		if (storage.lastClick === 'add' ||
				storage.lastClick === 'subtract' ||
				storage.lastClick === 'multiply' ||
				storage.lastClick === 'divide' ||
				storage.lastClick === 'equal' ||
				storage.lastClick === 'sign') {
			storage.operator = operator;
			return false;
		}
		console.info('operate with:', operator);
		storage.outputIsResult = true;
		if (!storage.operator) {
			storage.operator = operator;
		}
		storage.operands.push(Number(getInput()));

		if (storage.operands.length === 2) {
			renderOutput(operators[storage.operator](storage.operands[0], storage.operands[1]));
			storage.operands.push(Number(getInput()));
			storage.operands.splice(0, 2);
			storage.operator = operator;
		}
	};

	var result = function () {
		if (storage.operands.length === 0 || storage.lastClick === 'equal') {
			console.info('return false');
			return false;
		}

		storage.outputIsResult = true;
		storage.operands.push(Number(getInput()));
		renderOutput(operators[storage.operator](storage.operands[0], storage.operands[1]));
		storage.operands.push(Number(getInput()));
		storage.operands.splice(0, 2);

	};

	for (var i = buttons.length; i--;) {
		buttons[i].addEventListener('click', function (e) {
			console.info(this.dataset);
			if (this.dataset.number) {
				addToOutput(this.dataset.number);
				storage.lastClick = 'number';
			}
			if (this.dataset.action === 'clear') {
				clearOutput();
				storage.lastClick = this.dataset.action;
			}
			if (this.dataset.action === 'sign') {
				changeSign();
				storage.lastClick = this.dataset.action;
			}
			if (this.dataset.action === 'percent') {
				percentage();
				storage.lastClick = this.dataset.action;
			}
			if (this.dataset.action === 'float') {
				makeFloat(e);
				storage.lastClick = this.dataset.action;
			}
			if (this.dataset.action === 'divide' || this.dataset.action === 'multiply' || this.dataset.action === 'subtract' || this.dataset.action === 'add') {
				operate(this.dataset.action);
				storage.lastClick = this.dataset.action;
			}
			if (this.dataset.action === 'equal') {
				result();
				storage.lastClick = this.dataset.action;
			}
			e.target.blur();
		});
	}

});
