import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import UserForm from "@/components/users/UserForm";
import { User } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { fetchUsers, fetchRoles, addUser, updateUser, deleteUser } from "@/services";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import TableLoader from "@/components/common/TableLoader";

const UsersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Fetch users from Supabase
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  // Fetch roles for the dropdown
  const { data: roles = [], isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles
  });

  const handleAddUser = async (user: Omit<User, "id" | "created_at" | "updated_at">) => {
    const success = await addUser(user);
    
    if (success) {
      toast({
        title: "User added",
        description: "User has been added successfully",
      });
      
      setIsAddFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  };

  const handleEditUser = async (user: User) => {
    const success = await updateUser(user);
    
    if (success) {
      toast({
        title: "User updated",
        description: "User has been updated successfully",
      });
      
      setIsEditFormOpen(false);
      setCurrentUser(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  };

  const handleDeleteUser = async (id: string) => {
    const success = await deleteUser(id);
    
    if (success) {
      toast({
        title: "User deleted",
        description: "User has been deleted successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
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

        {isLoadingUsers ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[150px]">Phone</TableHead>
                  <TableHead className="min-w-[120px]">Role</TableHead>
                  <TableHead className="min-w-[120px]">Created</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableLoader colSpan={6} />
              </TableBody>
            </Table>
          </div>
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
            roles={roles}
            isLoading={isLoadingRoles}
            isAdd
          />
        )}

        {isEditFormOpen && currentUser && (
          <UserForm
            isOpen={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
            onSave={handleEditUser}
            initialData={currentUser}
            roles={roles}
            isLoading={isLoadingRoles}
            isAdd={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;