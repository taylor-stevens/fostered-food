import PopupConstrols from "./PopupControls";
import React from "react";

function AllFridges({data, updateSelected}) {
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

export default AllFridges;