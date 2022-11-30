import { HEAVY_WEIGHT as weight } from '../constants/constants';
import { SingleFridgePostForm } from './SingleFridgePostForm';
import SingleFridgePostsDisplay from './SingleFridgePostsDisplay';
import React, { useContext, useState } from 'react';
import { containsExplicitText, dateTimeToReadable, todaysDateShortened } from '../utils/utils';
import SelectedFridgeContext from '../contexts/SelectedFridgeContext';

/**
 * Creates an information panel for the currently selected fridge that includes contact information,
 * data from the database, and a way for users to interact with posts to the selected fridge.
 * Relies on the SelectedFridge Context for rendering.
 * @return {JSX.Element} An informative panel on a single community fridge.
 */
export function SingleFridgeInfoDisplay() {
	// this is the fridge for which the information is being produced.
	const thisSelectedFridge = useContext(SelectedFridgeContext);
	// replace the lastOpen string with more human-readable string
	const thisSelectedFridgeOpened = dateTimeToReadable(thisSelectedFridge);
	// get the current temperature of the fridge
	const thisSelectedFridgeTemp = thisSelectedFridge.temperature;
	// the state that holds the current form input
	const [input, updateForm] = useState('');

	// perform this function when the Bootstrap form for posts is submitted.
	function handleSubmit(e) {
		e.preventDefault();
		// check for explicit text before posting the text to the fridge's feed
		if (!containsExplicitText(input)) {
			// place the most recent post at the top of the list of posts
			thisSelectedFridge.posts.unshift([input, todaysDateShortened()]);
		}
		updateForm(''); // clear the form
	}

	// tracks any changes to the form input
	const handleChange = (e) => {
		updateForm(e.target.value);
	};

	return (
		<div aria-label={'singleFridgeInfoDisplay'}>
			<div>
				<lastVisit style={{ fontWeight: weight }} aria-label={'fridgeLastVisit'}>{'Last Visit: '}</lastVisit>
				{thisSelectedFridgeOpened || 'Not Available'}
			</div>
			<temperature style={{ fontWeight: weight }} aria-label={'fridgeCurrentTemperature'}>{'Current Temperature: '}</temperature>
			{thisSelectedFridgeTemp || 'Not Available'}
			<SingleFridgePostForm handleSubmit={handleSubmit} handleChange={handleChange} input={input}/>
			<div style={{ fontWeight: weight, paddingTop: '5px' }}>Previous Posts:</div>
			<SingleFridgePostsDisplay />
		</div>
	);
}
