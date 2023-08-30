import { createSlice } from '@reduxjs/toolkit';

interface IState {
    sortOption: string,
    showStops: boolean,
    minPrice: string,
    maxPrice: string,
    selectedAirlines: string[],
}

const initialState: IState = {
    sortOption: '',
    showStops: false,
    minPrice: '',
    maxPrice: '',
    selectedAirlines: [],
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFilters: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateSortOption: (state, action) => {
            state.sortOption = action.payload;
        },
    },
});

export const { updateFilters, updateSortOption } = filtersSlice.actions;

export default filtersSlice.reducer;
