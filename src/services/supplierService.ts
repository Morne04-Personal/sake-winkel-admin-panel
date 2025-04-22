
import { supabase } from "@/integrations/supabase/client";
import { Supplier } from "@/types";
import { toast } from "@/components/ui/use-toast";

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .select("*")
      .schema('production')
      .is('deleted_at', null)
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast({
      title: "Error fetching suppliers",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const addSupplier = async (supplier: Omit<Supplier, "id" | "created_at" | "updated_at">): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('suppliers')
      .insert(supplier)
      .schema('production');
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error adding supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const updateSupplier = async (supplier: Supplier): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('suppliers')
      .update({
        ...supplier,
        updated_at: new Date().toISOString()
      })
      .eq("id", supplier.id)
      .schema('production');
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error updating supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const deleteSupplier = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('suppliers')
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .schema('production');
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};
