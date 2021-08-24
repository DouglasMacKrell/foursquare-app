import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [latLong, setLatLong] = useState("");


  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(response=>{
      console.log(response.coords)
      setLatLong(response.coords.latitude + "," + response.coords.longitude)
    });
  }

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <div className="App">

    </div>
  );
}

export default App;
