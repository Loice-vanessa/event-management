import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleDeleteEvent = (eventId) => {
    axios.delete(`/api/events/${eventId}`)
      .then(response => {
        console.log('Event deleted:', response.data);
        setEvents(events.filter(event => event.id !== eventId));
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

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
      <h2>Event Management</h2>
      <h3>Events</h3>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <p>{event.title}</p>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
          </li>
        ))}
      </ul>
      <h3>Bookings</h3>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            <p>Event: {booking.event.title}</p>
            <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
