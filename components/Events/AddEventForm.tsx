"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CategoryDropDown from "../reusables/CategoryDropDown";
import SubcategoryDropDown from "../reusables/SubcategoryDropDown";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Event, useEventStore } from "@/lib/event-store";
import Loading from "./Loading";
import NotFound from "./NotFound";

type EventFormData = {
  name: string;
  date: Date | undefined;
  venue: string;
  categoryId: string;
  subcategoryId: string;
  contactPhone: string;
  contactEmail: string;
};

export default function AddEventForm({ id }: { id?: string }) {
  const router = useRouter();
  const { createEvent, getEventById, updateEvent } = useEventStore();
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const { register, handleSubmit, reset, control, watch } =
    useForm<EventFormData>({
      defaultValues: {
        name: "",
        date: undefined,
        venue: "",
        categoryId: "",
        subcategoryId: "",
        contactPhone: "",
        contactEmail: "",
      },
    });

  const onSubmit = async (data: EventFormData) => {
    if (!data?.date) {
      toast.error("Please select a date for the event.");
      return;
    }

    try {
      const paylaod = {
        name: data.name,
        date: data.date.getTime(),
        venue: data.venue,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
      };
      if (id) {
        updateEvent(id, paylaod);
      } else {
        await createEvent(paylaod);
      }
      reset();

      toast.success("Event added successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event.");
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      if (id) {
        setIsLoading(true);
        const eventData = await getEventById(id);
        if (eventData) {
          setEvent(eventData);
          reset({
            name: eventData.name,
            date: new Date(eventData.date),
            venue: eventData.venue,
            categoryId: eventData.categoryId,
            subcategoryId: eventData.subcategoryId,
            contactPhone: eventData.contactPhone,
            contactEmail: eventData.contactEmail,
          });
        } else {
          toast.error("Event not found.");
        }

        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [id, reset, getEventById]);

  if (isLoading && id) {
    return <Loading />;
  }

  if (!event && id) {
    return <NotFound />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <CardHeader>
          <CardTitle>{ event && id ? "Update Event": "Add New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                {...register("name", { required: true })}
                placeholder="Enter event name"
              />
            </div>

            <div className="space-y-3 flex flex-col">
              <Label>Event Date</Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
                rules={{ required: true }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-venue">Venue</Label>
              <Input
                id="event-venue"
                {...register("venue", { required: true })}
                placeholder="Enter venue"
              />
            </div>

            <CategoryDropDown
              manage={true}
              control={control}
              name="categoryId"
              rules={{ required: "Category is required" }}
            />

            <SubcategoryDropDown
              categoryId={watch("categoryId")}
              manage={true}
              control={control}
              name="subcategoryId"
              rules={{ required: "Category is required" }}
            />

            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input
                id="contact-phone"
                type="tel"
                {...register("contactPhone", { required: true })}
                placeholder="Enter contact phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                {...register("contactEmail", { required: true })}
                placeholder="Enter contact email"
              />
            </div>

            <Button type="submit" className="w-full">
              Add Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
