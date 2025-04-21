import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types";
import { DbEvent } from "@/types/dbTypes";
import { toast } from "@/components/ui/use-toast";

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    // No need to specify schema since client is configured for production schema
    const { data, error } = await supabase
      .from('events')
      .select("*")
      .is('deleted_at', null) // Only select non-deleted events
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Map database events to our Event type
    const typedEvents: Event[] = data.map((event: DbEvent) => ({
      id: Number(event.id),
      name: event.name,
      short_description: event.short_description,
      start_date: event.start_date,
      end_date: event.end_date,
      city: event.city,
      address: event.address,
      venue_name: event.venue_name,
      original_price: event.original_price,
      sale_price: event.sale_price,
      ticket_url: event.ticket_url,
      thumbnail_url: event.thumbnail_url,
      logo_url: event.logo_url,
      is_featured: event.is_featured,
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
};

export const addEvent = async (event: Event): Promise<boolean> => {
  try {
    // Remove any fields that are not in the database schema
    const { id, created_at, ...dbEvent } = event;

    const { error } = await supabase
      .from('events')
      .insert(dbEvent);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error adding event",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const updateEvent = async (event: Event): Promise<boolean> => {
  try {
    // Remove any fields that should not be updated
    const { created_at, ...dbEvent } = event;

    const { error } = await supabase
      .from('events')
      .update(dbEvent)
      .eq("id", event.id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error updating event",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  try {
    // Using soft delete by setting deleted_at timestamp
    const { error } = await supabase
      .from('events')
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting event",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};