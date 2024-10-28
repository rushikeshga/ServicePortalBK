// import React, { useState } from 'react';

// function GeocodeComponent() {
//   const [pincode1, setPincode1] = useState('');
//   const [pincode2, setPincode2] = useState('');
//   const [coordinates1, setCoordinates1] = useState(null);
//   const [coordinates2, setCoordinates2] = useState(null);

//   const handleChange1 = (e) => {
//     setPincode1(e.target.value);
//   };

//   const handleChange2 = (e) => {
//     setPincode2(e.target.value);
//   };

//   const handleSearch1 = () => {
//     fetch(
//       `https://nominatim.openstreetmap.org/search?postalcode=${pincode1}&format=json`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.length > 0) {
//           const { lat, lon } = data[0];
//           setCoordinates1({ latitude: lat, longitude: lon });
//         } else {
//           console.log('No results found');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching geocode data:', error);
//       });
//   };

//   const handleSearch2 = () => {
//     fetch(
//       `https://nominatim.openstreetmap.org/search?postalcode=${pincode2}&format=json`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);

//         if (data.length > 0) {
//           const { lat, lon } = data[0];
//           setCoordinates2({ latitude: lat, longitude: lon });
//         } else {
//           console.log('No results found');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching geocode data:', error);
//       });
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={pincode1}
//           onChange={handleChange1}
//           placeholder="Enter Pincode 1"
//         />
//         <button onClick={handleSearch1}>Search 1</button>
//         {coordinates1 && (
//           <div>
//             Latitude: {coordinates1.latitude}, Longitude: {coordinates1.longitude}
//           </div>
//         )}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={pincode2}
//           onChange={handleChange2}
//           placeholder="Enter Pincode 2"
//         />
//         <button onClick={handleSearch2}>Search 2</button>
//         {coordinates2 && (
//           <div>
//             Latitude: {coordinates2.latitude}, Longitude: {coordinates2.longitude}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GeocodeComponent;



// for pin,state,city------------------------------

// import React, { useState } from 'react';

// function GeocodeComponent() {
//   const [pincode, setPincode] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [coordinates, setCoordinates] = useState(null);

//   const handleChangePincode = (e) => {
//     setPincode(e.target.value);
//   };

//   const handleChangeCity = (e) => {
//     setCity(e.target.value);
//   };

//   const handleChangeState = (e) => {
//     setState(e.target.value);
//   };

//   const handleSearch = () => {
//     const address = `${pincode}, ${city}, ${state}`;
//     fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//         address
//       )}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.length > 0) {
//           const { lat, lon } = data[0];
//           setCoordinates({ latitude: lat, longitude: lon });
//         } else {
//           console.log('No results found');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching geocode data:', error);
//       });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={pincode}
//         onChange={handleChangePincode}
//         placeholder="Enter Pincode"
//       />
//       <input
//         type="text"
//         value={city}
//         onChange={handleChangeCity}
//         placeholder="Enter City"
//       />
//       <input
//         type="text"
//         value={state}
//         onChange={handleChangeState}
//         placeholder="Enter State"
//       />
//       <button onClick={handleSearch}>Search</button>
//       {coordinates && (
//         <div>
//           Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
//         </div>
//       )}
//     </div>
//   );
// }

// export default GeocodeComponent;








// -------------------------------------for pincode with country Code---------------------------




// import React, { useState } from 'react';

// function GeocodeComponent() {
//   const [pincode, setPincode] = useState('');
//   const [country, setCountry] = useState('');
//   const [coordinates, setCoordinates] = useState(null);

//   const handleChangePincode = (e) => {
//     setPincode(e.target.value);
//   };

//   const handleChangeCountry = (e) => {
//     setCountry(e.target.value);
//   };

//   const handleSearch = () => {
//     const address = `${pincode}, ${country}`;
//     fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&countrycodes=${encodeURIComponent(country)}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.length > 0) {
//           const { lat, lon } = data[0];
//           setCoordinates({ latitude: lat, longitude: lon });
//         } else {
//           console.log('No results found');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching geocode data:', error);
//       });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={pincode}
//         onChange={handleChangePincode}
//         placeholder="Enter Pincode"
//       />
//       <input
//         type="text"
//         value={country}
//         onChange={handleChangeCountry}
//         placeholder="Enter Country Code (e.g., US)"
//       />
//       <button onClick={handleSearch}>Search</button>
//       {coordinates && (
//         <div>
//           Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
//         </div>
//       )}
//     </div>
//   );
// }

