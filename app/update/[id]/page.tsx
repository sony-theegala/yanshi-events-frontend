"use client";

import AddEventForm from "../../../components/Events/AddEventForm";

export default function UpdateEvent({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="min-h-screen">
      <AddEventForm id={id} />
    </div>
  );
}
