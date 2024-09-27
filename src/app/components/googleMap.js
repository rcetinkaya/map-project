// @ts-nocheck

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

function GoogleMaps({ onMapClick, markerColor, marker }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Buraya API anahtarınızı ekleyin
  });

  if (!isLoaded) return <div>Google Maps yükleniyor...</div>;

  return (
    <GoogleMap
      onClick={onMapClick}
      mapContainerStyle={{ height: '400px', width: '100%' }}
      center={marker}
      zoom={10}
    >
      <Marker position={marker} icon={{ fillColor: markerColor }} />
    </GoogleMap>
  );
}

export default GoogleMaps;