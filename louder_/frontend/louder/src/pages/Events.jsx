import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events?city=Sydney").then(res => setEvents(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎉 Events in Sydney</h2>

      <div className="row g-4">
        {events.length === 0 ? (
          <p className="text-center text-muted">No events available</p>
        ) : (
          events.map(event => (
            <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
