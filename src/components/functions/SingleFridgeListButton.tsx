import { useMapEvents } from 'react-leaflet';
import '../../App.scss';
import Button from 'react-bootstrap/Button';
import {
	DEFAULT_TEXT_SIZE as textSize,
	DEFAULT_MAP_ZOOM as mapZoom,
	DEFAULT_ZOOM_SPEED as zoomSpeed,
	DEFAULT_MAP_CENTER as currentlyUndefinedFridgeLocation,
} from '../../constants/constants';
import { Fridge } from '../../types/Types';
import { Dispatch, SetStateAction } from 'react';

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
	props: {
		fridge: Fridge | undefined;
		updateSelected: Dispatch<SetStateAction<Fridge | undefined>>;
		zoomMap: (arg0: any, arg1: any) => {};
	}
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
		props.zoomMap(thisFridgesLocation[0], thisFridgesLocation[1]);
	};

	let singleFridgeListButtonOrNone = <></>;
	if (thisFridge) {
		// the name of this fridge
		const thisName = thisFridge.name;
		// the address of this fridge
		// const thisAddress = thisFridge.address;
		thisFridgesLocation = thisFridge.location;
		singleFridgeListButtonOrNone = (
			<Button
				aria-label={'singleFridgeListButton'}
				variant={'outline-secondary'}
				style={{ fontSize: textSize, minWidth: 'max-content', width: 'auto' }}
				size={'sm'}
				key={thisFridgesLocation + ''}
				onClick={updateView}>
				{thisName}
			</Button>
		)
	}

	return (singleFridgeListButtonOrNone);
}
