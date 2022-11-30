import SingleFridgeListButton from './SingleFridgeListButton';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DataContext from '../contexts/DataContext';
import { setDistanceFromUser, sortByDistanceToFridge } from '../utils/utils';
import {
	SECONDARY_BUTTON_COLOR as secondaryButtonColor,
	DEFAULT_TEXT_SIZE as textSize,
} from '../constants/constants';

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * Relies on DataContext to render the list of fridges.
 * @param props will at least include a value for located, the location of the user, if
 *              found prior to this component being rendered; toggleAlert, the function
 *              to be called if the distance sort is called without the user being located;
 *              and updateSelected, the state updater for the currently selected fridge.
 * @return {JSX.Element} A list of interactive buttons representing the community fridges.
 */
export default function AllFridgesButtonList(props) {
	// get the Google Sheets data from the DataContext
	const data = useContext(DataContext);
	// get the location of the user (LtLng | undefined)
	const userLocation = props.located;
	// get the function that toggles the un-located alert to the user.
	const toggleAlert = props.toggleAlert;
	// the function to update the selected fridge.
	const updatedCurrentlySelectedFridge = props.updateSelected;
	// holds the current list of fridges as pulled from the database
	let [fridgesDisplay, updateFridgesDisplay] = useState(data);
	// determines whether to sort the fridges during each render
	let [sortByDistanceToUser, setSortByDistanceToUser] = useState(false);

	/**
	 * Check to see if the fridge distances have been set, and if they have, sort the list
	 * state that is being displayed based on the distance field.
	 */
	useEffect(() => {
		if (sortByDistanceToUser) {
			updateFridgesDisplay(sortByDistanceToFridge(fridgesDisplay));
			setSortByDistanceToUser(false);
		}
	}, [fridgesDisplay, sortByDistanceToUser]);

	/**
	 * Check to see if the user has been located prior to trying to sort the fridges by distance
	 * to this user. If the user has not been located, warn them about this by toggling the
	 * related alert. Otherwise, set the fridge distances, based on the found user location, and set
	 * the sort to true so that it is re-rendered with the useEffect.
	 */
	let sortByDistance = () => {
		if (!userLocation) {
			toggleAlert(true);
		} else {
			setDistanceFromUser(fridgesDisplay, userLocation);
			setSortByDistanceToUser(true);
		}
	};

	return (
		<div aria-label={'allFridgesButtonList'}>
			<h1> No Fridge Selected </h1>
			<div style={{ paddingTop: '0.5vh', paddingBottom: '0.5vh' }}>
				{'Filter By: '}
				<ButtonGroup className="me-2" aria-label="Distance">
					<Button
						style={{ fontSize: textSize }}
						variant={secondaryButtonColor}
						onClick={sortByDistance}
						aria-label={'sortByDistanceButton'}>
						Distance
					</Button>
				</ButtonGroup>
				<ButtonGroup className="me-2" aria-label="Last Visited">
					<Button style={{ fontSize: textSize }} variant={secondaryButtonColor} aria-label={'sortByLastVisitedButton'}>
						Last Visited
					</Button>
				</ButtonGroup>
			</div>
			<div key={'fridgeList'}>
				{fridgesDisplay.map((fridge) => (
					<SingleFridgeListButton
						key={fridge.address}
						updateSelected={updatedCurrentlySelectedFridge}
						fridge={fridge}
					/>
				))}
			</div>
		</div>
	);
}
