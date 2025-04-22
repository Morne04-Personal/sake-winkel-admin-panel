
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types";
import { toast } from "@/components/ui/use-toast";

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select("*")
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Event[] || [];
  } catch (error: any) {
    toast({
      title: "Error fetching events",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const addEvent = async (event: Omit<Event, "id" | "created_at">): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('events')
      .insert(event);
      
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
    const { id, name, short_description, start_date, end_date, city, address, venue_name, 
            original_price, sale_price, ticket_url, thumbnail_url, logo_url, is_featured } = event;
    
    const { error } = await supabase
      .from('events')
      .update({
        name,
        short_description,
        start_date,
        end_date,
        city,
        address,
        venue_name,
        original_price,
        sale_price,
        ticket_url,
        thumbnail_url,
        logo_url,
        is_featured
      })
      .eq("id", id);
    
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
    const { error } = await supabase
      .from('events')
      .update({ 
        deleted_at: new Date().toISOString()
      })
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
