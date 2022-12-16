import React, {Dispatch, SetStateAction, useContext, useEffect} from 'react';
import '../../App.scss';
import {
	BLACK_LOCATION_MARKER_URL as locationMarker,
	RED_LOCATION_MARKER_URL as clickedMarker,
} from '../../constants/constants';
import SingleFridgeOverallDisplay from './SingleFridgeOverallDisplay';
import AllFridgesButtonList from './AllFridgesButtonList';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import { Fridge } from '../../types/Types';
import { LatLng } from 'leaflet';

/**
 * This component decides whether to render a selected {@link Fridge}'s information,
 * or render a list of buttons each relating to a given {@link Fridge} depending on whether
 * a {@link Fridge} is selected.
 * Relies on the SelectedFridgeContext.
 * @param props will at least include a value for updateSelected, which will be a function
 *              that allows the value of the selectedFridge state to be changed; a value for setShowAlert, which will
 *              be a function that allows the value of the alert state to be changed based on whether a user has
 *              been located yet or not; and a value for located, which will be a value representing the given
 *              user's location coordinates, if found.
 * @return {JSX.Element} An informative panel with either one {@link Fridge}'s information or a list of
 * 						 buttons that will guide a user to a singular {@link Fridge}'s information when clicked.
 */
export default function InfoPopupContainer(
	props: { 
	    updateSelected: Dispatch<SetStateAction<Fridge | undefined>>; 
	    setShowAlert: Dispatch<SetStateAction<boolean>>; 
	    located: LatLng | undefined;
		zoomMap: (arg0: any, arg1: any) => {};
        }
) {
	// the currently selected Fridge.
	const singleSelectedFridge = useContext(SelectedFridgeContext);
	// the function that allows the currently selected Fridge to a new location.
	const updateSelected = props.updateSelected;
	// the function that will toggle a notification to the user that they have not been located.
	const setShowAlert = props.setShowAlert;
	// the current location of this user (LtLng | undefined).
	const userLocation = props.located;
	// the function that will change the center of the given map
	const zoomMap = props.zoomMap;

	/**
	 * Determine whether to display information for the selected fridge (if there is one)
	 * or the list of all the Fridges. The default value is set to display the SelectedFridgeContext.
	 * If there is not a selected fridge, display a black location marker on the top of the
	 * information container, else keep the red location marker that matches the selected Map Marker's
	 * color.
	 */
	let oneOrAllFridges = <SingleFridgeOverallDisplay updateSelected={updateSelected}/>;
	let redOrBlackMarker = clickedMarker;
	if (singleSelectedFridge === undefined) {
		oneOrAllFridges = (
			<AllFridgesButtonList
				zoomMap={zoomMap}
				setShowAlert={setShowAlert}
				located={userLocation}
				updateSelected={updateSelected}/>
		);
		redOrBlackMarker = locationMarker;
	}

	return (
		<div aria-label={'infoPopupContainer'}>
			<img
				className="imgInformationPopup"
				src={redOrBlackMarker}
				alt={'Location Symbol'}
				aria-label={'informationPopupImg'}/>
			<div className={'infoPopupCont'} style={{overflow: 'scroll', pointerEvents: 'auto'}}>
				{oneOrAllFridges}
			</div>
		</div>
	);
}
