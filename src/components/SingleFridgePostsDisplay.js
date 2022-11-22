import React, { useContext, useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import SelectedFridgeContext from '../contexts/SelectedFridgeContext';
import { SECONDARY_BUTTON_COLOR as secondButtonColor } from '../constants/constants';

/**
 * Creates a list of the posts that are currently associated with the given fridge.
 * Relies on the SelectedFridgeContext for rendering the posts.
 * @returns {JSX.Element} A ListGroup containing all the current posts that thisFridge has.
 */
export default function SingleFridgePostsDisplay() {
	let thisSelectedFridge = useContext(SelectedFridgeContext); // the currently selected fridge.
	const [posts, updatePosts] = useState(thisSelectedFridge.posts);

	useEffect(() => {
		updatePosts(thisSelectedFridge.posts);
	}, [thisSelectedFridge]);

	return (
		<ListGroup>
			{posts.map((post) => (
				<ListGroup.Item>
					{post[0] + '    '}
					<Badge bg={secondButtonColor} pill>
						{post[1]}
					</Badge>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}
