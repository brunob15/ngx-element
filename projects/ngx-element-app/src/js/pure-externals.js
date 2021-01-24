const ngxElementTalk = {};

ngxElementTalk.addComponentListener = (selector, output, containerId) => {
	/**
	 * Take the instance of <ngx-element> component with the required selector attribute.
	 */
	const targetElement = document.querySelector(`ngx-element[selector="${selector}"]`);
	/**
	 * Attach a listener on it using the required name, that has to be used inside of Angular component as output name.
	 */
	targetElement.addEventListener(output, event => {
		const clickedTagsContainer = document.getElementById(containerId);
		const newSpan = document.createElement('span');
		newSpan.className='badge';
		/**
		 * The event property |detail| contains the emitted value.
		 */
		newSpan.innerText = event.detail;
		clickedTagsContainer.appendChild(newSpan);
		console.log(`... the component output |${output}| emitted an event:`, event);
	});

	console.log(`... a listener for |${output}| output on the Angular component with selector |${selector}| has been added!`);
};
