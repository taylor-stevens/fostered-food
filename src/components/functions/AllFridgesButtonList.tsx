import SingleFridgeListButton from './SingleFridgeListButton';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useDataContext} from '../../contexts/DataContext';
import { setDistanceFromUser, sortByDistanceToFridge } from '../../utils/utils';
import {
	SECONDARY_BUTTON_COLOR as secondaryButtonColor,
	DEFAULT_TEXT_SIZE as textSize,
} from '../../constants/constants';
import { Fridge } from '../../types/Types';
import {useUserLocationContext} from "../../contexts/UserLocationContext";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * Relies on DataContext to render the list of {@link Fridge}s.
 * @return {JSX.Element} A list of interactive buttons representing the community fridges.
 */
export default function AllFridgesButtonList(
	props: {
		setShowAlert: Dispatch<SetStateAction<boolean>>; // the function that toggles the un-located alert to the user
		zoomMap: (arg0: any, arg1: any) => {}; // the function that will change the center of the given map
		setShowToast: Dispatch<SetStateAction<string | undefined>>
	}
) {
	// get the Google Sheets data from the DataContext
	const [location, setLocation] = useUserLocationContext();
	const [data, setData] = useDataContext()

	// acknowledge the parameters
	const setShowAlert = props.setShowAlert;
	const zoomMap = props.zoomMap;

	// determines whether to sort the Fridges during each render
	let [sortByDistanceToUser, setSortByDistanceToUser] = useState(false);

	/**
	 * Check to see if the {@link Fridge} 'distance's have been set, and if they have, sort the list
	 * state that is being displayed based on the 'distance' field.
	 */
	useEffect(() => {
		if (sortByDistanceToUser && data.fridges) {
			setData({fridges: sortByDistanceToFridge(data.fridges)});
			setSortByDistanceToUser(false);
		}
	}, [sortByDistanceToUser, data.fridges, setData]);

	/**
	 * Check to see if the user has been located prior to trying to sort the {@link Fridge}s by distance
	 * to this user. If the user has not been located, warn them about this by toggling the
	 * related alert. Otherwise, set the {@link Fridge} 'distance's, based on the found user location, and set
	 * the sort to true so that it is re-rendered with the useEffect.
	 */
	let sortByDistance = () => {
		if (!location.userLocation) {
			setShowAlert(true);
		} else {
			if (data.fridges) {
				setDistanceFromUser(data.fridges, location.userLocation);
				setSortByDistanceToUser(true);
				props.setShowToast('Sorted the Fridge List by Distance!')
			}
		}
	};

	let fridgesDisplay: JSX.Element[] = data.fridges ? data.fridges.map((fridge: Fridge) => (
		<SingleFridgeListButton
			key={fridge.address + ''}
			zoomMap={zoomMap}
			fridge={fridge}/>
	)) : [<div aria-label={'noFridgeDataToDisplay'}/>];

	return (
		<div aria-label={'allFridgesButtonList'}>
			<h1> No Fridge Selected </h1>
			<div style={{ paddingTop: '0.5vh', paddingBottom: '0.5vh', fontSize: '12px', width: 'inherit' }}>
				<Dropdown as={ButtonGroup} style={{ width: '100%', maxHeight: '4vh', minHeight: '30px' }}>
					<Button style={{ fontSize: textSize }} variant={secondaryButtonColor}>
						Sort the Community Fridges
					</Button>
					<Dropdown.Toggle split variant={secondaryButtonColor} id="dropdown-split-basic" />
					<Dropdown.Menu style={{ fontSize: '12px' }}>
						<Dropdown.Item onClick={() => {
							sortByDistance();
						}} aria-label={'sortByDistanceButton'}>
							Sort by Distance
						</Dropdown.Item>
						<Dropdown.Item disabled={true} aria-label={'sortByLastVisitedButton'}>
							Sort by Most Recently Active Fridge
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
			<div
				key={'fridgeList'}
				className="d-grid gap-1 popUpControls"
				style={{
					height: '425px', maxHeight: '35vh', width: 'inherit', overflow: 'scroll', pointerEvents: 'auto'
				}}>
				{fridgesDisplay}
			</div>
		</div>
	);
}
