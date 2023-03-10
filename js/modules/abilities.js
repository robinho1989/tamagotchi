export default class Abilities {
	constructor() {
		console.log('Abilities module initialized');
	}
	abilities = ({ actionButtons }) => {
		const buttons = document.querySelectorAll(actionButtons);
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				if (button.classList.contains('feedingButton')) {
					console.log('click');
				}
			});
		});
	};
}
