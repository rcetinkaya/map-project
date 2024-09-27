"use client"
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

interface MarkerType {
  lat: number;
  lng: number;
  color?: string; // opsiyonel olarak renk ekleyin
}

interface GoogleMapsProps {
  onMapClick: (event: google.maps.MapMouseEvent) => void; // Google Maps olay türü
  markerColor: string;
  marker: MarkerType; // Marker için uygun tür
  path?: MarkerType[]; // Opsiyonel olarak bir yol
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ onMapClick, markerColor, marker, path }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (!isLoaded) return <div>Google Maps yükleniyor...</div>;

  // Marker için ikonu tanımlama
  const markerIcon = {
    path: google.maps.SymbolPath.CIRCLE, // Örnek bir simge yolu
    fillColor: markerColor,
    fillOpacity: 1,
    scale: 10, // Simgenin boyutu
    strokeColor: 'white',
    strokeWeight: 2,
  };

  return (
    <GoogleMap
      onClick={onMapClick}
      mapContainerStyle={{ height: '400px', width: '100%' }}
      center={marker}
      zoom={10}
    >
      {/* Marker'ı ekleme */}
      <Marker position={marker} icon={markerIcon} />
      
      {/* Path varsa Marker ekleme */}
      {path?.map((position, index) => (
        <Marker
          key={index}
          position={position}
          icon={{
            ...markerIcon,
            fillColor: position.color ?? markerColor, // Renk kullanımı
          }} // Her marker için benzersiz renk kullanma
        />
      ))}
      
      {/* Polyline kullanımı */}
      {path && <Polyline path={path} />} {/* path varsa Polyline ekleyin */}
    </GoogleMap>
  );
}

export default GoogleMaps;
