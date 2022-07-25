import PopupControls from "./PopupControls";
import React, {useEffect, useMemo, useState} from "react";
import Button from "react-bootstrap/Button";
import {Badge, ButtonGroup, Form, ListGroup} from "react-bootstrap";
import ContactInfo from "./ContactInfo";
import {BsXLg} from "react-icons/bs";
import AutosizeInput from 'react-input-autosize';
import {List} from "react-bootstrap-icons";

/**
 * This component renders an information panel that contains information about the currently selected fridge. This
 * component should not be rendered if the state of the currently selected fridge is null.
 * @param fridge {JSON} - the currently selected fridge.
 * @return {JSX.Element} - A descriptive and interactive panel.
 */
export default function FridgeInformation(props) {

    const [contact, seeContact] = useState(false)
    const [input, updateForm] = useState('')

    // replace the lastOpen string with more human-readable string
    const opened = props.fridge.lastOpen.replace("T", " ").substring(
        0, props.fridge.lastOpen.indexOf(":") + 3
    )

    function handleSubmit(e) {
        //console.log('submit')
        e.preventDefault();
        let today = Date(Date.now());
        let shortDate = today.substring(0, today.indexOf('GMT'))
        props.fridge.posts.unshift([input, shortDate]);
        console.log(props.fridge.posts)
        updateForm('')
    }

    const handleChange = (e) => {
        //event.persist();
        // updateForm((value) => ({
        //     ...value,
        //     input: event.target.value,
        // }));
        updateForm(e.target.value)
    };

    return (
        <div>
            <Button variant={"light"} onClick={() => props.updateSelected(null)}><BsXLg/></Button>
            <h1>{props.fridge.name}</h1>
            <h2>{props.fridge.address}</h2>
            <h2>
                <ButtonGroup style={{width: "100%"}}>
                    <Button variant={"secondary"} style={{fontSize: 12}} onClick={() => seeContact(false)}>Fridge Information</Button>
                    <Button variant={"secondary"} style={{fontSize: 12}} onClick={() => seeContact(true)}>Contact Fridge</Button>
                </ButtonGroup>
            </h2>
            {
                contact ? <ContactInfo fridge={props.fridge}/> :
                    <div>
                        <div>Last Visit: {opened || "unknown"}</div>

                        <Form onSubmit={handleSubmit} style={{marginTop: 15, marginBottom: 15}}>
                            <Form.Group className="mb-3" controlId="formInput">
                                <Form.Label>Post About the Fridge:</Form.Label>
                                <Form.Control size={"sm"} type="text" value={input} onChange={handleChange} placeholder="Added Fresh Apples!" />
                                <Form.Text className="text-muted">
                                    Tell others whats in the fridge or if something is wrong.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="secondary" type="submit" style={{fontSize: 12}}>
                                Submit
                            </Button>
                        </Form>
                        Previous Posts:
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
    )
}


//<form onSubmit={handleSubmit}>
//                             <label>
//                                 <div>Post:</div>
//                                 <AutosizeInput
//                                     name="auto-input"
//                                     type="text"
//                                     value={input}
//                                     placeholder="Tell Others Whats in the Fridge"
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                             <input type="submit" value="Submit" />
//                         </form>