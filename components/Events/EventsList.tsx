import React from "react";
import EventCard from "./EventCard";

type Event = {
  id: string;
  name: string;
  date: number; // Timestamp
  venue: string;
  contactPhone: string;
  contactEmail: string;
};

export default function EventsList({ events }: { events: Event[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
