import './Flight.css'
import { useAppDispatch, useAppSelector } from '../../store/typeHook';
import { useEffect, useState } from 'react';
import { fetchData } from '../../store/dataSlice/dataSlice';
import { selectFilteredFlights } from '../filtersSelector';

const Flights = () => {
    const dispatch = useAppDispatch();
    const selectFlights = useAppSelector(selectFilteredFlights)
    const [displayedTickets, setDisplayedTickets] = useState(2);

    useEffect(() => {
        dispatch(fetchData())
    }, []);

    return (
        <div className='flight__page'>
            <div className='flights'>{selectFlights.slice(0, displayedTickets).map((item, index) => (
                <div className='flight' key={index}>
                    <div className='flight__header'>
                        <p className='flight__header-right'>{item.flight.carrier.caption}</p>
                        <div className='flight__header-left'>
                            <p>{`${item.flight.price.total.amount}`} &#8381;</p>{
                                item.flight.seats.map((seat) => (
                                    <p className='flight__header-span'>{`${seat.count} ${seat.type.caption}`}</p>
                                ))
                            }
                        </div>
                    </div>{
                        item.flight.legs.map((leg) => (
                            <>{
                                leg.segments.map((ticket) => (
                                    <div className='flight__ticket'>
                                        <div className='flight__direction'>
                                            <p className='flight__arrival'>{`${ticket.departureCity?.caption}, ${ticket.departureAirport.caption.includes(',')
                                                ? ticket.departureAirport.caption.split(',')[1].trim()
                                                : ticket.departureAirport.caption
                                                } (${ticket.departureAirport.uid})`}</p>
                                            <p className='flight__arrival'>&nbsp;&rarr;&nbsp;</p>
                                            <p className='flight__arrival'>{`${ticket.arrivalCity?.caption}, ${ticket.arrivalAirport.caption.includes(',')
                                                ? ticket.arrivalAirport.caption.split(',')[1].trim()
                                                : ticket.arrivalAirport.caption
                                                } (${ticket.arrivalAirport.uid})`}</p>
                                        </div>
                                        <div className='flight__container'>
                                            <div className='flight__data'>
                                                <p>{new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(new Date(ticket.departureDate))}</p>
                                                <p>{new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', weekday: 'short' }).format(new Date(ticket.departureDate))}</p>
                                            </div>
                                            <p className='flight__time'>{`${Math.floor(ticket.travelDuration / 60)} ч ${ticket.travelDuration % 60} мин`}</p>
                                            <div className='flight__data'>
                                                <p>{new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(new Date(ticket.arrivalDate))}</p>
                                                <p>{new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', weekday: 'short' }).format(new Date(ticket.arrivalDate))}</p>
                                            </div>
                                        </div>
                                        <div className='flight__carrier'>Рейс выполняет: {ticket.airline.caption}</div>
                                    </div>
                                ))
                            }
                                <div className="flight__stops">
                                    <span>{leg.segments.length > 1 ? '1 пересадка' : 'Прямой рейс'}</span>
                                </div>
                                < div className='flight__line' ></div>
                            </>
                        ))
                    }
                    <button className='flight__button'>ВЫБРАТЬ</button>
                </div>
            ))
            }
            </div >
            <button className='flight__page-button' onClick={() => setDisplayedTickets(prevCount => prevCount + 2)}>Показать еще</button>
        </div>
    )
}

export default Flights;