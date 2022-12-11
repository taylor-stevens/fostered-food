import { useContext } from 'react';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';

/**
 * Displays the contact information of the Fridge that is sent as a parameter.
 * Relies on the SelectedFridgeContext to determine the contact information to render.
 * @return {JSX.Element} That lists out the points of contact that are known
 *                       for a given fridge.
 */
export default function SingleFridgeContactInfo() {
	const thisFridge = useContext(SelectedFridgeContext); // the fridge whose contact information is being displayed.
	let contactsOrNone = <></>;
	if (thisFridge) {
		contactsOrNone = (
			thisFridge.contact.map((contact) => (
				<div aria-label={'singleContactPoint'}>
					<div style={{ fontWeight: 'bold' }}>{contact[0]}</div>
					<div>{contact[1]}</div>
				</div>
			))
		)
	}
	return (
		<div aria-label={'singleFridgeContactInfo'}>
			{contactsOrNone}
		</div>
	);
}
