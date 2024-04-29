import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleCancelBooking = (bookingId) => {
    axios.delete(`/api/bookings/${bookingId}`)
      .then(response => {
        console.log('Booking canceled:', response.data);
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      })
      .catch(error => {
        console.error('Error canceling booking:', error);
      });
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            <p>Event: {booking.event.title}</p>
            <p>Date: {booking.event.date}</p>
            <p>Location: {booking.event.location}</p>
            <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
