import {createBooking, updateBooking, fetchBooking} from '../action/booking-action.js';

describe('Booking Actions', () => {
  test('createBooking returns a BOOKING_CREATE action', () => {
    let action = createBooking({booking: 'test booking'});
    expect(action.type).toEqual('BOOKING_CREATE');
    expect(action.payload.booking).toBe('test booking');
  });

  test('updateBooking returns a BOOKING_UPDATE action', () => {
    let booking = {booking: 'test booking'};
    let action = updateBooking(booking);
    expect(action).toEqual({
      type: 'BOOKING_UPDATE',
      payload: booking
    });
  });

  test('fetchBooking returns a BOOKING_FETCH action', () => {
    let bookings = {bookings: 'test bookings'};
    let action = fetchBooking(bookings);
    expect(action).toEqual({
      type: 'BOOKING_FETCH',
      payload: bookings
    });
  });
});