// export default GeocodeComponent;















// ---------------------------calculate distance from geocodes----------------------------------





// import React, { useState,useEffect } from 'react';

// function GeocodeComponent() {
//   const [pincode1, setPincode1] = useState('');
//   const [pincode2, setPincode2] = useState('');
//   const [country, setCountry] = useState('');
//   const [coordinates1, setCoordinates1] = useState(null);
//   const [coordinates2, setCoordinates2] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const handleChangePincode1 = (e) => {
//     setPincode1(e.target.value);
//   };

//   const handleChangePincode2 = (e) => {
//     setPincode2(e.target.value);
//   };

//   const handleChangeCountry = (e) => {
//     setCountry(e.target.value);
//   };

//   const handleSearch = () => {
//     const address1 = `${pincode1}, ${country}`;
//     const address2 = `${pincode2}, ${country}`;
    
//     // Fetch coordinates for pincode 1
//     fetchGeocode(address1, (data) => {
//       if (data.length > 0) {
//         const { lat, lon } = data[0];
//         setCoordinates1({ latitude: lat, longitude: lon });
//       } else {
//         console.log('No results found for pincode 1');
//       }
//     });

//     // Fetch coordinates for pincode 2
//     fetchGeocode(address2, (data) => {
//       if (data.length > 0) {
//         const { lat, lon } = data[0];
//         setCoordinates2({ latitude: lat, longitude: lon });
//       } else {
//         console.log('No results found for pincode 2');
//       }
//     });
//   };

//   const fetchGeocode = (address, callback) => {
//     fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//         address
//       )}&countrycodes=${encodeURIComponent(country)}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         callback(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching geocode data:', error);
//       });
//   };

//   const calculateDistance = () => {
//     if (coordinates1 && coordinates2) {
//       const R = 6371; // Radius of the Earth in km
//       const lat1 = coordinates1.latitude;
//       const lon1 = coordinates1.longitude;
//       const lat2 = coordinates2.latitude;
//       const lon2 = coordinates2.longitude;

//       const dLat = (lat2 - lat1) * (Math.PI / 180);
//       const dLon = (lon2 - lon1) * (Math.PI / 180);

//       const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * (Math.PI / 180)) *
//           Math.cos(lat2 * (Math.PI / 180)) *
//           Math.sin(dLon / 2) *
//           Math.sin(dLon / 2);

//       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//       const distance = R * c; // Distance in km
//       console.log(distance);
//       setDistance(distance);
//     }
//   };



//   useEffect(() => {
//     calculateDistance();
//   }, [coordinates1, coordinates2]);
//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={pincode1}
//           onChange={handleChangePincode1}
//           placeholder="Enter Pincode 1"
//         />
//         <input
//           type="text"
//           value={pincode2}
//           onChange={handleChangePincode2}
//           placeholder="Enter Pincode 2"
//         />
//         <input
//           type="text"
//           value={country}
//           onChange={handleChangeCountry}
//           placeholder="Enter Country Code (e.g., US)"
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {distance && (
//         <div>
//           Distance between coordinates: {distance.toFixed(2)} km
//         </div>
//       )}
//     </div>
//   );
// }

// export default GeocodeComponent;





// -------------------------------------------------------------with openrouteServices-------------------------------



import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import LineString from 'ol/geom/LineString';
import OSM from 'ol/source/OSM';
import Stroke from 'ol/style/Stroke';

import 'ol/ol.css';

function GeocodeComponent() {
  const [pincode1, setPincode1] = useState('');
  const [pincode2, setPincode2] = useState('');
  const [distance, setDistance] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    setMap(map);


    return () => {
      map.setTarget(null);
    };
    
  }, []);


//   working last

//   async function getCoordinates(pincode, country) {
//     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
//     const data = await response.json();
//     if (data.length > 0) {
//       return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
//     } else {
//       throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
//     }
// }


//   async function calculateRoute() {
//     try {
//       const startCoords = await getCoordinates(pincode1, 'IN');
//       const endCoords = await getCoordinates(pincode2, 'IN');
      

      

//       const apiKey = '5b3ce3597851110001cf624815ae7f6543c3475f9e918d014d3f2ce2'; // Replace with your OpenRouteService API key
//       const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error.message);
//       }

//       const route = data.features[0];
//       const distanceInMeters = route.properties.summary.distance; // Distance in meters
//       const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

//       setDistance(distanceInKilometers);


//       map.getLayers().forEach(layer => {
//         if (layer instanceof VectorLayer) {
//           map.removeLayer(layer);
//         }
//       });
      
//       // Display route on map
//       const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
//       const routeFeature = new Feature({
//         geometry: new LineString(coordinates),
//       });
//       const routeLayer = new VectorLayer({
//         source: new VectorSource({
//           features: [routeFeature],
//         }),
//         style: new Style({
//           stroke: new Stroke({
//             color: 'blue',
//             width: 2,
//           }),
//         }),
//       });
//       map.addLayer(routeLayer);

//     } catch (error) {
//       console.error('Error calculating route:', error);
//       setDistance(null);
//     }
//   }


//   end working last



async function getCoordinates(address) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
  const data = await response.json();
  if (data.length > 0) {
    return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
  } else {
    throw new Error(`No coordinates found for address: ${address}`);
  }
}

