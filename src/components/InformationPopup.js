import React from "react";
import "../App.scss"
import blackLoc from '../images/mapLocationIconBlack.png'
import FridgeInformation from "./FridgeInformation";
import AllFridges from "./AllFridges";

function InformationPopup(props) {
    const name = props.selectedFridge ? props.selectedFridge.name : "No Fridge Selected";

    return (
        <div className={props.position}>
            <div className="leaflet-control">
                <img src={blackLoc} style={{ height: 60, width: 40, marginLeft: 145, marginBottom: -50 }}
                     alt={"location symbol"} />
                <div className="fridgeInfo">
                    <h1>{name}</h1>
                    {props.selectedFridge ? <FridgeInformation /> :
                        <AllFridges data={props.data} updateSelected={props.updateSelected} />}
                </div>
            </div>
        </div>
    )
}

export default InformationPopup