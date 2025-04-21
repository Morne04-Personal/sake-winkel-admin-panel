import { supabase } from "@/integrations/supabase/client";
import { User, Role } from "@/types";
import { toast } from "@/components/ui/use-toast";

export interface DbUser {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role_id: number;
  supplier_id: number | null;
  id_number: string | null;
  entity_reference: string | null;
  entity_account_id: string | null;
  street_address: string | null;
  entity_id: string | null;
  town_name: string | null;
  deleted_at: string | null;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Use the production schema (configured in the Supabase client)
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Map database users to our User type
    const typedUsers: User[] = data.map((user: DbUser) => ({
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      role_id: user.role_id,
      supplier_id: user.supplier_id,
      id_number: user.id_number,
      entity_reference: user.entity_reference,
      entity_account_id: user.entity_account_id,
      street_address: user.street_address,
      entity_id: user.entity_id,
      town_name: user.town_name
    }));
    
    return typedUsers;
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
      .order('id', { ascending: true });
    
    if (error) throw error;
    
    // Map to our Role type
    const typedRoles: Role[] = data.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      created_at: role.created_at,
      updated_at: role.updated_at
    }));
    
    return typedRoles;
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
    // Prepare user data for insert
    const { data: authData, error: authError } = await supabase.auth
      .signUp({
        email: user.email,
        password: 'TemporaryPassword123!', // You would typically generate this or get it from the form
        options: {
          data: {
            first_name: user.first_name,
            last_name: user.last_name
          }
        }
      });

    if (authError) throw authError;
    
    // Now insert the user profile data
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        role_id: user.role_id,
        supplier_id: user.supplier_id
      });
      
    if (profileError) throw profileError;
    
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
    // Update only the user profile data (not auth data)
    const { error } = await supabase
      .from('users')
      .update({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        role_id: user.role_id,
        supplier_id: user.supplier_id,
        id_number: user.id_number,
        entity_reference: user.entity_reference,
        entity_account_id: user.entity_account_id,
        street_address: user.street_address,
        entity_id: user.entity_id,
        town_name: user.town_name
      })
      .eq("id", user.id);
    
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
    // Soft delete by setting deleted_at timestamp
    const { error } = await supabase
      .from('users')
      .update({ deleted_at: new Date().toISOString() })
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