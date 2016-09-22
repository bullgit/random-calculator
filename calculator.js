document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var buttons = document.querySelectorAll('button');

	var setFontSize = function (size) {
		document.querySelectorAll('output')[0].style.fontSize = size + 'px';
	};

	var checkLength = function (output) {
		var length = output.length;
		if (length > 7) {
			setFontSize('22');
		}
		if (length > 14) {
			setFontSize('11');
		}
		if (length > 24) {
			clearOutput();
			addToOutput('TILT!!!');
		}
	};

	var addToOutput = function (value) {
		var output = document.querySelectorAll('output')[0].textContent;
		// console.info('output', output);
		// console.info('typeof output', typeof output);
		if (output === 'TILT!!!') {
			return;
		}
		if (output === '0') {
			output = value;
		} else {
			output = output + value;
		}
		document.querySelectorAll('output')[0].textContent = output;
		checkLength(output);
	};

	var clearOutput = function () {
		document.querySelectorAll('output')[0].textContent = 0;
		setFontSize('44');
	}

	for (var i = buttons.length; i--;) {
		buttons[i].addEventListener('click', function (e) {
			console.info(this.dataset);
			if (this.dataset.value) {
				addToOutput(this.dataset.value);
			}
			if (this.dataset.action === 'clear') {
				clearOutput();
			}
		});
	}

});
