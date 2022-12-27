import {Col, Container, Form, Row} from 'react-bootstrap';
import { DEFAULT_TEXT_SIZE as textSize } from '../../constants/constants';
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

	// the font size for the given Form information (won't listen to sass file)
	const style = { fontSize: textSize };

	return (
		<div aria-label={'singleFridgePostForm'}>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formInput">
					<h3>
						Post About the Fridge:
					</h3>
					<Container fluid style={{paddingLeft: '10px', paddingRight: '0px'}}>
						<Row>
							<Col xs={8} style={{paddingRight: '0px', paddingLeft: '2px'}}>
								<Form.Control
									style={style}
									size={'sm'}
									type="text"
									value={input}
									onChange={handleChange}
									placeholder={'Added Fresh Apples!'}/>
							</Col>
							<Col xs={4} style={{paddingLeft: '0px'}}>
								<h4 aria-label={'submitButton'}>
									<Button variant="outline-secondary" size={'sm'} type="submit" style={style}>
										Submit
									</Button>
								</h4>
							</Col>
						</Row>
						<Row>
							<Col style={{marginLeft: '-10px'}}>
								<h4>
									Whats in the fridge? Anything need attention?
								</h4>
							</Col>
						</Row>
					</Container>
				</Form.Group>
			</Form>
		</div>
	);
}
