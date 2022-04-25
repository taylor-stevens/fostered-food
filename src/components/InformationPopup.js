import React, {useEffect, useRef} from "react";
import "../App.scss"
import blackLoc from '../images/mapLocationIconBlack.png'
import fridges from "../data/fridges.json"
import PopupControls from "./PopupControls";
import MapControls from "./MapControls";
import FridgeInformation from "./FridgeInformation";
import AllFridges from "./AllFridges";
import * as L from "leaflet";

function InformationPopup({position, selectedFridge, updateSelected}){
    const name = selectedFridge ? selectedFridge.name : "No Fridge Selected";

    /*
    const divRef = useRef(null);

    useEffect(() => {
        L.DomEvent.disableClickPropagation(divRef.current);
    });
    */

    return ( <div className={position}>
                <div style="leaflet-control leaflet-bar" style={{border: 'transparent', overflowY: 'scroll'}}>
                    <img src={blackLoc} style={{height: 60, width: 40, marginLeft: 145, marginBottom: -50}} alt={"location symbol"}/>
                    <div className="fridgeInfo">
                        <h1>{name}</h1>
                        {selectedFridge ? <FridgeInformation/> : <AllFridges updateSelected={updateSelected}/>}
                    </div>
                </div>
            </div>
    )
}

/*
light to dark mint map colors
#e4f1e1,#b4d9cc,#89c0b6,#63a6a0,#448c8a,#287274,#0d585f
light to dark teal map colors
#d1eeea,#a8dbd9,#85c4c9,#68abb8,#4f90a6,#3b738f,#2a5674
 */

export default InformationPopup