import events from "@/data/events.json";

export default function EventsPage() {
  return (
    <main className="page">
      <h1>Campus Events</h1>
      <p>Browse upcoming events on campus</p>

      <div className="grid">
        {events.map((event: any) => (
          <div key={event.id} className="card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>

            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>

            <button className="btn">View Details</button>
          </div>
        ))}
      </div>
    </main>
  );
}
