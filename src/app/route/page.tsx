'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import GoogleMaps from '../components/googleMap';

const RouteMap = () => {
  const locations = useSelector((state: RootState) => state.locations);
console.log("locations: ",locations)
  const path = locations.map((loc: { latitude: any; longitude: any; }) => ({
    lat: loc.latitude,
    lng: loc.longitude,
  }));

  return (
    <Box p={5}>
      <GoogleMap
        mapContainerStyle={{ height: '500px', width: '100%' }}
        center={path[0] || { lat: 0, lng: 0 }}
        zoom={10}
      >
        {locations.map((location: { latitude: number; longitude: number; color: string; }, index: number) => (
          <Marker
            key={index}
            position={{ lat: location.latitude, lng: location.longitude }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: location.color, // Konum verisinden gelen renk
              fillOpacity: 1,
              scale: 10,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
          />
        ))}
        <Polyline path={path} />
      </GoogleMap>
    </Box>
  );
};

export default RouteMap;
