import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {ButtonGroup, Form, ToggleButton} from "react-bootstrap";
import SingleFridgeContactInfo from "./SingleFridgeContactInfo";
import {BsXLg} from "react-icons/bs";
import {containsExplicitText, dateTimeToReadable, todaysDateShortened} from "../utils/utils";
import SingleFridgePostsDisplay from "./SingleFridgePostsDisplay";

/**
 * This component renders an information panel that contains information about the currently
 * selected fridge. This component should not be rendered if the state of the
 * currently selected fridge is null.
 * @param props will include at least a value for fridge, the current fridge that is being displayed.
 * @return {JSX.Element} A descriptive and interactive panel for the currently selected fridge.
 */
export default function SingleFridgeInfoDisplay(props) {

    const thisFridge = props.fridge; // the fridge that is being displayed
    const updateCurrentlySelectedFridge = props.updateSelected; // state updater to change the currently
                                                                // selected fridge.
    const thisFridgeTemp = thisFridge.temperature; // get the current temperature of the fridge
    const thisFridgeName = thisFridge.name; // the name of the current fridge.
    const thisFridgeAddress = thisFridge.address; // the address of the current fridge.
    const opened = dateTimeToReadable(thisFridge); // replace the lastOpen string with more human-readable string
    const [contact, seeContact] = useState(false) // the state that determines whether to display
                                                            // the contact info for this fridge
    const [input, updateForm] = useState('') // the state that holds the current form input
    const [radioValue, setRadioValue] = useState(2); // the state that determines the current display

    // perform this function when the Bootstrap form for posts is submitted.
    function handleSubmit(e) {
        e.preventDefault();
        // check for explicit text before posting the text to the fridge's feed
        if (!containsExplicitText(input)) {
            // place the most recent post at the top of the list of posts
            thisFridge.posts.unshift([input, todaysDateShortened()]);
        };
        updateForm(''); // clear the form
    };

    const handleChange = (e) => {
        updateForm(e.target.value)
    };

    return (
        <div>
            <Button variant={"light"} onClick={() => updateCurrentlySelectedFridge(null)}><BsXLg/></Button>
            <div style={{overflowY: "scroll"}}>
                <h1>{thisFridgeName}</h1>
                <h2>{thisFridgeAddress}</h2>
                <h2>
                    <ButtonGroup size={"sm"} className="me-2" aria-label="First group">
                        <ToggleButton value={2}
                                      checked={radioValue === 2}
                                      type={"radio"}
                                      variant={radioValue % 3 ? 'danger' : 'outline-danger'}
                                      style={{fontSize: 12}}
                                      onClick={() => {
                                          seeContact(false);
                                          setRadioValue(2);
                                      }}>
                            Fridge Information
                        </ToggleButton>
                        <ToggleButton value={3}
                                      checked={radioValue === 3}
                                      type={"radio"}
                                      variant={radioValue % 2 ? 'danger' : 'outline-danger'}
                                      style={{fontSize: 12}}
                                      onClick={() => {
                                          seeContact(true);
                                          setRadioValue(3)
                                      }}>
                            Contact Information
                        </ToggleButton>
                    </ButtonGroup>
                </h2>
                {
                    contact ? <SingleFridgeContactInfo fridge={thisFridge}/> :
                        <div>
                            <div><lastVisit style={{fontWeight: "bold"}}>Last Visit:</lastVisit> {opened || "Not Available"}</div>
                            <temperature style={{fontWeight: "bold"}}>Current Temperature:</temperature> {thisFridgeTemp || "Not Available"}
                            <Form onSubmit={handleSubmit} style={{marginTop: 15, marginBottom: 15}}>
                                <Form.Group className="mb-3" controlId="formInput">
                                    <Form.Label style={{fontWeight:"bold"}}>Post About the Fridge:</Form.Label>
                                    <Form.Control size={"sm"} type="text" value={input} onChange={handleChange} placeholder="Added Fresh Apples!"/>
                                    <Form.Text className="text-muted">
                                        Tell others whats in the fridge or if something is wrong.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="secondary" type="submit" style={{fontSize: 12}}>
                                    Submit
                                </Button>
                            </Form>
                            <div style={{fontWeight: "bold"}}>Previous Posts:</div>
                            <SingleFridgePostsDisplay fridge={thisFridge}/>
                        </div>
                }
            </div>
        </div>
    )
}