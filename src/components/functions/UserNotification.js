import { Alert as AlertPopup, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BsXLg as ExitButton } from 'react-icons/bs';
import React from 'react';
import {
	DEFAULT_BUTTON_COLOR as buttonColor,
	DEFAULT_POPUP_COLOR as popupColor,
	DEFAULT_CONTAINER_RESIZE as containerSize,
} from '../../constants/constants';

/**
 * An abstract function representing a Popup alert on the Map.
 * @param props will include at least a value for text, which will be the test shown to the user
 *              on the alert; a value for clickButtonFunction, which will be the function called
 *              OnClick when the close button (Bootstrap BsXLg) is clicked inside the alert;
 *              a value for closeFunctionValue, which will be the value passed into the closeButtonFunction;
 *              and a value for showClose, which will determine if the button is visible to the user.
 * @return {JSX.Element} A Bootstrap Alert with a Bootstrap style 'X' Button and alert text in yellow.
 */
export default function UserNotification(props) {
	// what the alert will say
	const alertText = props.text;
	// if the alert will allow the user to close it
	const showCloseButton = props.showClose;
	// if the close button is shown, this function will be called when the user clicks the exit button
	const onClickFunction = props.closeButtonFunction;
	// this value is passed to the onClickFunction if the button is displayed and clicked by the user.
	const functionParameter = props.closeFunctionValue;
	// determine the value of the closing button view
	let closeButton = <></>;
	if (showCloseButton) {
		closeButton = (
			<Button
				variant={buttonColor}
				onClick={() => onClickFunction(functionParameter)}
				aria-label={'userNotificationCloseButton'}>
				<ExitButton />
			</Button>
		);
	}

	return (
		<div className="alertPopup" aria-label={'userNotificationPopup'}>
			<AlertPopup variant={popupColor}>
				<Container>
					<Row><Col md={'auto'}>{closeButton}</Col><Col>
						<div aria-label={'userNotificationPopupText'}>
							{alertText}
						</div>
					</Col></Row>
				</Container>
			</AlertPopup>
		</div>
	);
}
