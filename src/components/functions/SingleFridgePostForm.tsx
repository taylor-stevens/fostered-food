import { Form } from 'react-bootstrap';
import { DEFAULT_TEXT_SIZE as textSize, HEAVY_WEIGHT as weight } from '../../constants/constants';
import Button from 'react-bootstrap/Button';

/**
 * Creates a Form for users to enter in information regarding their latest visit to
 * a community fridge in the network.
 * @return {JSX.Element} A Form for collecting a new post that a user might want to make about a given Fridge.
 */
export function SingleFridgePostForm(
	props: {
		// TODO: these cannot be any type. Add type descriptions
		handleSubmit: any; // handles the actions needed for Form submission
		handleChange: any; // tracks any changes to the Form input
		input: any; // state value for the Form input
	}
) {
	// acknowledge the incoming parameters
	const handleSubmit = props.handleSubmit;
	const handleChange = props.handleChange;
	const input = props.input;

	// the font size for the given Form information
	const style = { fontSize: textSize };

	return (
		<div aria-label={'singleFridgePostForm'}>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formInput">
					<Form.Label style={{ fontWeight: weight, paddingTop: '15px' }}>
						Post About the Fridge:
					</Form.Label>
					<Form.Control
						style={style}
						size={'sm'}
						type="text"
						value={input}
						onChange={handleChange}
						placeholder={'Added Fresh Apples!'}/>
					<Form.Text className="text-muted">
						What's in the fridge? Anything need attention?
					</Form.Text>
				</Form.Group>
				<div aria-label={'submitButton'}>
					<Button variant="secondary" size={'sm'} type="submit" style={style}>
						Submit
					</Button>
				</div>
			</Form>
		</div>
	);
}
