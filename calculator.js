(function () {
	'use strict';

	var randomOperators = true;
	var randomOperatorsPool = [
		'add',
		'subtract',
		'multiply',
		'divide'
	];

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
			document.querySelector('output').classList.remove('small-text');
			document.querySelector('output').classList.remove('extra-small-text');
		}
		if (length > 8) {
			document.querySelector('output').classList.add('small-text');
		}
		if (length > 17) {
			document.querySelector('output').classList.remove('small-text')
			document.querySelector('output').classList.add('extra-small-text');
		}
		if (length > 29) {
			clearOutput();
			addToOutput('TILT!');
			return;
		}
	};

	var renderOutput = function (output) {
		document.querySelector('output').textContent = output;
		checkLength(output);
	};

	var getInput = function () {
		return document.querySelector('output').textContent;
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
		var base = - Math.random() * 10;
		renderOutput(Number(getInput()) * base);
		if (storage.lastClick !== 'number') {
			storage.operands.pop();
			storage.operands.push(Number(getInput()));
		}
		storage.outputIsResult = true;
	};

	var percentage = function () {
		var base = Math.pow(Math.random(), 2);
		renderOutput(Number(getInput()) / base);
		if (storage.lastClick !== 'number') {
			storage.operands.pop();
			storage.operands.push(Number(getInput()));
		}
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
				storage.lastClick === 'percent' ||
				storage.lastClick === 'sign') {
			storage.operator = operator;
			return false;
		}
		// console.info('operate with:', operator);
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
			return false;
		}

		storage.outputIsResult = true;
		storage.operands.push(Number(getInput()));
		renderOutput(operators[storage.operator](storage.operands[0], storage.operands[1]));
		storage.operands.push(Number(getInput()));
		storage.operands.splice(0, 2);

	};

	var registerEvents = function () {

		// Register click events on buttons
		for (var i = buttons.length; i--;) {
			buttons[i].addEventListener('click', function (e) {
				// console.info(this.dataset);
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
					if (randomOperators) {
						operate(randomOperatorsPool[Math.round(Math.random() * (3 - 0) + 0)])
					} else {
						operate(this.dataset.action);
					}
					storage.lastClick = this.dataset.action;
				}
				if (this.dataset.action === 'equal') {
					result();
					storage.lastClick = this.dataset.action;
				}
				setTimeout(function(){
					e.target.blur();
				}, 50);

			});
		}

		// Register key event
		document.addEventListener('keydown', function (e) {
			// console.log('keyCode', e);
			switch (e.key) {
				case '1':
					document.querySelector('button[data-number="1"]').focus();
					document.querySelector('button[data-number="1"]').click();
					break;
				case '2':
					document.querySelector('button[data-number="2"]').focus();
					document.querySelector('button[data-number="2"]').click();
					break;
				case '3':
					document.querySelector('button[data-number="3"]').focus();
					document.querySelector('button[data-number="3"]').click();
					break;
				case '4':
					document.querySelector('button[data-number="4"]').focus();
					document.querySelector('button[data-number="4"]').click();
					break;
				case '5':
					document.querySelector('button[data-number="5"]').focus();
					document.querySelector('button[data-number="5"]').click();
					break;
				case '6':
					document.querySelector('button[data-number="6"]').focus();
					document.querySelector('button[data-number="6"]').click();
					break;
				case '7':
					document.querySelector('button[data-number="7"]').focus();
					document.querySelector('button[data-number="7"]').click();
					break;
				case '8':
					document.querySelector('button[data-number="8"]').focus();
					document.querySelector('button[data-number="8"]').click();
					break;
				case '9':
					document.querySelector('button[data-number="9"]').focus();
					document.querySelector('button[data-number="9"]').click();
					break;
				case '0':
					document.querySelector('button[data-number="0"]').focus();
					document.querySelector('button[data-number="0"]').click();
					break;
				case 'c':
					document.querySelector('button[data-action="clear"]').focus();
					document.querySelector('button[data-action="clear"]').click();
					break;
				case 'Clear':
					document.querySelector('button[data-action="clear"]').focus();
					document.querySelector('button[data-action="clear"]').click();
					break;
				case '/':
					document.querySelector('button[data-action="divide"]').focus();
					document.querySelector('button[data-action="divide"]').click();
					break;
				case 'Enter':
					document.querySelector('button[data-action="equal"]').focus();
					document.querySelector('button[data-action="equal"]').click();
					break;
				case '=':
					document.querySelector('button[data-action="equal"]').focus();
					document.querySelector('button[data-action="equal"]').click();
					break;
				case '%':
					document.querySelector('button[data-action="percent"]').focus();
					document.querySelector('button[data-action="percent"]').click();
					break;
				case '*':
					document.querySelector('button[data-action="multiply"]').focus();
					document.querySelector('button[data-action="multiply"]').click();
					break;
				case '-':
					document.querySelector('button[data-action="subtract"]').focus();
					document.querySelector('button[data-action="subtract"]').click();
					break;
				case '+':
					document.querySelector('button[data-action="add"]').focus();
					document.querySelector('button[data-action="add"]').click();
					break;
				case '.':
					document.querySelector('button[data-action="float"]').focus();
					document.querySelector('button[data-action="float"]').click();
					break;
				case ',':
					document.querySelector('button[data-action="float"]').focus();
					document.querySelector('button[data-action="float"]').click();
					break;
			}
		});
	};

	document.addEventListener('DOMContentLoaded', function () {
		registerEvents();
	});

}());

