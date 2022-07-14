import PopupControls from "./PopupControls";
import React from "react";

/**
 * This component renders an information panel that contains information about the currently selected fridge. This
 * component should not be rendered if the state of the currently selected fridge is null.
 * @param fridge {JSON} - the currently selected fridge.
 * @return {JSX.Element} - A descriptive and interactive panel.
 */
export default function FridgeInformation(props) {
    return (
        <div>
            <h2>{props.fridge.name}</h2>
            <PopupControls text='Contact Fridge'/>
            <PopupControls text='Make a Post' style={{
                float: 'right',
                color: 'black',
                backgroundColor: '#89c0b6',
                borderColor: 'transparent'
            }}/>
            <p style={{marginTop: '20px'}}>Updates</p>
            <p style={{fontSize: '12px'}}>Last Visit: 11/29/21 10:15</p>
        </div>
    )
}
