"use client"
import { GoogleMap, Polyline } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const RouteMap = () => {
  const locations = useSelector((state: RootState) => state.locations);

  const path = locations.map(loc => ({ lat: loc.latitude, lng: loc.longitude }));

  return (
    <GoogleMap mapContainerStyle={{ height: '400px', width: '800px' }} center={path[0]} zoom={10}>
      <Polyline path={path} />
    </GoogleMap>
  );
};

export default RouteMap;
