import {Alert as AlertPopup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {BsXLg as ExitButton} from "react-icons/bs";
import React from "react";

/**
 * An abstract function representing a popup alert on the map.
 * @param props will include at least a value for text, which will be the test shown to the user
 *              on the alert; a value for clickButtonFunction, which will be the function called
 *              OnClick when the close button (Bootstrap BsXLg) is clicked inside the alert; and
 *              a value for functionValue, which will be the value passed into the clickButtonFunction.
 * @return {JSX.Element} A Bootstrap Alert with a Bootstrap style 'X' Button and alert text in yellow.
 */
export default function UserNotification(props) {

    const onClickFunction = props.clickButtonFunction;
    const functionParameter = props.functionValue;
    const alertText = props.text;

    return (
        // 'warning' is Bootstraps yellow color.
        // Alert width should not take up more than 50% of the display.
        // 'light' is Bootstraps light grey color.
        <AlertPopup variant={"warning"} style={{width: "50%"}}>
            <Button variant={"light"} onClick={() => onClickFunction(functionParameter)}>
                <ExitButton/>
            </Button>
            {alertText}
        </AlertPopup>
    )
}