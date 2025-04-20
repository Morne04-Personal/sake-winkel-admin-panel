
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import UserForm from "@/components/users/UserForm";
import { User } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { mockUsers, mockRoles } from "@/data/mockData";

const UsersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // For now, use mock data instead of Supabase queries
  const { data: roles = mockRoles, isLoading: isRolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      // This is temporarily returning mock data
      // In a real application, this would fetch from Supabase
      return mockRoles;
    },
  });

  // Fetch users
  const { data: users = mockUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // This is temporarily returning mock data
      // In a real application, this would fetch from Supabase
      return mockUsers;
    },
  });

  // Add user mutation - mocked for now
  const addUserMutation = useMutation({
    mutationFn: async (user: Omit<User, "id" | "created_at" | "updated_at">) => {
      // Mock adding a user - in a real app, this would call Supabase
      const newUser: User = {
        ...user,
        id: `${mockUsers.length + 1}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "User added successfully" });
      setIsAddFormOpen(false);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error adding user", 
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update user mutation - mocked for now
  const updateUserMutation = useMutation({
    mutationFn: async (user: User) => {
      // Mock updating a user - in a real app, this would call Supabase
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: "User updated successfully" });
      setIsEditFormOpen(false);
      setCurrentUser(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error updating user", 
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Delete user mutation - mocked for now
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock deleting a user - in a real app, this would call Supabase
      return id;
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

        {isUsersLoading ? (
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
