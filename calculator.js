document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var buttons = document.querySelectorAll('button');

	var operators = {
		add: function (a, b) {
			return a + b;
		}
	};

	var storage= {
		outputIsResult: false,
		operand1: null,
		operand2: null,
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
		storage.operand1 = null;
		storage.operand2 = null;
		storage.operator = null;
		storage.lastClick = null;
	}

	var changeSign = function () {
		renderOutput(Number(getInput()) * -1);
		if (storage.operand1) {
			storage.operand1 = Number(storage.operand1) * -1;
		}
		storage.outputIsResult = true;
	};

	var percentage = function () {
		renderOutput(Number(getInput()) / 100);
		storage.outputIsResult = true;
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
		storage.outputIsResult = true;
		storage.operator = 'add';
		if (storage.operand1) {
			storage.operand2 = Number(getInput());
			renderOutput(operators[storage.operator](storage.operand1, storage.operand2));
			storage.operand1 = Number(getInput());
		} else {
			storage.operand1 = Number(getInput());
		}
	};

	var result = function () {
		storage.operand2 = Number(getInput());
		renderOutput(operators[storage.operator](storage.operand1, storage.operand2));
		storage.outputIsResult = true;
		storage.operand1 = Number(getInput());
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
				storage.lastClick = 'action';
			}
			if (this.dataset.action === 'sign') {
				changeSign();
				storage.lastClick = 'number';
			}
			if (this.dataset.action === 'percent') {
				percentage();
				storage.lastClick = 'action';
			}
			if (this.dataset.action === 'float') {
				makeFloat(e);
				storage.lastClick = 'action';
			}
			if (this.dataset.action === 'add') {
				if (storage.lastClick === 'action') {
					e.target.blur();
					return;
				}
				addition();
				storage.lastClick = 'action';
			}
			if (this.dataset.action === 'equal') {
				if (storage.lastClick === 'action') {
					e.target.blur();
					return;
				}
				result();
				storage.lastClick = 'action';
			}
			e.target.blur();
		});
	}

});
