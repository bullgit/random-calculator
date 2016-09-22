document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var buttons = document.querySelectorAll('button');
	var outputIsResult = false;

	var setFontSize = function (size) {
		document.querySelectorAll('output')[0].style.fontSize = size + 'px';
	};

	var checkLength = function (output) {
		var length = String(output).length;
		if (length <= 7) {
			setFontSize('44');
		}
		if (length > 7) {
			setFontSize('22');
		}
		if (length > 14) {
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
	}

	var changeSign = function () {
		renderOutput(Number(getInput()) * -1);
		outputIsResult = true;
	};

	var percentage = function () {
		renderOutput(Number(getInput()) / 100);
		outputIsResult = true;
	};

	for (var i = buttons.length; i--;) {
		buttons[i].addEventListener('click', function (e) {
			console.info(this.dataset);
			if (this.dataset.number) {
				addToOutput(this.dataset.number);
			}
			if (this.dataset.action === 'clear') {
				clearOutput();
			}
			if (this.dataset.action === 'sign') {
				changeSign();
			}
			if (this.dataset.action === 'percent') {
				percentage();
			}
		});
	}

});
