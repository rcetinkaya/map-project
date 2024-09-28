import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
}


const loadLocationsFromLocalStorage = (): Location[] => {
  const storedLocations = typeof window !== "undefined" ?localStorage.getItem('locations'): null;
  return storedLocations ? JSON.parse(storedLocations) : [];
};


const initialState: Location[] = loadLocationsFromLocalStorage();

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state: Location[], action: PayloadAction<Location>) => {
      state.push(action.payload);
      localStorage.setItem('locations', JSON.stringify(state));
    },
    updateLocation: (state: Location[], action: PayloadAction<Location>) => {
      const index = state.findIndex(loc => loc.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };

        localStorage.setItem('locations', JSON.stringify(state));
      }
    },
    deleteLocation: (state: Location[], action: PayloadAction<string>) => {
      const updatedState = state.filter(location => location.id !== action.payload);
      localStorage.setItem('locations', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addLocation, updateLocation,deleteLocation } = locationSlice.actions;
export default locationSlice.reducer;
