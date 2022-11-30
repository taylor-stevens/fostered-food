import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import SingleFridgeContactInfo from './SingleFridgeContactInfo';
import { BsXLg } from 'react-icons/bs';
import {
	DEFAULT_BUTTON_COLOR as buttonColor,
	DEFAULT_TEXT_SIZE as textSize,
	DEFAULT_SELECTED_PAGE_COLOR as selected,
	DEFAULT_UNSELECTED_PAGE_COLOR as unselected,
} from '../constants/constants';
import { SingleFridgeInfoDisplay } from './SingleFridgeInfoDisplay';
import SelectedFridgeContext from '../contexts/SelectedFridgeContext';

/**
 * This component renders an information panel that contains information about the currently
 * selected fridge. This component should not be rendered if the state of the
 * currently selected fridge is null.
 * Relies on the SelectedFridgeContext to determine the header.
 * @param props will include at least a value for fridge, the current fridge that is being displayed.
 * @return {JSX.Element} A descriptive and interactive panel for the currently selected fridge.
 */
export default function SingleFridgeOverallDisplay(props) {
	// the Fridge that is being displayed, which is the currently selected Fridge
	const thisSelectedFridge = useContext(SelectedFridgeContext);
	// state updater to change the currently selected Fridge.
	const updateCurrentlySelectedFridge = props.updateSelected;
	// the name of the currently selected Fridge.
	const selectedName = thisSelectedFridge.name;
	// the address of the currently selected Fridge.
	const selectedAddress = thisSelectedFridge.address;
	// the state that determines whether to display the contact info for this Fridge
	const [contact, seeContact] = useState(false);
	// the state that determines the current display
	const [radioValue, setRadioValue] = useState(2);
	// determine if the Fridge Information Button is checked
	const generalInfoButtonChecked = (radioValue === 2);
	// determine the color of the Fridge Information Button
	const generalInfoButtonColor = radioValue % 3 ? selected : unselected;
	// determine if the Contact Information Button is checked
	const contactInfoButtonChecked = (radioValue === 3);
	// determine the color of the Contact Information Button
	const contactInfoButtonColor = radioValue % 2 ? selected : unselected;
	// the text size of the page selection bettons
	const style = { fontSize: textSize };
	// determine which information page to display
	const informationDisplay = contact ? <SingleFridgeContactInfo /> : <SingleFridgeInfoDisplay />;

	return (
		<div aria-label={'singleFridgeOverallDisplay'}>
			<Button
				variant={buttonColor}
				onClick={() => updateCurrentlySelectedFridge(null)}
				aria-label={'singleFridgeOverallDisplayExitButton'}>
				<BsXLg />
			</Button>
			<h1>{selectedName}</h1>
			<h2>{selectedAddress}</h2>
			<h2>
				<ButtonGroup size={'sm'} className="me-2" aria-label="pageSelectionGroup" type={'radio'}>
					<ToggleButton
						value={2}
						checked={generalInfoButtonChecked}
						variant={generalInfoButtonColor}
						style={style}
						onClick={() => {
							seeContact(false);
							setRadioValue(2);
						}}
						aria-label={'fridgeInformationToggleButton'}>
						Fridge Information
					</ToggleButton>
					<ToggleButton
						value={3}
						checked={contactInfoButtonChecked}
						variant={contactInfoButtonColor}
						style={style}
						onClick={() => {
							seeContact(true);
							setRadioValue(3);
						}}
						aria-label={'contactInformationToggleButton'}>
						Contact Information
					</ToggleButton>
				</ButtonGroup>
			</h2>
			{informationDisplay}
		</div>
	);
}
