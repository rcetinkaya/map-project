'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '@/redux/locationSlice';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import GoogleMaps from '@/app/components/googleMap';

const EditLocation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) =>
    state.locations.find((loc) => loc.id === id)
  );
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState('');
  const [markerColor, setMarkerColor] = useState('#ff0000');

  useEffect(() => {
    if (location) {
      setMarker({ lat: location.latitude, lng: location.longitude });
      setLocationName(location.name);
      setMarkerColor(location.color);
    }
  }, [location]);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const handleUpdateLocation = () => {
    if (typeof id === 'string') {
      dispatch(
        updateLocation({
          id,
          name: locationName,
          latitude: marker.lat,
          longitude: marker.lng,
          color: markerColor,
        })
      );
    }
  };

  return (
    <Box p={5}>
      <FormControl>
        <FormLabel>Konum Adı</FormLabel>
        <Input value={locationName} onChange={(e) => setLocationName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Marker Rengi</FormLabel>
        <Input type="color" value={markerColor} onChange={(e) => setMarkerColor(e.target.value)} />
      </FormControl>
      <GoogleMaps onMapClick={onMapClick} markerColor={markerColor} marker={marker} path={undefined} />
      {/*  <GoogleMap
        onClick={onMapClick}
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={marker}
        zoom={10}
      >
        <Marker position={marker} icon={{ fillColor: markerColor }} />
      </GoogleMap> */}
      <Button mt={4} colorScheme="blue" onClick={handleUpdateLocation}>
        Konumu Güncelle
      </Button>
    </Box>
  );
};

export default EditLocation;
