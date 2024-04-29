// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import EventList from './components/EventList';
import BookingForm from './components/BookingForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/events" component={EventList} />
        <Route path="/book/:eventId" component={BookingForm} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
