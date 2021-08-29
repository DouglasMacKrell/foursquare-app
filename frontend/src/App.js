import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [latLong, setLatLong] = useState("");
  const [locationData, setLocationData] = useState("Loading...")


  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(response=>{
          console.log(response.coords)
          setLatLong(response.coords.latitude + "," + response.coords.longitude)
        });
      } else {
        setLocationData("Geolocation is not supported by this browser")
      }
    }
    getLocation();
  }, []);
  
  useEffect(() => {
    const getVenues =  () => {
      if (latLong !== "") {
        const endPoint = `http://localhost:3001/api/venues/${latLong}`;
        console.log(endPoint)
        axios.get(endPoint).then(response => {
          console.log(response)
          setLocationData({venue: response.data.response.groups[0].items})
        })
      } else {
        console.log("Oops! All errors!")
      }
    }
    getVenues();
  }, [latLong])

  return (
    <div className="App">
      {locationData.venue ? 
        <ul>
          {locationData.venue.map(venue => {
            return <li key={venue.venue.id}>{venue.venue.name + ", " + venue.venue.location.address + ", " + venue.venue.location.distance}</li>
          })}
        </ul>
        :
        <p>{locationData}</p>
      }
    </div>
  );
}

export default App;
