
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventTable from "@/components/events/EventTable";
import EventForm from "@/components/events/EventForm";
import { Event } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const EventsPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // Fetch events from Supabase
  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  const handleAddEvent = async (event: Event) => {
    await supabase.from("events").insert(event);
    setIsAddFormOpen(false);
    refetch();
  };

  const handleEditEvent = async (updatedEvent: Event) => {
    await supabase.from("events").update(updatedEvent).eq("id", updatedEvent.id);
    setIsEditFormOpen(false);
    setCurrentEvent(null);
    refetch();
  };

  const handleDeleteEvent = async (id: number) => {
    await supabase.from("events").delete().eq("id", id);
    refetch();
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

        {isLoading ? (
          <div className="flex justify-center items-center h-40">Loading events...</div>
        ) : (
          <EventTable
            events={events}
            onEdit={openEditForm}
            onDelete={handleDeleteEvent}
          />
        )}

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
