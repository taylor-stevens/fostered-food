import {Alert as AlertPopup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {BsXLg as ExitButton} from "react-icons/bs";
import React from "react";

/**
 * An abstract function representing a popup alert on the map.
 * @param props will include at least a value for text, which will be the test shown to the user
 *              on the alert; a value for clickButtonFunction, which will be the function called
 *              OnClick when the close button (Bootstrap BsXLg) is clicked inside the alert;
 *              a value for closeFunctionValue, which will be the value passed into the closeButtonFunction;
 *              and a value for showClose, which will determine if the button is visible to the user.
 * @return {JSX.Element} A Bootstrap Alert with a Bootstrap style 'X' Button and alert text in yellow.
 */
export default function UserNotification(props) {

    const alertText = props.text; // what the alert will say
    const showCloseButton = props.showClose; // if the alert will allow the user to close it
    const onClickFunction = props.closeButtonFunction; // if the button is shown, this function will
                                                       // be called when the user clicks the exit button
    const functionParameter = props.closeFunctionValue; // this value is passed to the onClickFunction,
                                                        // if the button is displayed and clicked by the user.

    return (
        // 'warning' is Bootstraps yellow color.
        // Alert width should not take up more than 50% of the display.
        // 'light' is Bootstraps light grey color.
        <AlertPopup variant={"warning"} style={{width: "50%"}}>
            {
                showCloseButton ?
                    <Button variant={"light"} onClick={() => onClickFunction(functionParameter)}>
                        <ExitButton/>
                    </Button>:
                    <></>
            }
            {alertText}
        </AlertPopup>
    )
}