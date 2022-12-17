import '../../App.scss';
import Button from 'react-bootstrap/Button';
import {
	DEFAULT_TEXT_SIZE as textSize,
	DEFAULT_MAP_CENTER as currentlyUndefinedFridgeLocation,
} from '../../constants/constants';
import { Fridge } from '../../types/Types';
import { Dispatch, SetStateAction } from 'react';

/**
 * Renders a button representing the given {@link Fridge} that when clicked, will render a
 * related {@link Fridge} information page.
 * @return {JSX.Element} A Button that can be clicked to display information about the
 *                       given {@link Fridge}.
 */
export default function SingleFridgeListButton(
	props: {
		fridge: Fridge | undefined; // the fridge that this button is representing
		setSelectedFridge: Dispatch<SetStateAction<Fridge | undefined>>; // the function to update the selected fridge
		zoomMap: (arg0: any, arg1: any) => {}; // the function that handles moving the map view to the given location
	}
) {
	// acknowledge the incoming parameters
	const thisFridge = props.fridge;
	const setSelectedFridge = props.setSelectedFridge;
	const zoomMap = props.zoomMap;

	// the location of this fridge.
	let thisFridgesLocation = currentlyUndefinedFridgeLocation;

	/**
	 * Updates the view of the Map to be centered on this {@link Fridge}
	 * doing so at a speed that is visible to the user (1.5 seconds)
	 */
	let updateView = () => {
		setSelectedFridge(thisFridge);
		zoomMap(thisFridgesLocation[0], thisFridgesLocation[1]);
	};

	let singleFridgeListButtonOrNone = <></>;
	if (thisFridge) {
		const thisName = thisFridge.name; // the name of this fridge
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
		);
	}

	return (
		singleFridgeListButtonOrNone
	);
}
