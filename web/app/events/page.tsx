import events from "@/data/events.json";

export default function EventsPage() {
  return (
    <main className="events-page">
     <h1 className="page-title">Campus Events</h1>
<div className="page-line"></div>

<h2 className="section-title">Upcoming Events</h2>
<p className="section-subtitle">Browse and register for campus events</p>
        Browse and register for campus events
      </p>

      <div className="events-grid">
        {events.map((event: any) => (
          <div className="event-card" key={event.id}>
            <div className="event-icon">📅</div>

            <h3>{event.title}</h3>

            <p>🗓️ Date: {event.date}</p>
            <p>🕘 Time: {event.time}</p>
            <p>📍 Location: {event.location}</p>

            <p className="event-description">
              {event.description}
            </p>

            <button className="register-btn">
              Register Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
