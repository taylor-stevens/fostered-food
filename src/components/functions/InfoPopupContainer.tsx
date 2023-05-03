import React, { Dispatch, SetStateAction } from 'react';
import '../../App.scss';
import {
	BLACK_LOCATION_MARKER_URL as locationMarker,
	RED_LOCATION_MARKER_URL as clickedMarker,
} from '../../constants/constants';
import SingleFridgeOverallDisplay from './SingleFridgeOverallDisplay';
import AllFridgesButtonList from './AllFridgesButtonList';
import {useSelectedFridgeContext} from '../../contexts/SelectedFridgeContext';
import {useDataContext} from "../../contexts/DataContext";
import {Card, Placeholder} from "react-bootstrap";

/**
 * This component decides whether to render a selected {@link Fridge}'s information,
 * or render a list of buttons each relating to a given {@link Fridge} depending on whether
 * a {@link Fridge} is selected.
 * Relies on the SelectedFridgeContext.
 * @return {JSX.Element} An informative panel with either one {@link Fridge}'s information or a list of
 * 						 buttons that will guide a user to a singular {@link Fridge}'s information when clicked.
 */
export default function InfoPopupContainer(
	props: {
	    setShowAlert: Dispatch<SetStateAction<boolean>>; // the function to alert user of app misuse
		zoomMap: (arg0: any, arg1: any) => {}; // the function that will change the center of the given map
		setShowToast: Dispatch<SetStateAction<string | undefined>> // function to alert user of interaction success
	}
) {
	// all fridges and the selected fridge according to the contexts
	const [data, setData] = useDataContext();
	const [selected, setSelected] = useSelectedFridgeContext();

	// acknowledge the parameters
	const setShowAlert = props.setShowAlert;
	const zoomMap = props.zoomMap;
	const setShowToast = props.setShowToast;

	/**
	 * Determine whether to display information for the selected fridge (if there is one)
	 * or the list of all the Fridges. The default value is set to display the SelectedFridgeContext.
	 * If there is not a selected fridge, display a black location marker on the top of the
	 * information container, else keep the red location marker that matches the selected Map Marker's
	 * color.
	 */
	let oneOrAllFridges: JSX.Element;
	let redOrBlackMarker = clickedMarker;
	if (data.fridges) {
		if (selected.fridge === undefined) {
			oneOrAllFridges = (
				<AllFridgesButtonList setShowToast={setShowToast} zoomMap={zoomMap} setShowAlert={setShowAlert}/>
			);
			redOrBlackMarker = locationMarker;
		} else {
			oneOrAllFridges = <SingleFridgeOverallDisplay/>;
		}
	} else {
		oneOrAllFridges = (
			<div>
				<div style={{padding: '10px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center'}}>
					{'Data is Currently Unavailable.'}<br/>{'Try Again Later.'}
				</div>
				<Card>
					<Card.Body>
						<Placeholder xs={12}/>
						<div style={{paddingBottom: '5px'}}>
							<Placeholder xs={7} /> <Placeholder xs={4} />
						</div>
						{['first', 'second', 'third', 'fourth'].map((item) =>
							<div style={{paddingBottom: '5px', width: '100%'}}>
								<Placeholder.Button key={item} variant="primary" size={'sm'} xs={12} style={{height: '20px'}}/>
							</div>
						)}
					</Card.Body>
				</Card>
			</div>
		)
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
