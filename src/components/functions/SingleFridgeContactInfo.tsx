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
	let contactsOrNone: JSX.Element[] = [];
	if (thisFridge) {
		contactsOrNone = (
			thisFridge.contact.map((contact) => (
				<div aria-label={'singleContactPoint'}>
					<h1 style={{ fontWeight: 'bold' }}>{contact[0]}</h1>
					<h2>{contact[1]}</h2>
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
