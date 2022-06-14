import React from "react";
import "../App.scss"
import blackLoc from '../images/mapLocationIconBlack.png'
import FridgeInformation from "./FridgeInformation";
import AllFridges from "./AllFridges";

function InformationPopup({ data, position, selectedFridge, updateSelected }) {
    const name = selectedFridge ? selectedFridge.name : "No Fridge Selected";

    return (
        <div className={position}>
            <div className="leaflet-control">
                <img src={blackLoc} style={{ height: 60, width: 40, marginLeft: 145, marginBottom: -50 }} alt={"location symbol"} />
                <div className="fridgeInfo">
                    <h1>{name}</h1>
                    {selectedFridge ? <FridgeInformation /> : <AllFridges data={data} updateSelected={updateSelected} />}
                </div>
            </div>
        </div>
    )
}

export default InformationPopup