import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { ReactComponent as BeholdBurritoLogo } from './Behold-Burrito.svg'

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
    zoom: 15,
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((response) => {
          console.log(response.coords);
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
            zoom: 15,
          });
        });
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
          const endPoint = `http://localhost:3001/api/venues/${latLong}`;
          console.log(endPoint);
          await axios.get(endPoint).then((response) => {
            console.log(response.data.response.groups[0].items);
            setLocationData({ venue: response.data.response.groups[0].items });
          });
        } catch (error) {
          throw error;
        }
      } else {
        console.log("Oops! All errors!");
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
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/bigmackrell/cksxr7r8n8cim17nkzr5coegq"
      >
        {locationData.venue ? (
          <>
            <Marker
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
                    key={venue.referralId}
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
    </div>
  );
}

export default App;
