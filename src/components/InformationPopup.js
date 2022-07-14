import React from "react";
import "../App.scss"
import blackLoc from '../images/mapLocationIconBlack.png'
import FridgeInformation from "./FridgeInformation";
import AllFridges from "./AllFridges";

/**
 * This component decides whether to render a selected fridge's information, or render a list of buttons each relating
 * to a given fridge depending on whether a fridge is selected.
 * @param data - The JSON data relating to the currently available fridge data.
 * @param position {string} - The leaflet position that describes where the component should be in relation ot the map.
 * @return {JSX.Element} - An informative panel.
 */
export default function InformationPopup(props) {
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