// async function calculateRoute(startAddress, endAddress) {
//   try {
//     const startCoords = await getCoordinates(startAddress);
//     const endCoords = await getCoordinates(endAddress);

//     const apiKey = '5b3ce3597851110001cf624815ae7f6543c3475f9e918d014d3f2ce2';
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     const route = data.features[0];
//     const distanceInMeters = route.properties.summary.distance; // Distance in meters
//     const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

//     setDistance(distanceInKilometers);

//     map.getLayers().forEach(layer => {
//       if (layer instanceof VectorLayer) {
//         map.removeLayer(layer);
//       }
//     });

//     // Display route on map
//     const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
//     const routeFeature = new Feature({
//       geometry: new LineString(coordinates),
//     });
//     const routeLayer = new VectorLayer({
//       source: new VectorSource({
//         features: [routeFeature],
//       }),
//       style: new Style({
//         stroke: new Stroke({
//           color: 'blue',
//           width: 2,
//         }),
//       }),
//     });
//     map.addLayer(routeLayer);

//   } catch (error) {
//     console.error('Error calculating route:', error);
//     setDistance(null);
//   }
// }









// async function calculateRoute(startAddress, endAddress) {
//   try {
//     console.log("calculateRoute called with:", startAddress, endAddress);
//     const startCoords = await getCoordinates(startAddress);
//     const endCoords = await getCoordinates(endAddress);

//     console.log("Start Coordinates:", startCoords);
//     console.log("End Coordinates:", endCoords);

//     const apiKey = '5b3ce3597851110001cf624815ae7f6543c3475f9e918d014d3f2ce2'; // Replace with your OpenRouteService API key
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

//     console.log("Fetching route from URL:", url);

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     const route = data.features[0];
//     const distanceInMeters = route.properties.summary.distance; // Distance in meters
//     const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

//     console.log("Distance in Kilometers:", distanceInKilometers);
//     setDistance(distanceInKilometers);

//     // Assuming map is defined and configured
//     map.getLayers().forEach(layer => {
//       if (layer instanceof VectorLayer) {
//         map.removeLayer(layer);
//       }
//     });

//     const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
//     const routeFeature = new Feature({
//       geometry: new LineString(coordinates),
//     });
//     const routeLayer = new VectorLayer({
//       source: new VectorSource({
//         features: [routeFeature],
//       }),
//       style: new Style({
//         stroke: new Stroke({
//           color: 'blue',
//           width: 2,
//         }),
//       }),
//     });
//     map.addLayer(routeLayer);

//   } catch (error) {
//     console.error('Error calculating route:', error);
//     setDistance(null);
//   }
// }







// function handleSubmit(e) {
//   e.preventDefault();
//   console.log("handleSubmit called with pincode1:", pincode1, "pincode2:", pincode2);
//   calculateRoute(`${pincode1}`, `${pincode2}`);
// }








async function getCoordinates(address) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
    const data = await response.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
    } else {
      throw new Error(`No coordinates found for address: ${address}`);
    }
  } catch (error) {
    console.error('Error in getCoordinates:', error.message);
    setDistance(error.message)
    throw new Error(`Error fetching coordinates for address: ${address}`);
  }
}

