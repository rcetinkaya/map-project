import { createSlice } from '@reduxjs/toolkit';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
}

// LocalStorage'dan verileri yükleyin
const loadLocationsFromLocalStorage = (): Location[] => {
  const storedLocations = localStorage.getItem('locations');
  return storedLocations ? JSON.parse(storedLocations) : [];
};

// Başlangıç durumu
const initialState: Location[] = loadLocationsFromLocalStorage();

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.push(action.payload);
      // Güncellenen durumu localStorage'a kaydedin
      localStorage.setItem('locations', JSON.stringify(state));
    },
    updateLocation: (state, action) => {
      const index = state.findIndex(loc => loc.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        // Güncellenen durumu localStorage'a kaydedin
        localStorage.setItem('locations', JSON.stringify(state));
      }
    },
  },
});

export const { addLocation, updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
