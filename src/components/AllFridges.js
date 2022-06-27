import PopupConstrols from "./PopupControls";
import React from "react";

function AllFridges(props) {
    return (
        <div className>
            {props.data.map(fridge => (
                <PopupConstrols
                    text={fridge.name + ": " + fridge.address}
                    style={{
                        width: 'fit-content',
                        height: 'fit-content'
                    }}
                    click_on={props.updateSelected(fridge)}
                    click_off={props.updateSelected(null)}
                />
            ))}
        </div>
    )
}

export default AllFridges;