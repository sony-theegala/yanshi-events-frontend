"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEventStore } from "@/lib/event-store";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Component() {
  const { events } = useEventStore();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Link href="/add" passHref>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event?.id} href={"/events/" + event?.id} passHref>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>{event?.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.venue}</span>
                  </div>
                  <div>
                    <span className="font-semibold">
                      {event?.category?.name}
                    </span>
                    {" - "}
                    <span>{event?.subcategory?.name}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{event?.contactPhone}</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{event?.contactEmail}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
