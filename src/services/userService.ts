
import { supabase } from "@/integrations/supabase/client";
import { User, Role } from "@/types";
import { toast } from "@/components/ui/use-toast";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .is('deleted_at', null)
      .order('first_name');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast({
      title: "Error fetching users",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const fetchRoles = async (): Promise<Role[]> => {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select("*")
      .order('id');
    
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast({
      title: "Error fetching roles",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const addUser = async (user: Omit<User, "id" | "created_at" | "updated_at">): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('users')
      .insert(user);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error adding user",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const updateUser = async (user: User): Promise<boolean> => {
  try {
    // Extract only the properties we want to update
    const { id, first_name, last_name, email, phone_number, role_id, supplier_id } = user;
    
    const { error } = await supabase
      .from('users')
      .update({
        first_name,
        last_name,
        email,
        phone_number,
        role_id,
        supplier_id,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error updating user",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('users')
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting user",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};
