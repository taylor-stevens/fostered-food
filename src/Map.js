import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./index.css"

export default function Map() {
  const position = [42.36, -71.05]

  
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>

  )
}