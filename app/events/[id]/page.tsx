"use client";

import { useEventStore } from "@/lib/event-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const EventPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { getEventById, deleteEvent } = useEventStore();
  const event = getEventById(id as string);
  const router = useRouter();

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(event.id);
      toast.success("Event deleted successfully!");
      router.back(); // Navigate back after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row w-full items-center justify-between mb-4">
        <Button onClick={router.back}>Back</Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Event</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {`This action cannot be undone. This will permanently delete the event "${event.name}" from your list.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEvent}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="mt-2 text-lg">
        <CalendarIcon className="mr-2 inline h-4 w-4" />
        Date: {formatDate(event.date)}
      </p>
      <p className="mt-2 text-lg">
        <MapPinIcon className="mr-2 inline h-4 w-4" />
        Venue: {event.venue}
      </p>
      <p className="mt-2 text-lg">
        <strong>Category:</strong> {event.category.name}
      </p>
      <p className="mt-2 text-lg">
        <strong>Subcategory:</strong> {event.subcategory.name}
      </p>
      <p className="mt-2 text-lg">
        <PhoneIcon className="mr-2 inline h-4 w-4" />
        Contact Phone: {event.contactPhone}
      </p>
      <p className="mt-2 text-lg">
        <MailIcon className="mr-2 inline h-4 w-4" />
        Contact Email: {event.contactEmail}
      </p>
    </div>
  );
};

export default EventPage;