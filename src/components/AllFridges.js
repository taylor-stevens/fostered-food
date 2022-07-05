import PopupConstrols from "./PopupControls";
import React from "react";

/**
 * This component returns a list of buttons each associated with a given community fridge.
 * @param data {JSON} - The JSON data relating to the currently available fridge data.
 * @param updateSelected - {hook} the function that modifies which fridge is currently selected.
 * @return {JSX.Element} - A list of interactive buttons.
 */
export default function AllFridges({data, updateSelected}) {
    return (
        <div className>
            {data.map(fridge => (
                <PopupConstrols
                    text={fridge.name + ": " + fridge.address}
                    style={{
                        width: 'fit-content',
                        height: 'fit-content'
                    }}
                    click_on={updateSelected(fridge)}
                    click_off={updateSelected(null)}
                />
            ))}
        </div>
    )
}