'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '@/redux/locationSlice';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import GoogleMaps from '@/app/components/googleMap';

const EditLocation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const location = useSelector((state: RootState) =>
    state.locations.find((loc) => loc.id === id)
  );
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState('');
  const [markerColor, setMarkerColor] = useState('#ff0000');
  const [loading, setLoading] = useState(false);

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

  const handleUpdateLocation = async () => {
    if (typeof id === 'string') {
      setLoading(true); 
      dispatch(
        updateLocation({
          id,
          name: locationName,
          latitude: marker.lat,
          longitude: marker.lng,
          color: markerColor,
        })
      );

      
      setTimeout(() => {
        setLoading(false); 
        toast({
          title: "Başarıyla Güncellendi.",
          description: "Konum bilgileri güncellendi.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position:"top"
        });
      }, 500);
    }
  };

  return (
    <Box p={5} className="gap-y-2 flex flex-col">
      <FormControl>
        <FormLabel>Konum Adı</FormLabel>
        <Input value={locationName} onChange={(e) => setLocationName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Marker Rengi</FormLabel>
        <Box className='w-[6rem] p-2'>
          <Input type="color" value={markerColor} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setMarkerColor(e.target.value)} />
        </Box>
      </FormControl>
      <GoogleMaps onMapClick={onMapClick} markerColor={markerColor} marker={marker} path={undefined} />
      
      <Button mt={4} colorScheme="blue" onClick={handleUpdateLocation} isLoading={loading}>
        Konumu Güncelle
      </Button>
    </Box>
  );
};

export default EditLocation;
