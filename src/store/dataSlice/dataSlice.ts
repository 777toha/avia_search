import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Seats {
    count: number
    type: {
        caption: string
    }
}

interface Flight {
    carrier: {
        caption: string
        uid: string
    }
    exchange: object
    international: boolean
    isTripartiteContractDiscountApplied: boolean
    legs: [{
        duration: number
        segments: [{
            airline: {
                caption: string
            }
            arrivalAirport: {
                caption: string
                uid: string
            }
            arrivalCity: {
                caption: string
            }
            arrivalDate: string
            departureAirport: {
                caption: string
                uid: string
            }
            departureCity: {
                caption: string
                uid: string
            }
            departureDate: string
            travelDuration: number
        }]
    }]
    price: {
        total: {
            amount: string
        }
    }
    refund: object
    seats: Seats[]
    servicesStatuses: object
    flightToken: string
    hasExtendedFare: boolean
}

type FlightData = {
    result: {
        flights: {
            hasExtendedFare: boolean
            flight: Flight
            flightToken: string
        }
    }
}

interface Flights {
    hasExtendedFare: boolean
    flight: Flight
    flightToken: string
}

interface FlightState {
    data: Flights[]
}

const initialState: FlightState = {
    data: []
};

export const fetchData = createAsyncThunk(
    'flights/fetchData',
    async () => {
        try {
            const data = require('../../utils/flights.json');
            console.log(data)
            return data.result.flights;
        } catch (error) {
            throw error;
        }
    }
);

const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});


export default flightSlice.reducer;