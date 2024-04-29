import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ eventId }) => {
  const [tickets, setTickets] = useState(1);

  const handleBooking = () => {
    axios.post('/api/bookings', { eventId, tickets })
      .then(response => {
        console.log('Booking successful:', response.data);
      })
      .catch(error => {
        console.error('Error booking tickets:', error);
      });
  };

  return (
    <div>
      <h2>Book Tickets</h2>
      <label htmlFor="tickets">Number of Tickets:</label>
      <input
        type="number"
        id="tickets"
        value={tickets}
        onChange={e => setTickets(e.target.value)}
      />
      <button onClick={handleBooking}>Book Tickets</button>
    </div>
  );
};

export default BookingForm;
