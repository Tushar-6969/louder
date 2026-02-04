import { useState } from "react";
import TicketModal from "./TicketModal";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="event-card">
        <img src={event.image} alt={event.title} />

        <h3>{event.title}</h3>
        <p>{event.dateTime}</p>
        <p>{event.venue}</p>

        <p className="desc">{event.description}</p>
        <span className="source">{event.source}</span>

        <button onClick={() => setOpen(true)}>
          🎟 GET TICKETS
        </button>
      </div>

      {open && (
        <TicketModal
          event={event}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default EventCard;
