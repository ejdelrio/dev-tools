import superagent from 'superagent';

export const createBooking = booking => ({
  type: 'BOOKING_CREATE',
  payload: booking
})

export const updateBooking = booking => ({
  type: 'BOOKING_UPDATE',
  payload: booking
})

export const fetchBooking = bookings => ({
  type: 'BOOKING_FETCH',
  payload: bookings
})

export const requestBooking = booking => (dispatch, getState) => {
  let {profile, socket} = getState();
  booking.author = profile.userName;

  socket.emit('requestBooking', booking)
  socket.on(`newBooking-${profile.userName}`, booking => {
    console.log('__BOOKING_CREATE_SOCKET__')
    dispatch(createBooking(booking));
  });
};

export const confirmBooking = booking => (dispatch, getState) => {
  let {profile, socket} = getState();
  profile.type === 'band' ?
  booking.bandConfirm = true:
  booking.venueConfirm = true;

  booking.author = profile.userName;

  socket.emit('confirmBooking', booking)
};

export const requestUpdateBooking = booking => (dispatch, getState) => {
  let {profile, socket} = getState();
  booking.author = profile.userName;

  socket.emit('updateBooking', booking);
  socket.on(`updateBooking-${profile.userName}`, booking => {
    dispatch(updateBooking(booking));
  });
};

export const requestFetchBookings = () => (dispatch, getState) => {
  let {token} = getState();

  return superagent.get(`${__API_URL__}/api/booking`)
  .set('Authorization', `Bearer ${token}`)
  .end((error, res) => {
    if(error) return console.error(error);
    dispatch(fetchBooking(res.body));
    return res;
  })
}
