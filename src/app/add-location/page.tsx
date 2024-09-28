"use client";
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addLocation } from '@/redux/locationSlice';
import { useState } from 'react';
import GoogleMaps from '../components/googleMap';
import { nanoid } from 'nanoid';

const AddLocation = () => {
  const [marker, setMarker] = useState({ lat: 39.01012882740788, lng: 34.78952708922943 });
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
    <Box p={5} className="gap-y-2 flex flex-col">
      <FormControl>
        <FormLabel>Konum Adı</FormLabel>
        <Input value={locationName} onChange={(e) => setLocationName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Marker Rengi</FormLabel>
        <Box className='w-1/12 p-2'>
          <Input type="color" value={markerColor} onChange={(e) => setMarkerColor(e.target.value)} />
        </Box>
      </FormControl>
      <GoogleMaps onMapClick={onMapClick} markerColor={markerColor} marker={marker} path={undefined} />
      <Button mt={4} colorScheme="blue" onClick={handleSaveLocation}>
        Konumu Kaydet
      </Button>
    </Box>
  );
};

export default AddLocation;
