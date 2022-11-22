import React, {useContext, useEffect, useState} from "react";
import {Badge, ListGroup} from "react-bootstrap";
import SelectedFridgeContext from "../contexts/SelectedFridgeContext";
import {SECONDARY_BUTTON_COLOR as secondButtonColor} from '../constants/constants'

/**
 * Creates a list of the posts that are currently associated with the given fridge.
 * @param props will include at least a value for fridge, the current fridge that is being displayed.
 * @returns {JSX.Element} A ListGroup containing all the current posts that thisFridge has.
 */
export default function SingleFridgePostsDisplay(props) {

    let thisSelectedFridge = useContext(SelectedFridgeContext); // the currently selected fridge.
    const [posts, updatePosts] = useState(thisSelectedFridge.posts);

    useEffect(() => {
        updatePosts(thisSelectedFridge.posts)
    }, [thisSelectedFridge])

    // 'secondary' is the color of the dark grey elements in Bootstrap.
    return (
        <ListGroup>
            {posts.map(post =>
                <ListGroup.Item>
                    {post[0] + "    "}
                    <Badge bg={secondButtonColor} pill>
                        {post[1]}
                    </Badge>
                </ListGroup.Item>)}
        </ListGroup>
    )
}