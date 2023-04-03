import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import {useSelectedFridgeContext} from '../../contexts/SelectedFridgeContext';
import { SECONDARY_BUTTON_COLOR as secondButtonColor } from '../../constants/constants';

/**
 * Creates a list of the posts that are currently associated with the given Fridge.
 * Relies on the SelectedFridgeContext for rendering the posts.
 * @returns {JSX.Element} A ListGroup containing all the current posts that this Fridge has.
 */
export default function SingleFridgePostsDisplay() {
	// the currently selected Fridge that this function renders information about, according to the contexts
	const [selected, setSelected] = useSelectedFridgeContext();
	// the posts that the selected Fridge has that this function renders information about
	const [posts, updatePosts] = useState(selected.fridge?.posts || []);

	useEffect(() => {
		if (selected.fridge !== undefined) updatePosts(selected.fridge.posts);
	}, [selected.fridge]);

	return (
		<ListGroup aria-label={'singleFridgePostsDisplay'}>
			{posts.map((post: any) => (
				<div className={'fridgePost'} key={post[0]}>
					<ListGroup.Item aria-label={'singleFridgePostItem'}>
						{post[0] + '    '}
						<Badge bg={secondButtonColor} pill>
							{post[1]}
						</Badge>
					</ListGroup.Item>
				</div>
			))}
		</ListGroup>
	);
}
