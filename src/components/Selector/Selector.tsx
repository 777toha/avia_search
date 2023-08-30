import { useAppDispatch, useAppSelector } from '../../store/typeHook';
import { updateFilters, updateSortOption } from '../../store/filtersSlice/filtersSlice';
import './Selector.css';

const Selector = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filtred);
    const flights = useAppSelector(state => state.data.data)
    const uniqueCarriers: string[] = [];
    flights.forEach(ticket => {
        if (!uniqueCarriers.includes(ticket.flight.carrier.caption)) {
            uniqueCarriers.push(ticket.flight.carrier.caption);
        }
    });

    const handleSortOptionChange = (option: string) => {
        dispatch(updateSortOption(option));
    };

    const handleStopsChange = () => {
        dispatch(updateFilters({ showStops: !filters.showStops }));
    };

    const handleMinPriceChange = (e: any) => {
        dispatch(updateFilters({ minPrice: e.target.value }));
    };

    const handleMaxPriceChange = (e: any) => {
        dispatch(updateFilters({ maxPrice: e.target.value }));
    };

    const handleAirlineCheckboxChange = (carrier: any) => {
        const selectedAirlines = filters.selectedAirlines.includes(carrier)
            ? filters.selectedAirlines.filter(a => a !== carrier)
            : [...filters.selectedAirlines, carrier];
        dispatch(updateFilters({ selectedAirlines }));
    };

    return (
        <div className="selector">
            <div>
                <h3>Сортировать</h3>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="ascPrice"
                            checked={filters.sortOption === 'ascPrice'}
                            onChange={() => handleSortOptionChange('ascPrice')}
                        />
                        - По возрастанию цены
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="descPrice"
                            checked={filters.sortOption === 'descPrice'}
                            onChange={() => handleSortOptionChange('descPrice')}
                        />
                        - По убыванию цены
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="travelTime"
                            checked={filters.sortOption === 'travelTime'}
                            onChange={() => handleSortOptionChange('travelTime')}
                        />
                        - По времени пути
                    </label>
                </div>
            </div>
            <div>
                <h3>Фильтровать</h3>
                <div>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="stops"
                            value="withStops"
                            checked={filters.showStops}
                            onChange={handleStopsChange}
                        />
                        - 1 пересадка
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="stops"
                            value="direct"
                            checked={!filters.showStops}
                            onChange={handleStopsChange}
                        />
                        - Без пересадок
                    </label>
                </div>
            </div>
            <div>
                <h3>Цена</h3>
                <div>
                    <input
                        type="number"
                        placeholder="От"
                        value={filters.minPrice}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        type="number"
                        placeholder="До"
                        value={filters.maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </div>
            </div>
            <div>
                <h3>Авиакомпании</h3>
                <div className='selector__carrier'>
                    {uniqueCarriers.map((carrier, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={carrier}
                                onChange={() => handleAirlineCheckboxChange(carrier)}
                            />
                            {carrier}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Selector