import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {Badge, ButtonGroup, Form, ListGroup, ToggleButton} from "react-bootstrap";
import ContactInfo from "./ContactInfo";
import {BsXLg} from "react-icons/bs";

/**
 * This component renders an information panel that contains information about the currently selected fridge. This
 * component should not be rendered if the state of the currently selected fridge is null.
 * @param fridge {JSON} - the currently selected fridge.
 * @return {JSX.Element} - A descriptive and interactive panel.
 */
export default function FridgeInformation(props) {

    const [contact, seeContact] = useState(false)
    const [input, updateForm] = useState('')
    const [radioValue, setRadioValue] = useState(2);

    let Filter = require('bad-words')
    let filter = new Filter();

    // replace the lastOpen string with more human-readable string
    const opened = props.fridge.lastOpen.replace("T", " ").substring(
        0, props.fridge.lastOpen.indexOf(":") + 3
    )

    // get the current temperature of the fridge
    const temp = props.fridge.temperature;

    function handleSubmit(e) {
        e.preventDefault();
        if (filter.clean(input).indexOf("*") < 0) {
            let today = Date(Date.now());
            let shortDate = today.substring(0, today.indexOf('GMT'));
            props.fridge.posts.unshift([input, shortDate]);
        };
        updateForm('');
    };

    const handleChange = (e) => {
        updateForm(e.target.value)
    };

    return (
        <div>
            <Button variant={"light"} onClick={() => props.updateSelected(null)}><BsXLg/></Button>
            <div style={{overflowY: "scroll"}}>
                <h1>{props.fridge.name}</h1>
                <h2>{props.fridge.address}</h2>
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
                    contact ? <ContactInfo fridge={props.fridge}/> :
                        <div>
                            <div><lastVisit style={{fontWeight: "bold"}}>Last Visit:</lastVisit> {opened || "Not Available"}</div>
                            <temperature style={{fontWeight: "bold"}}>Current Temperature:</temperature> {temp || "Not Available"}
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
                            <ListGroup>
                                {props.fridge.posts.map(post => <ListGroup.Item>
                                    {post[0] + "    "}
                                    <Badge bg="secondary" pill>
                                        {post[1]}
                                    </Badge>
                                </ListGroup.Item>)}
                            </ListGroup>
                        </div>
                }
            </div>
        </div>
    )
}