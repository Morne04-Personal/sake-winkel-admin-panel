
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventTable from "@/components/events/EventTable";
import EventForm from "@/components/events/EventForm";
import { Event } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import TableLoader from "@/components/common/TableLoader";

const EventsPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // Fetch events from Supabase production schema
  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      try {
        // Use the from method with a string literal for the table name
        const { data, error } = await supabase
          .from('events')
          .select("*")
          .is('deleted_at', null);
        
        if (error) throw error;
        
        // Map database events to our Event type
        const typedEvents: Event[] = data.map(event => ({
          id: Number(event.id),
          name: event.name || null,
          short_description: event.short_description || null,
          start_date: event.start_date || null,
          end_date: event.end_date || null,
          city: event.city || null,
          address: event.address || null,
          venue_name: event.venue_name || null,
          original_price: event.original_price || null,
          sale_price: event.sale_price || null,
          ticket_url: event.ticket_url || null,
          thumbnail_url: event.thumbnail_url || null,
          logo_url: event.logo_url || null,
          is_featured: event.is_featured || false,
          created_at: event.created_at
        }));
        
        return typedEvents;
      } catch (error: any) {
        toast({
          title: "Error fetching events",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
    }
  });

  const handleAddEvent = async (event: Event) => {
    try {
      const { error } = await supabase
        .from('events')
        .insert(event);
        
      if (error) throw error;
      
      toast({
        title: "Event added",
        description: "Event has been added successfully",
      });
      
      setIsAddFormOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error adding event",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditEvent = async (updatedEvent: Event) => {
    try {
      const { error } = await supabase
        .from('events')
        .update(updatedEvent)
        .eq("id", updatedEvent.id);
      
      if (error) throw error;
      
      toast({
        title: "Event updated",
        description: "Event has been updated successfully",
      });
      
      setIsEditFormOpen(false);
      setCurrentEvent(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error updating event",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Event deleted",
        description: "Event has been deleted successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error deleting event",
        description: error.message,
        variant: "destructive",
      });
    }
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
          <TableLoader colSpan={7} />
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
