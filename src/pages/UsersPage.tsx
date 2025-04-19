
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import UserForm from "@/components/users/UserForm";
import { mockUsers, mockRoles } from "@/data/mockData";
import { User } from "@/types";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleAddUser = (user: User) => {
    const newUser = {
      ...user,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setIsAddFormOpen(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(
      users.map((u) =>
        u.id === updatedUser.id
          ? { ...updatedUser, updated_at: new Date().toISOString() }
          : u
      )
    );
    setIsEditFormOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const openEditForm = (user: User) => {
    setCurrentUser(user);
    setIsEditFormOpen(true);
  };

  const getRoleNameById = (roleId: number) => {
    const role = mockRoles.find((role) => role.id === roleId);
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

        <UserTable
          users={users}
          getRoleName={getRoleNameById}
          onEdit={openEditForm}
          onDelete={handleDeleteUser}
        />

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
