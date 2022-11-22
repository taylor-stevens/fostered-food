/**
 * Returns a container with contents that can be displayed on top of a Leaflet map.
 * @param props will include at least a value for location, which will determine where
 *              on the map the container will appear; an additional value for className,
 *              if applicable, which will determine how the container will be displayed
 *              to Leaflet; and a value for contents, which will include the container filler.
 * @return {JSX.Element} a Leaflet Container with the provided contents in the given location.
 */
export default function LeafletComponentContainer(props) {
	const containerLocation = props.location; // where on the map that this container should be.
	const containerClass = props.className || ''; // the style of the leaflet container.
	const containerContents = props.contents; // the contents that will fill the container.

	return (
		<div className="leaflet-control-container">
			<div className={containerLocation}>
				<div className={'leaflet-control ' + containerClass}>{containerContents}</div>
			</div>
		</div>
	);
}