async function calculateRoute(startAddress, endAddress) {
  try {
    console.log("calculateRoute called with:", startAddress, endAddress);
    const startCoords = [72.84074729999999,19.1872294]
    const endCoords = [72.836334,18.9385352]
    console.log("Start Coordinates:", startCoords);
    console.log("End Coordinates:", endCoords);

    const apiKey = process.env.REACT_APP_ORS_API_KEY; // Replace with your OpenRouteService API key
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

    console.log("Fetching route from URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const route = data.features[0];
    const distanceInMeters = route.properties.summary.distance; // Distance in meters
    const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

    console.log("Distance in Kilometers:", distanceInKilometers);
    setDistance(distanceInKilometers);

    // Assuming map is defined and configured
    map.getLayers().forEach(layer => {
      if (layer instanceof VectorLayer) {
        map.removeLayer(layer);
      }
    });

    const coordinates = route.geometry.coordinates.map(coord => fromLonLat(coord));
    const routeFeature = new Feature({
      geometry: new LineString(coordinates),
    });
    const routeLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature],
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2,
        }),
      }),
    });
    map.addLayer(routeLayer);

  } catch (error) {
    console.error('Error calculating route:', error);
    setDistance(null);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const startAddress = document.getElementById('startAddress').value;
  const endAddress = document.getElementById('endAddress').value;
  console.log("handleSubmit called with startAddress:", startAddress, "endAddress:", endAddress);
  calculateRoute(startAddress, endAddress);
}







// async function getCoordinates(pincode, country) {
//   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${pincode},${country}&format=json`);
//   const data = await response.json();
//   if (data.length > 0) {
//     return [parseFloat(data[0].lon).toFixed(5), parseFloat(data[0].lat).toFixed(5)];
//   } else {
//     throw new Error(`No coordinates found for pincode ${pincode} in ${country}`);
//   }
// }


// const apiKey = '5b3ce3597851110001cf624815ae7f6543c3475f9e918d014d3f2ce2'; // Replace with your OpenRouteService API key


// async function calculateRoute() {
//   const inputPincode = document.getElementById('inputPincode').value;
//   const pincodeArray = ['110001', '110002', '110003']; // Replace with your array of pincodes

//   try {
//     const startCoords = await getCoordinates(inputPincode, 'IN');
//     console.log(startCoords);

//     let nearestPincode = null;
//     let shortestDistance = Infinity;

//     for (const pincode of pincodeArray) {
//       const endCoords = await getCoordinates(pincode, 'IN');

//       const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error.message);
//       }

//       const route = data.features[0];
//       const distanceInMeters = route.properties.summary.distance; // Distance in meters
//       const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

//       if (distanceInKilometers < shortestDistance) {
//         shortestDistance = distanceInKilometers;
//         nearestPincode = pincode;
//       }
//     }

//     setNearestPincode(nearestPincode);
//     setDistance(shortestDistance);

//     // Display nearest route on map
//     const nearestCoords = await getCoordinates(nearestPincode, 'IN');
//     const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(',')}&end=${nearestCoords.join(',')}`;
//     const routeResponse = await fetch(routeUrl);
//     const routeData = await routeResponse.json();

//     const nearestRoute = routeData.features[0];
//     const coordinates = nearestRoute.geometry.coordinates.map(coord => fromLonLat(coord));
//     const routeFeature = new Feature({
//       geometry: new LineString(coordinates),
//     });
//     const routeLayer = new VectorLayer({
//       source: new VectorSource({
//         features: [routeFeature],
//       }),
//       style: new Style({
//         stroke: new Stroke({
//           color: 'blue',
//           width: 2,
//         }),
//       }),
//     });
//     map.getLayers().forEach(layer => {
//       if (layer instanceof VectorLayer) {
//         map.removeLayer(layer);
//       }
//     });
//     map.addLayer(routeLayer);

//   } catch (error) {
//     console.error('Error calculating route:', error);
//     setDistance(null);
//   }
// }

// // Dummy functions to simulate React state setting
// function setNearestPincode(pincode) {
//   document.getElementById('nearestPincode').textContent = `Nearest Pincode: ${pincode}`;
// }

// function setDistance(distance) {
//   document.getElementById('distance').textContent = `Distance: ${distance} km`;
// }











  // function handleSubmit(e) {
  //   e.preventDefault();
  //   calculateRoute(`${pincode1}`,`${pincode2}`);
  // }


  return (
    
      <div>
      <form onSubmit={handleSubmit}>
  <input type="text" id="startAddress" placeholder="Enter Start Address" />
  <input type="text" id="endAddress" placeholder="Enter End Address" />
  <button type="submit">Calculate Route</button>
</form>
      {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      {/* <div id="map" style={{ width: '100%', height: '400px' }}></div> */}
    </div>
  // <>
  // <input type="text" id="inputPincode" placeholder="Enter pincode"/>
  // <button onClick={handleSubmit}>Submit</button>
  // <div id="nearestPincode"></div>
  // <div id="distance"></div>
  // </>
  );
}

export default GeocodeComponent;



