import {HEAVY_WEIGHT as weight} from "../constants/constants";
import {SingleFridgePostForm} from "./SingleFridgePostForm";
import SingleFridgePostsDisplay from "./SingleFridgePostsDisplay";
import React, {useContext} from "react";
import {dateTimeToReadable} from "../utils/utils";
import SelectedFridgeContext from "../contexts/SelectedFridgeContext";

export function SingleFridgeInfoDisplay(props) {

    const thisSelectedFridge = useContext(SelectedFridgeContext);
    const thisSelectedFridgeOpened = dateTimeToReadable(thisSelectedFridge); // replace the lastOpen string with more human-readable string
    const thisSelectedFridgeTemp = thisSelectedFridge.temperature; // get the current temperature of the fridge

    return (
        <div>
            <div>
                <lastVisit style={{fontWeight: weight}}>
                    {'Last Visit: '}
                </lastVisit>
                {thisSelectedFridgeOpened || "Not Available"}
            </div>
            <temperature style={{fontWeight: weight}}>
                {'Current Temperature: '}
            </temperature>
            {thisSelectedFridgeTemp || "Not Available"}
            <SingleFridgePostForm/>
            <div style={{fontWeight: weight}}>
                Previous Posts:
            </div>
            <SingleFridgePostsDisplay/>
        </div>
    )
}