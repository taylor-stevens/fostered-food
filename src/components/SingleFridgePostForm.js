import { Form } from 'react-bootstrap';
import { DEFAULT_TEXT_SIZE as textSize, HEAVY_WEIGHT as weight } from '../constants/constants';
import Button from 'react-bootstrap/Button';

/**
 * Creates a Form for users to enter in information regarding their latest visit to
 * a community fridge in the network.
 * @param props will include at least a value for handleSubmit, a function that handles the actions needed for
 *              Form submission; a value for input, a state value for the Form input; and a value for
 *              handleChange, a function that tracks any changes to the Form input.
 * @return {JSX.Element} A Form for collecting a new post that a user might want to make about a given Fridge.
 */
export function SingleFridgePostForm(props) {
	// handles the actions needed for Form submission
	const handleSubmit = props.handleSubmit;
	// tracks any changes to the Form input
	const handleChange = props.handleChange;
	// state value for the Form input
	const input = props.input;
	// the font size for the given Form information
	const style = { fontSize: textSize };

	return (
		<Form onSubmit={handleSubmit} aria-label={'singleFridgePostForm'}>
			<Form.Group className="mb-3" controlId="formInput">
				<Form.Label style={{ fontWeight: weight }}>Post About the Fridge:</Form.Label>
				<Form.Control
					style={style}
					size={'sm'}
					type="text"
					value={input}
					onChange={handleChange}
					placeholder={'Added Fresh Apples!'}/>
				<Form.Text className="text-muted">
					Tell others whats in the fridge or if something is wrong.
				</Form.Text>
			</Form.Group>
			<Button variant="secondary" size={'sm'} type="submit" style={style} aria-label={'submitButton'}>
				Submit
			</Button>
		</Form>
	);
}
