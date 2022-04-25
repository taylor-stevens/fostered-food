import PopupControls from "./PopupControls";
import React from "react";

function FridgeInformation() {
    return (
        <div>
            <h2>100 Address Street Line, City ST 31413</h2>
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

export default FridgeInformation;