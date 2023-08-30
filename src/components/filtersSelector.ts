import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const selectFilters = (state: RootState) => state.filtred;
const selectFlights = (state: RootState) => state.data.data;

export const selectFilteredFlights = createSelector(
    [selectFlights, selectFilters],
    (flights, filters) => {
        let filteredFlights = [...flights]

        switch (filters.sortOption) {
            case 'ascPrice':
                filteredFlights.sort((a, b) => {
                    const priceA = Number(a.flight.price.total.amount);
                    const priceB = Number(b.flight.price.total.amount);

                    return priceA - priceB;
                });
                break;
            case 'descPrice':
                filteredFlights.sort((a, b) => {
                    const priceA = Number(a.flight.price.total.amount);
                    const priceB = Number(b.flight.price.total.amount);

                    return priceB - priceA;
                });
                break;
            case 'travelTime':
                filteredFlights.sort((a, b) => {
                    const travelDurationA = a.flight.legs.reduce((acc, leg) => acc + leg.duration, 0);
                    const travelDurationB = b.flight.legs.reduce((acc, leg) => acc + leg.duration, 0);
                    return travelDurationA - travelDurationB;
                });
                break;
            default:
                break;
        }

        if (filters.showStops) {
            filteredFlights = filteredFlights.filter(flight => {
                return flight.flight.legs.some(leg => leg.segments.length > 1);
            });
        } else {
            filteredFlights = filteredFlights.filter(flight => {
                return flight.flight.legs.every(leg => leg.segments.length === 1);
            });
        }

        if (filters.minPrice !== '' && filters.maxPrice !== '') {
            filteredFlights = filteredFlights.filter(flight => {
                const flightTotalPrice = Number(flight.flight.price.total.amount);
                return flightTotalPrice >= Number(filters.minPrice) && flightTotalPrice <= Number(filters.maxPrice);
            });
        }

        if (filters.selectedAirlines.length > 0) {
            filteredFlights = filteredFlights.filter(flight => {
                return filters.selectedAirlines.includes(flight.flight.carrier.caption);
            });
        }

        return filteredFlights;
    }
);
