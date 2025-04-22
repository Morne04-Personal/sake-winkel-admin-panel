
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types";
import { toast } from "@/components/ui/use-toast";

// Since there's no events table in the database, we'll create a mock service
// that returns dummy data. In a real app, you would create the table first.

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    // Mock data for events since the events table doesn't exist
    const mockEvents: Event[] = [
      {
        id: 1,
        name: "Wine Tasting Workshop",
        short_description: "Learn about different wine varieties and tasting techniques",
        start_date: "2025-05-15",
        end_date: "2025-05-15",
        city: "Cape Town",
        address: "123 Vineyard Ave",
        venue_name: "Wine Estate",
        original_price: 350,
        sale_price: 300,
        ticket_url: "https://example.com/tickets/wine-tasting",
        thumbnail_url: "https://example.com/images/wine-tasting.jpg",
        logo_url: null,
        is_featured: true,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "Cheese & Wine Pairing",
        short_description: "Discover perfect wine and cheese combinations",
        start_date: "2025-06-10",
        end_date: "2025-06-10",
        city: "Stellenbosch",
        address: "456 Wine Route",
        venue_name: "Cheese & Wine Emporium",
        original_price: 450,
        sale_price: null,
        ticket_url: "https://example.com/tickets/wine-cheese",
        thumbnail_url: "https://example.com/images/cheese-wine.jpg",
        logo_url: null,
        is_featured: false,
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "Winemakers Dinner",
        short_description: "Exclusive 5-course dinner with paired wines",
        start_date: "2025-07-20",
        end_date: "2025-07-20",
        city: "Franschhoek",
        address: "789 Gourmet Blvd",
        venue_name: "Le Restaurant",
        original_price: 1200,
        sale_price: 950,
        ticket_url: "https://example.com/tickets/winemakers-dinner",
        thumbnail_url: "https://example.com/images/winemakers-dinner.jpg",
        logo_url: null,
        is_featured: true,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockEvents;
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
    // In a real application, you would save to the database
    // For now, just log the event and return success
    console.log("Adding event (mock):", event);
    toast({
      title: "Event added (mock)",
      description: "This is a mock implementation since the events table doesn't exist",
    });
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
    // In a real application, you would update in the database
    console.log("Updating event (mock):", event);
    toast({
      title: "Event updated (mock)",
      description: "This is a mock implementation since the events table doesn't exist",
    });
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
    // In a real application, you would delete from the database
    console.log("Deleting event (mock) with ID:", id);
    toast({
      title: "Event deleted (mock)",
      description: "This is a mock implementation since the events table doesn't exist",
    });
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
