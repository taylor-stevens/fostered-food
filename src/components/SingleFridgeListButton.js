import {useMapEvents} from "react-leaflet";
import '../App.scss'
import Button from "react-bootstrap/Button";
import {DEFAULT_TEXT_SIZE as textSize} from '../constants/constants'

/**
 * Renders a button representing the given fridge that when clicked, will render a
 * related fridge information page.
 * @param props will at least include a value for fridge, which is the fridge that is
 *              associated with this button; and a value for updateSelected, which is a
 *              function that allows this fridge to become the currentlySelected fridge
 *              to be displayed.
 * @return {JSX.Element} A Button that can be clicked to display information about the
 *                       given fridge.
 */
export default function SingleFridgeListButton(props) {

    const thisFridge = props.fridge; // the fridge that this button is representing
    const thisFridgesLocation = thisFridge.location; // the location of this fridge.
    const updatedCurrentlySelectedFridge = props.updateSelected; // the function to update the
                                                                 // selected fridge.

    // function that returns the map that s being interacted with, such that the user
    // will be able to have their view updated depending on the map elements that
    // they are interacting with.
    const map = useMapEvents({
        click(e) {
            console.log('Map Interaction Made.')
        },
    })

    // update the view of the map to be centered on this fridge, setting the zoom of the map to 14
    // and doing so at a speed that is visible to the user (1.5 seconds)
    let updateView = () => {
        updatedCurrentlySelectedFridge(thisFridge);
        map.flyTo(
            thisFridgesLocation,
            14, // the distance of the user to the map (how much detail the map will show them)
            {duration: 1.5} // the amount of time that updating/panning the view should take
        );
    }

    return (
        <div key={thisFridgesLocation} className="popUpControls">
            <Button variant="outline-secondary" style={{fontSize: textSize}} size="sm" key={thisFridgesLocation} onClick={updateView}>
                {thisFridge.name + ": " + thisFridge.address}
            </Button>
        </div>
    )
}