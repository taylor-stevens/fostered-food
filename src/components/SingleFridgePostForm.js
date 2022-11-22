import { Form } from 'react-bootstrap';
import { DEFAULT_TEXT_SIZE as textSize, HEAVY_WEIGHT as weight } from '../constants/constants';
import Button from 'react-bootstrap/Button';

/**
 *
 * @param props will include at least a value for handleSubmit, a function that handles the actions needed for
 *              form submission; a value for input, a state value for the form input; and a value for
 *              handleChange, a function that tracks any changes to the form input.
 * @return {JSX.Element} a form for collecting a new post that a user might want to make about a given fridge.
 */
export function SingleFridgePostForm(props) {
	const handleSubmit = props.handleSubmit; // handles the actions needed for form submission
	const handleChange = props.handleChange; // tracks any changes to the form input
	const input = props.input; // state value for the form input

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formInput">
				<Form.Label style={{ fontWeight: weight }}>Post About the Fridge:</Form.Label>
				<Form.Control
					style={{ fontSize: textSize }}
					size={'sm'}
					type="text"
					value={input}
					onChange={handleChange}
					placeholder="Added Fresh Apples!"
				/>
				<Form.Text className="text-muted">
					Tell others whats in the fridge or if something is wrong.
				</Form.Text>
			</Form.Group>
			<Button variant="secondary" size={'sm'} type="submit" style={{ fontSize: textSize }}>
				Submit
			</Button>
		</Form>
	);
}
