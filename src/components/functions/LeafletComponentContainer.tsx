/**
 * Returns a container with contents that can be displayed on top of a Leaflet map.
 * @param props will include at least a value for location, which will determine where
 *              on the map the container will appear; an additional value for className,
 *              if applicable, which will determine how the container will be displayed
 *              to Leaflet; and a value for contents, which will include the container filler.
 * @return {JSX.Element} A Leaflet Container with the provided contents in the given location.
 */
export default function LeafletComponentContainer(
	props: { location: string; contents: JSX.Element; className?: string;}
) {
	const containerLocation = props.location; // where on the map that this container should be.
	const containerContents = props.contents; // the contents that will fill the container.
	const containerClass = props.className || ''; // the style of the leaflet container.

	return (
		<div className="leaflet-control-container" onFocus={(e) => e.preventDefault()} style={{overflow: 'scroll', pointerEvents: 'auto'}}>
			<div className={containerLocation} style={{overflow: 'scroll', pointerEvents: 'auto'}}>
				<div style={{overflow: 'scroll', pointerEvents: 'auto'}} className={'leaflet-control ' + containerClass}>{containerContents}</div>
			</div>
		</div>
	);
}
