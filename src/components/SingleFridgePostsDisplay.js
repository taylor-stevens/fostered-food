import React from "react";
import {Badge, ListGroup} from "react-bootstrap";

/**
 * Creates a list of the posts that are currently associated with the given fridge.
 * @param props will include at least a value for fridge, the current fridge that is being displayed.
 * @returns {JSX.Element} A ListGroup containing all the current posts that thisFridge has.
 */
export default function SingleFridgePostsDisplay(props) {

    const thisFridge = props.fridge; // the currently selected fridge.

    // 'secondary' is the color of the dark grey elements in Bootstrap.
    return (
        <ListGroup>
            {thisFridge.posts.map(post =>
                <ListGroup.Item>
                    {post[0] + "    "}
                    <Badge bg="secondary" pill>
                        {post[1]}
                    </Badge>
                </ListGroup.Item>)}
        </ListGroup>
    )
}