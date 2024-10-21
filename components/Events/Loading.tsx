"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Loading = () => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="flex flex-row w-full items-center justify-between mb-4">
        <Button onClick={router.back}>Back</Button>
        <div className="space-x-2">
          <Skeleton className="h-10 w-20 inline-block" />
          <Skeleton className="h-10 w-32 inline-block" />
        </div>
      </div>
      <Skeleton className="h-9 w-3/4 mb-4" />
      <div className="space-y-4">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="flex items-center">
          <MapPinIcon className="mr-2 h-4 w-4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-6 w-1/4 mr-2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-6 w-1/4 mr-2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="flex items-center">
          <PhoneIcon className="mr-2 h-4 w-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="flex items-center">
          <MailIcon className="mr-2 h-4 w-4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
