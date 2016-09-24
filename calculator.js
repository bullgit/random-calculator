document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var buttons = document.querySelectorAll('button');

	var operators = {
		add: function (a, b) {
			return a + b;
		}
	};

	var outputIsResult = false;
	var operand1 = null;
	var operand2 = null;
	var operator = null;
	var lastClick = null;

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
		if (output === '0' || outputIsResult === true) {
			output = value;
			outputIsResult = false;
		} else {
			output = output + value;
		}
		renderOutput(output);
	};

	var clearOutput = function () {
		renderOutput(0);
		outputIsResult = false;
		operand1 = null;
		operand2 = null;
		operator = null;
	}

	var changeSign = function () {
		renderOutput(Number(getInput()) * -1);
		outputIsResult = true;
	};

	var percentage = function () {
		renderOutput(Number(getInput()) / 100);
		outputIsResult = true;
	};

	var makeFloat = function (e) {
		if (getInput().includes('.')) {
			e.target.blur();
		} else {
			if (getInput() === '0') {
				addToOutput('0.');
			} else {
				addToOutput('.');
			}
		}
	};

	var addition = function () {
		console.info('addition');
		outputIsResult = true;
		operator = 'add';
		if (operand1) {
			operand2 = Number(getInput());
			renderOutput(operators[operator](operand1, operand2));
			operand1 = Number(getInput());
		} else {
			operand1 = Number(getInput());
		}
	};

	var result = function () {
		operand2 = Number(getInput());
		renderOutput(operators[operator](operand1, operand2));
		outputIsResult = true;
		operand1 = Number(getInput());
	};

	for (var i = buttons.length; i--;) {
		buttons[i].addEventListener('click', function (e) {
			console.info(this.dataset);
			if (this.dataset.number) {
				addToOutput(this.dataset.number);
				lastClick = 'number';
			}
			if (this.dataset.action === 'clear') {
				clearOutput();
				lastClick = 'action';
			}
			if (this.dataset.action === 'sign') {
				changeSign();
				lastClick = 'action';
			}
			if (this.dataset.action === 'percent') {
				percentage();
				lastClick = 'action';
			}
			if (this.dataset.action === 'float') {
				makeFloat(e);
				lastClick = 'action';
			}
			if (this.dataset.action === 'add') {
				if (lastClick === 'action') {
					e.target.blur();
					return;
				}
				addition();
				lastClick = 'action';
			}
			if (this.dataset.action === 'equal') {
				if (lastClick === 'action') {
					e.target.blur();
					return;
				}
				result();
				lastClick = 'action';
			}
			e.target.blur();
		});
	}

});
