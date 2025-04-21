import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventTable from "@/components/events/EventTable";
import EventForm from "@/components/events/EventForm";
import { Event } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import TableLoader from "@/components/common/TableLoader";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "@/services";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const EventsPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const queryClient = useQueryClient();

  // Fetch events from Supabase
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  const handleAddEvent = async (event: Event) => {
    const success = await addEvent(event);
    
    if (success) {
      toast({
        title: "Event added",
        description: "Event has been added successfully",
      });
      
      setIsAddFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  };

  const handleEditEvent = async (updatedEvent: Event) => {
    const success = await updateEvent(updatedEvent);
    
    if (success) {
      toast({
        title: "Event updated",
        description: "Event has been updated successfully",
      });
      
      setIsEditFormOpen(false);
      setCurrentEvent(null);
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const success = await deleteEvent(id);
    
    if (success) {
      toast({
        title: "Event deleted",
        description: "Event has been deleted successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['events'] });
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Start Date</TableHead>
                  <TableHead className="min-w-[120px]">End Date</TableHead>
                  <TableHead className="min-w-[150px]">City</TableHead>
                  <TableHead className="min-w-[150px]">Price</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableLoader colSpan={7} />
              </TableBody>
            </Table>
          </div>
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