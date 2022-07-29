import React from "react";
import "../App.scss"
import redLoc from '../images/mapLocationIcon.png'
import blackLoc from '../images/mapLocationIconBlack.png'
import FridgeInformation from "./FridgeInformation";
import AllFridges from "./AllFridges";
import {useMapEvents} from "react-leaflet";

/**
 * This component decides whether to render a selected fridge's information, or render a list of buttons each relating
 * to a given fridge depending on whether a fridge is selected.
 * @param data - The JSON data relating to the currently available fridge data.
 * @param position {string} - The leaflet position that describes where the component should be in relation ot the map.
 * @return {JSX.Element} - An informative panel.
 */
export default function InformationPopup(props) {

    return (
        <div className="leaflet-control-container">
            <div className="leaflet-bottom leaflet-left">
                <div className="leaflet-control">
                    <img src={props.selectedFridge ? redLoc : blackLoc} style={{ height: 60, width: 40, marginLeft: 145, marginBottom: -50 }}
                         alt={"location symbol"} />
                    <div className="fridgeInfo">
                        {props.selectedFridge ? <FridgeInformation updateSelected={props.updateSelected} fridge={props.selectedFridge}/> :
                            <AllFridges located={props.located} data={props.data} updateSelected={props.updateSelected}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
