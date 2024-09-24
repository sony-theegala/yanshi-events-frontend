import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

type Event = {
  id: string;
  name: string;
  date: number; // Timestamp
  venue: string;
  contactPhone: string;
  contactEmail: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{event.name}</CardTitle>
        <CardDescription className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(new Date(event.date), "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="flex items-center">
          <span className="mr-2">📍</span>
          {event.venue}
        </p>
        <p className="flex items-center">
          <span className="mr-2">📞</span>
          {event.contactPhone}
        </p>
        <p className="flex items-center">
          <span className="mr-2">✉️</span>
          {event.contactEmail}
        </p>
      </CardContent>
    </Card>
  );
}
