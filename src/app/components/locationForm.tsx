"use client"

import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const LocationForm = () => {
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });

  const onMapClick = (e: any) => {
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <GoogleMap
      onClick={onMapClick}
      mapContainerStyle={{ height: '400px', width: '800px' }}
      center={marker}
      zoom={10}
    >
      <Marker position={marker} />
    </GoogleMap>
  );
};

export default LocationForm;
