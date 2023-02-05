import { SingleFridgePostForm } from './SingleFridgePostForm';
import SingleFridgePostsDisplay from './SingleFridgePostsDisplay';
import React, { useContext, useState } from 'react';
import { containsExplicitText, dateTimeToReadable, todaysDateShortened } from '../../utils/utils';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';

/**
 * Creates an information panel for the currently selected fridge that includes contact information,
 * data from the database, and a way for users to interact with posts to the selected fridge.
 * Relies on the SelectedFridge Context for rendering.
 * @return {JSX.Element} An informative panel on a single community fridge.
 */
export function SingleFridgeInfoDisplay() {
	// this is the fridge for which the information is being produced.
	const thisSelectedFridge = useContext(SelectedFridgeContext);
	// the state that holds the current form input
	const [input, updateForm] = useState('');

	// perform this function when the Bootstrap form for posts is submitted.
	function handleSubmit(
		e: { preventDefault: () => void; }
	) {
		e.preventDefault();
		// check for explicit text before posting the text to the fridge's feed
		if (!containsExplicitText(input) && thisSelectedFridge) {
			// place the most recent post at the top of the list of posts
			thisSelectedFridge.posts.unshift([input, todaysDateShortened()]);
		}
		updateForm(''); // clear the form
	}

	// tracks any changes to the form input
	const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		updateForm(e.target.value);
	};

	let selectedFridgeDisplayOrNone = <></>;
	if (thisSelectedFridge) {
		// replace the lastOpen string with more human-readable string
		const thisSelectedFridgeOpened = dateTimeToReadable(thisSelectedFridge);
		// get the current temperature of the fridge
		const thisSelectedFridgeTemp = thisSelectedFridge.temperature;
		selectedFridgeDisplayOrNone = (
			<div style={{ overflowY: "scroll", maxHeight: '28vh', minHeight: '-webkit-fit-content', WebkitOverflowScrolling: "touch", pointerEvents: 'auto'}}>
				<h3 aria-label={'fridgeLastVisit'}>{'Last Visit: '}
					<h4>{thisSelectedFridgeOpened || 'Not Available'}</h4>
				</h3>
				<h3 aria-label={'fridgeCurrentTemperature'}>
					{'Current Temperature: '}
					<h4>{thisSelectedFridgeTemp == -1 ? 'Not Available' : thisSelectedFridgeTemp}</h4>
				</h3>
				<SingleFridgePostForm handleSubmit={handleSubmit} handleChange={handleChange} input={input}/>
				<h3 style={{marginTop:'-5px'}}>Previous Posts:</h3>
				<SingleFridgePostsDisplay />
			</div>
		)
	}

	return (
		<div aria-label={'singleFridgeInfoDisplay'}>
			{selectedFridgeDisplayOrNone}
		</div>
	);
}
