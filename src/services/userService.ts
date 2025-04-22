
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";
import { toast } from "@/components/ui/use-toast";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .schema('production')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
      
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

export const addUser = async (user: Omit<User, "id" | "created_at" | "updated_at">): Promise<boolean> => {
  try {
    // Create auth user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password: 'TemporaryPassword123!', // You would typically generate this or get it from the form
      options: {
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number
        }
      }
    });

    if (authError) throw authError;
    
    // The trigger will handle creating the user in production.users
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
    const { error } = await supabase
      .from('users')
      .update({
        ...user,
        updated_at: new Date().toISOString()
      })
      .eq("id", user.id)
      .schema('production');
    
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
      .eq("id", id)
      .schema('production');
    
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
