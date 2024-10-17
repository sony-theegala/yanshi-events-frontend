import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-6 max-w-md px-4">
        <Calendar className="w-24 h-24 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold">Event Not Found</h1>
        <p className="text-xl text-muted-foreground">
          {`We're sorry, but the event you're looking for doesn't seem to exist
            or may have been deleted.`}
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
