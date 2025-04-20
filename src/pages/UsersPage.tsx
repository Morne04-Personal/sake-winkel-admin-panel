import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import UserForm from "@/components/users/UserForm";
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// Type for the roles from the database
interface Role {
  id: number;
  name: string;
  description: string | null;
}

const UsersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Fetch roles
  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('role_id')
        .order('role_id');
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: async (user: Omit<User, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from('users')
        .insert([user])
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "User added successfully" });
      setIsAddFormOpen(false);
    },
    onError: (error) => {
      toast({ 
        title: "Error adding user", 
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (user: User) => {
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          role_id: user.role_id,
          supplier_id: user.supplier_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "User updated successfully" });
      setIsEditFormOpen(false);
      setCurrentUser(null);
    },
    onError: (error) => {
      toast({ 
        title: "Error updating user", 
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "User deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting user", 
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleAddUser = (user: Omit<User, "id" | "created_at" | "updated_at">) => {
    addUserMutation.mutate(user);
  };

  const handleEditUser = (user: User) => {
    updateUserMutation.mutate(user);
  };

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  const openEditForm = (user: User) => {
    setCurrentUser(user);
    setIsEditFormOpen(true);
  };

  const getRoleNameById = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "Unknown Role";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-h1 font-bold text-sakewinkel-navy">Users</h1>
          <Button onClick={() => setIsAddFormOpen(true)} className="bg-sakewinkel-navy">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">Loading users...</div>
        ) : (
          <UserTable
            users={users}
            getRoleName={getRoleNameById}
            onEdit={openEditForm}
            onDelete={handleDeleteUser}
          />
        )}

        {isAddFormOpen && (
          <UserForm
            isOpen={isAddFormOpen}
            onClose={() => setIsAddFormOpen(false)}
            onSave={handleAddUser}
            isAdd
          />
        )}

        {isEditFormOpen && currentUser && (
          <UserForm
            isOpen={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
            onSave={handleEditUser}
            initialData={currentUser}
            isAdd={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
