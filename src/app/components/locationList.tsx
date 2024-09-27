"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const LocationList = () => {
  const locations = useSelector((state: RootState) => state.locations);
console.log("locations: ",locations)
  return (
    <ul>
      {locations.map((loc) => (
        <li key={loc.id}>
          <span>{loc.name}</span>
          <span style={{ backgroundColor: loc.color }}>&#9679;</span>
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
