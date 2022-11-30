import { useMapEvents } from 'react-leaflet';
import '../App.scss';
import Button from 'react-bootstrap/Button';
import {
	DEFAULT_TEXT_SIZE as textSize,
	DEFAULT_MAP_ZOOM as mapZoom,
	DEFAULT_ZOOM_SPEED as zoomSpeed
} from '../constants/constants';

/**
 * Renders a button representing the given fridge that when clicked, will render a
 * related fridge information page.
 * @param props will at least include a value for fridge, which is the fridge that is
 *              associated with this button; and a value for updateSelected, which is a
 *              function that allows this fridge to become the currentlySelected fridge
 *              to be displayed.
 * @return {JSX.Element} A Button that can be clicked to display information about the
 *                       given fridge.
 */
export default function SingleFridgeListButton(props) {
	// the fridge that this button is representing
	const thisFridge = props.fridge;
	// the name of this fridge
	const thisName = thisFridge.name;
	// the address of this fridge
	const thisAddress = thisFridge.address;
	// the location of this fridge.
	const thisFridgesLocation = thisFridge.location;
	// the function to update the selected fridge.
	const updatedCurrentlySelectedFridge = props.updateSelected;

	/**
	 * Function that returns the map that is being interacted with, such that the user
	 * will be able to have their view updated depending on the map elements that
	 * they are interacting with, such as the map recentering on selected Fridges.
	 */
	const map = useMapEvents({
		click(e) {
			console.log('Map Interaction Made.');
		},
	});

	/**
	 * Updates the view of the Map to be centered on this Fridge, setting the zoom of the map to 14
	 * and doing so at a speed that is visible to the user (1.5 seconds)
	 */
	let updateView = () => {
		updatedCurrentlySelectedFridge(thisFridge);
		map.flyTo(
			thisFridgesLocation,
			mapZoom, // the distance of the user to the map (how much detail the map will show them)
			{ duration: zoomSpeed } // the amount of time that updating/panning the view should take
		);
	};

	return (
		<div key={thisFridgesLocation} className="popUpControls">
			<Button
				variant={'outline-secondary'}
				style={{ fontSize: textSize }}
				size={'sm'}
				key={thisFridgesLocation}
				onClick={updateView}
				aria-label={'singleFridgeListButton'}>
				{thisName + ': ' + thisAddress}
			</Button>
		</div>
	);
}
