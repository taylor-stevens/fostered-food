import { useMapEvents } from 'react-leaflet';
import '../../App.scss';
import Button from 'react-bootstrap/Button';
import {
	DEFAULT_TEXT_SIZE as textSize,
	DEFAULT_MAP_ZOOM as mapZoom,
	DEFAULT_ZOOM_SPEED as zoomSpeed,
	DEFAULT_MAP_CENTER as currentlyUndefinedFridgeLocation,
} from '../../constants/constants';
import {Fridge} from "../../types/Types";
import {Dispatch, SetStateAction} from "react";

/**
 * Renders a button representing the given {@link Fridge} that when clicked, will render a
 * related {@link Fridge} information page.
 * @param props will at least include a value for {@link Fridge}, which is the {@link Fridge} that is
 *              associated with this button; and a value for updateSelected, which is a
 *              function that allows this {@link Fridge} to become the currentlySelected {@link Fridge}
 *              to be displayed.
 * @return {JSX.Element} A Button that can be clicked to display information about the
 *                       given {@link Fridge}.
 */
export default function SingleFridgeListButton(
	props: { fridge: Fridge | undefined; updateSelected: Dispatch<SetStateAction<Fridge | undefined>>; }
) {
	// the fridge that this button is representing
	const thisFridge = props.fridge;
	// the location of this fridge.
	let thisFridgesLocation = currentlyUndefinedFridgeLocation;
	// the function to update the selected fridge.
	const updatedCurrentlySelectedFridge = props.updateSelected;

	/**
	 * Updates the view of the Map to be centered on this {@link Fridge}, setting the zoom of the map to 14
	 * and doing so at a speed that is visible to the user (1.5 seconds)
	 */
	let updateView = () => {
		updatedCurrentlySelectedFridge(thisFridge);
		map.flyTo(
			[thisFridgesLocation[0] - (map.getContainer().scrollHeight / 400000), thisFridgesLocation[1]],
			mapZoom, // the distance of the user to the map (how much detail the map will show them)
			{ duration: zoomSpeed } // the amount of time that updating/panning the view should take
		);
	};

	let singleFridgeListButtonOrNone = <></>;
	if (thisFridge) {
		// the name of this fridge
		const thisName = thisFridge.name;
		// the address of this fridge
		const thisAddress = thisFridge.address;
		thisFridgesLocation = thisFridge.location;
		singleFridgeListButtonOrNone = (
			<div key={thisFridgesLocation + ''} className="popUpControls" aria-label={'singleFridgeListButton'}>
				<Button
					variant={'outline-secondary'}
					style={{ fontSize: textSize }}
					size={'sm'}
					key={thisFridgesLocation + ''}
					onClick={updateView}>
					{thisName + ': ' + thisAddress}
				</Button>
			</div>
		)
	}

	/**
	 * Function that returns the map that is being interacted with, such that the user
	 * will be able to have their view updated depending on the map elements that
	 * they are interacting with, such as the map re-centering on selected {@link Fridge}s.
	 */
	const map = useMapEvents({
		click(e) {
			console.log('Map Interaction Made.');
		},
	});

	return (singleFridgeListButtonOrNone);
}
