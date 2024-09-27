"use client";
import dynamic from 'next/dynamic';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addLocation } from '@/redux/locationSlice';
import { useState } from 'react';
import GoogleMaps from '../components/googleMap';
import { nanoid } from 'nanoid'; // nanoid'ı burada içe aktarın

const AddLocation = () => {
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState('');
  const [markerColor, setMarkerColor] = useState('#ff0000');
  const dispatch = useDispatch();

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const handleSaveLocation = () => {
    dispatch(
      addLocation({
        id: nanoid(), 
        name: locationName,
        latitude: marker.lat,
        longitude: marker.lng,
        color: markerColor,
      })
    );
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
      <GoogleMaps onMapClick={onMapClick} markerColor={markerColor} marker={marker} />
      <Button mt={4} colorScheme="blue" onClick={handleSaveLocation}>
        Konumu Kaydet
      </Button>
    </Box>
  );
};

export default AddLocation;
