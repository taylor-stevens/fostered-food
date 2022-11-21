import {useContext} from "react";
import SelectedFridgeContext from "../contexts/SelectedFridgeContext";

/**
 * Displays the contact information of the Fridge that is sent as a paramater.
 * @param props will include at least a value for fridge, the fridge for which
 *              the contact information needs to be rendered.
 * @return {JSX.Element} that lists out the points of contact that are known
 *                      for a given fridge.
 */
export default function SingleFridgeContactInfo(props) {

    const thisFridge = useContext(SelectedFridgeContext); // the fridge who's contact information is being displayed.

    return (
        <div>
            {thisFridge.contact.map(
                contact =>
                    <div>
                        <div style={{fontWeight: "bold"}}>
                            {contact[0]}
                        </div>
                        <div>
                            {contact[1]}
                        </div>
                    </div>
            )}
        </div>
    )
}