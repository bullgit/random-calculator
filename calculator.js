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
			setFontSize('11');
		}
		if (length > 24) {
			debugger;
			clearOutput();
			addToOutput('TILT!!!');
			return;
		}
	};

	var addToOutput = function (value) {
		var output = document.querySelectorAll('output')[0].textContent;
		// console.info('output', output);
		// console.info('typeof output', typeof output);
		if (output === 'TILT!!!') {
			return;
		}
		if (output === '0' || outputIsResult === true) {
			output = value;
			outputIsResult = false;
		} else {
			output = output + value;
		}
		document.querySelectorAll('output')[0].textContent = output;
		checkLength(output);
	};

	var clearOutput = function () {
		document.querySelectorAll('output')[0].textContent = 0;
		setFontSize('44');
		outputIsResult = false;
	}

	var changeSign = function () {
		var input = document.querySelectorAll('output')[0].textContent;
		var output = input * -1;
		document.querySelectorAll('output')[0].textContent = output;
		checkLength(output);
		outputIsResult = true;
	};

	var percentage = function () {
		var input = document.querySelectorAll('output')[0].textContent;
		var output = input / 100;
		document.querySelectorAll('output')[0].textContent = output;
		checkLength(output);
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
