document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var buttons = document.querySelectorAll('button');

	var addToOutput = function (value) {
		var text = document.querySelectorAll('output')[0].textContent;
		console.info('text', text);
		console.info('typeof text', typeof text);
		if (text === '0') {
			document.querySelectorAll('output')[0].textContent = value;
		} else {
			document.querySelectorAll('output')[0].textContent = text + value;
		}
	};

	var clearOutput = function () {
		document.querySelectorAll('output')[0].textContent = 0;
	}

	for (var i = buttons.length; i--;) {
		buttons[i].addEventListener('click', function (e) {
			console.info(this.dataset);
			if (this.dataset.value) {
				addToOutput(Number(this.dataset.value));
			}
			if (this.dataset.action === 'clear') {
				clearOutput();
			}
		});
	}

});
