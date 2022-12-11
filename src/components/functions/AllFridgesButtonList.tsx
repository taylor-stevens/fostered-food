import SingleFridgeListButton from './SingleFridgeListButton';
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DataContext from '../../contexts/DataContext';
import { setDistanceFromUser, sortByDistanceToFridge } from '../../utils/utils';
import {
	SECONDARY_BUTTON_COLOR as secondaryButtonColor,
	DEFAULT_TEXT_SIZE as textSize,
} from '../../constants/constants';
import {Fridge} from "../../types/Types";
import {LatLng} from "leaflet";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * Relies on DataContext to render the list of {@link Fridge}s.
 * @param props will at least include a value for located, the location of the user, if
 *              found prior to this component being rendered; toggleAlert, the function
 *              to be called if the distance sort is called without the user being located;
 *              and updateSelected, the state updater for the currently selected fridge.
 * @return {JSX.Element} A list of interactive buttons representing the community fridges.
 */
export default function AllFridgesButtonList(
	props: { located: LatLng | undefined; setShowAlert: Dispatch<SetStateAction<boolean>>; updateSelected: Dispatch<SetStateAction<Fridge | undefined>>; }
) {
	// get the Google Sheets data from the DataContext
	const data = useContext(DataContext);
	// get the location of the user (LtLng | undefined)
	const userLocation = props.located;
	// get the function that toggles the un-located alert to the user.
	const setShowAlert = props.setShowAlert;
	// the function to update the selected Fridge.
	const updatedCurrentlySelectedFridge = props.updateSelected;
	// holds the current list of Fridges as pulled from the database
	let [fridgesDisplay, updateFridgesDisplay] = useState(data);
	// determines whether to sort the Fridges during each render
	let [sortByDistanceToUser, setSortByDistanceToUser] = useState(false);

	/**
	 * Check to see if the {@link Fridge} 'distance's have been set, and if they have, sort the list
	 * state that is being displayed based on the 'distance' field.
	 */
	useEffect(() => {
		if (sortByDistanceToUser && fridgesDisplay) {
			updateFridgesDisplay(sortByDistanceToFridge(fridgesDisplay));
			setSortByDistanceToUser(false);
		}
	}, [fridgesDisplay, sortByDistanceToUser]);

	/**
	 * Check to see if the user has been located prior to trying to sort the {@link Fridge}s by distance
	 * to this user. If the user has not been located, warn them about this by toggling the
	 * related alert. Otherwise, set the {@link Fridge} 'distance's, based on the found user location, and set
	 * the sort to true so that it is re-rendered with the useEffect.
	 */
	let sortByDistance = () => {
		if (!userLocation) {
			setShowAlert(true);
		} else {
			if (fridgesDisplay) {
				setDistanceFromUser(fridgesDisplay, userLocation);
				setSortByDistanceToUser(true);
			}
		}
	};

	return (
		<div aria-label={'allFridgesButtonList'}>
			<h1> No Fridge Selected </h1>
			<div style={{ paddingTop: '0.5vh', paddingBottom: '0.5vh' }}>
				{'Filter By: '}
				<ButtonGroup
					className="me-2"
					aria-label="Distance">
					<Button
						style={{ fontSize: textSize }}
						variant={secondaryButtonColor}
						onClick={sortByDistance}
						aria-label={'sortByDistanceButton'}>
						Distance
					</Button>
				</ButtonGroup>
				<ButtonGroup
					className="me-2"
					aria-label="Last Visited">
					<Button
						style={{ fontSize: textSize }}
						variant={secondaryButtonColor}
						aria-label={'sortByLastVisitedButton'}>
						Last Visited
					</Button>
				</ButtonGroup>
			</div>
			<div key={'fridgeList'}>
				{fridgesDisplay?.map((fridge) => (
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
