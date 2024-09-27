'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import GoogleMaps from '../components/googleMap';

const RouteMap = () => {
  const locations = useSelector((state: RootState) => state.locations);

  const path = locations.map((loc: { latitude: any; longitude: any; }) => ({
    lat: loc.latitude,
    lng: loc.longitude,
  }));

  return (
    <Box p={5}>
     {/*  <GoogleMaps onMapClick={undefined} markerColor={undefined} marker={undefined} path={path} /> */}
      {/* <GoogleMap
        mapContainerStyle={{ height: '500px', width: '100%' }}
        center={path[0] || { lat: 0, lng: 0 }}
        zoom={10}
      >
        {path.map((position: any, index: React.Key | null | undefined) => (
          <Marker
            key={index}
            position={position}
            icon={{ fillColor: locations[index].color }}
          />
        ))}
        <Polyline path={path} />
      </GoogleMap> */}
    </Box>
  );
};

export default RouteMap;
