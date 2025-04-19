
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventTable from "@/components/events/EventTable";
import EventForm from "@/components/events/EventForm";
import { mockEvents } from "@/data/mockData";
import { Event } from "@/types";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleAddEvent = (event: Event) => {
    const newEvent = {
      ...event,
      id: Math.max(0, ...events.map((e) => e.id)) + 1,
      created_at: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
    setIsAddFormOpen(false);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      )
    );
    setIsEditFormOpen(false);
    setCurrentEvent(null);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const openEditForm = (event: Event) => {
    setCurrentEvent(event);
    setIsEditFormOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-h1 font-bold text-sakewinkel-navy">Events</h1>
          <Button onClick={() => setIsAddFormOpen(true)} className="bg-sakewinkel-navy">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <EventTable
          events={events}
          onEdit={openEditForm}
          onDelete={handleDeleteEvent}
        />

        {isAddFormOpen && (
          <EventForm
            isOpen={isAddFormOpen}
            onClose={() => setIsAddFormOpen(false)}
            onSave={handleAddEvent}
            isAdd
          />
        )}

        {isEditFormOpen && currentEvent && (
          <EventForm
            isOpen={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
            onSave={handleEditEvent}
            initialData={currentEvent}
            isAdd={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
