import PopupControls from "./PopupControls";
import React from "react";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * @param data - The JSON data relating to the currently available fridge data.
 * @param updateSelected - {hook} the function that modifies which fridge is currently selected.
 * @return {JSX.Element} - A list of interactive buttons.
 */
export default function AllFridges(props) {
    return (
        <div key={"fridgeList"}>
            {props.data.map(fridge => (
                <PopupControls
                    keyValue={fridge.name}
                    text={fridge.name + ": " + fridge.address}
                    updateSelected={props.updateSelected}
                    fridge={fridge}
                />
            ))}
        </div>
    )
}