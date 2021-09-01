import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

import ReactMapGL, { Marker, Popup, WebMercatorViewport } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { ReactComponent as BeholdBurritoLogo } from "./Behold-Burrito.svg";

function App() {
  const [latLong, setLatLong] = useState("");
  const [locationData, setLocationData] = useState("Loading...");

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vh",
    latitude: 43.25,
    longitude: -70.9,
    zoom: 13,
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const mapRef = useRef();

  const getBounds = (closeLng, closeLat, furthestLng, furthestLat) => {
    const { offsetHeight: height, offsetWidth: width } = mapRef.getContainer();
    const bounds = new WebMercatorViewport({
      width: width,
      height: height,
    }).fitBounds(
      [
        [closeLng, closeLat],
        [furthestLng, furthestLat],
      ],
      { padding: 20, offset: [0, -100] }
    );
    const { longitude, latitude, zoom } = bounds;
    return { longitude, latitude, zoom };
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((response) => {
          setLat(response.coords.latitude);
          setLng(response.coords.longitude);
          setLatLong(
            response.coords.latitude + "," + response.coords.longitude
          );
          setViewport({
            width: "100vw",
            height: "50vh",
            latitude: response.coords.latitude,
            longitude: response.coords.longitude,
          });
        });
        console.log("getLocation");
      } else {
        setLocationData("Geolocation is not supported by this browser");
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    const getVenues = async () => {
      if (latLong !== "") {
        try {
          const endPoint = `https://beholdburrito.herokuapp.com/api/venues/${latLong}`;
          console.log("getVenues");
          await axios.get(endPoint).then((response) => {
            setLocationData({ venue: response.data.response.groups[0].items });
            let furthestPointLat =
              response.data.response.groups[0].items[9].venue.location.lat;
            let furthestPointLng =
              response.data.response.groups[0].items[9].venue.location.lng;
            const myBounds = getBounds(lng, lat, furthestPointLng, furthestPointLat);
            console.log(myBounds)
            setViewport({
              ...myBounds,
            });
          });
        } catch (error) {
          throw error;
        }
      }
    };
    getVenues();
  }, [latLong]);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYmlnbWFja3JlbGwiLCJhIjoiY2tzeTVxdm83MWJrNzJycGx4ZHE1YzhxMiJ9.b5E1tiWaOP1SFrxze9vGrA"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/bigmackrell/cksxr7r8n8cim17nkzr5coegq"
        ref={mapRef}
      >
        {locationData.venue ? (
          <>
            <Marker
              key="youarehere"
              latitude={lat}
              longitude={lng}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <PersonPinIcon
                style={{
                  fontSize: viewport.zoom * 3,
                  color: "tomato",
                }}
              />
            </Marker>
            {locationData.venue.map((venue) => {
              return (
                <>
                  <Marker
                    key={venue.referralId}
                    latitude={venue.venue.location.lat}
                    longitude={venue.venue.location.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                  >
                    <RoomIcon
                      style={{
                        fontSize: viewport.zoom * 3,
                        color: "slateblue",
                        cursor: "pointer",
                      }}
                      onClick={() => handleMarkerClick(venue.venue.id)}
                    />
                  </Marker>
                  {venue.venue.id === currentPlaceId && (
                    <Popup
                      latitude={venue.venue.location.lat}
                      longitude={venue.venue.location.lng}
                      closeButton={true}
                      closeOnClick={false}
                      anchor="right"
                      sortByDepth={true}
                      onClose={() => setCurrentPlaceId(null)}
                    >
                      <div className="card">
                        <label>Name</label>
                        <h4>{venue.venue.name}</h4>
                        <label>Address</label>
                        <p>{venue.venue.location.formattedAddress[0]}</p>
                      </div>
                    </Popup>
                  )}
                </>
              );
            })}
          </>
        ) : (
          <>
            <Marker
              latitude={lat}
              longitude={lng}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <RoomIcon
                style={{ fontSize: viewport.zoom * 5, color: "slateblue" }}
              />
            </Marker>
          </>
        )}
      </ReactMapGL>
      <BeholdBurritoLogo className="logo" />
      <div className="list-container">
        <div className="list-subcontainer">
          {locationData.venue ? (
            <ul>
              {locationData.venue.map((venue) => {
                return (
                  <a
                    key={venue.venue.id}
                    href={`http://www.google.com/search?q=${venue.venue.name.replace(
                      /\s+/g,
                      "+"
                    )}`}
                  >
                    <li key={venue.venue.id}>
                      {venue.venue.name +
                        ", " +
                        venue.venue.location.address +
                        ", " +
                        venue.venue.location.distance +
                        " Meters Away"}
                    </li>
                  </a>
                );
              })}
            </ul>
          ) : (
            <p>{locationData}</p>
          )}
        </div>
      </div>
      <a href="https://douglasmackrell.com" className="credit">
        <h3>Designed and built by Douglas MacKrell</h3>
      </a>
    </div>
  );
}

export default App;
