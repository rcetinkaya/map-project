'use client';

import React, { useEffect, useState } from 'react';
import { Box, InfoWindow } from '@chakra-ui/react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const RouteMap = () => {
  const locations = useSelector((state: RootState) => state.locations);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Kullanıcının mevcut konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const path = locations.map((loc: { latitude: any; longitude: any; }) => ({
    lat: loc.latitude,
    lng: loc.longitude,
  }));

  // Euclidean mesafesi en yakın noktayı bulmak için
  const findNearestLocation = () => {
    if (!userLocation || locations.length === 0) return path;
    return path.reduce((nearest: any, loc: { lat: number; lng: number; }) => {
      const distance = Math.sqrt(
        Math.pow(loc.lat - userLocation.lat, 2) + Math.pow(loc.lng - userLocation.lng, 2)
      );

      if (!nearest || distance < nearest.distance) {
        return { loc, distance };
      }
      return nearest;
    }, null)?.loc;
  };

  const nearestLocation = findNearestLocation();

  // Okun yönünü hesaplama fonksiyonu
  const calculateArrowRotation = () => {
    if (!userLocation || !nearestLocation) return 0;

    const deltaLat = nearestLocation.lat - userLocation.lat;
    const deltaLng = nearestLocation.lng - userLocation.lng;
    const angle = Math.atan2(deltaLat, deltaLng) * (180 / Math.PI);

    return angle < 0 ? angle + 360 : angle;;
  };

  const arrowRotation = calculateArrowRotation();



  return (
    <Box p={5}>
      {locations.length === 0 ? (
        <Box className='w-full h-[80vh] flex items-center justify-center'>
          <div className='font-bold text-xl text-red-500'>
            Henüz kayıtlı bir rota bulunmamaktadır.
          </div>
        </Box>
      ) : (
      <GoogleMap
        mapContainerStyle={{ height: '500px', width: '100%' }}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={10}
      >
        {locations.map((location: { latitude: number; longitude: number; color: string; name: string }, index: number) => (
          <Marker
            key={index}
            position={{ lat: location.latitude, lng: location.longitude }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: location.color,
              fillOpacity: 1,
              scale: 10,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.name}</h2>
              <p>Konum: {selectedLocation.latitude}, {selectedLocation.longitude}</p>
            </div>
          </InfoWindow>
        )}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              fillColor: '#FF0000',
              fillOpacity: 1,
              scale: 3,
              strokeColor: 'white',
              strokeWeight: 2,
              rotation: arrowRotation
            }}
          />
        )}

        {nearestLocation && <Polyline path={[userLocation, nearestLocation]} />}
        <Polyline path={path} />
      </GoogleMap>)}
    </Box>
  );
};

export default RouteMap;
