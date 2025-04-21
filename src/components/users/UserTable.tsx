import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { User } from "@/types";
import { formatDate } from "@/utils/formatUtils";
import ActionButton from "@/components/common/ActionButton";
import { Badge } from "@/components/ui/badge";

interface UserTableProps {
  users: User[];
  getRoleName: (roleId: number) => string;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable = ({ users, getRoleName, onEdit, onDelete }: UserTableProps) => {
  // Helper function to get the badge color for roles
  const getRoleBadgeVariant = (roleName: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return "destructive";
      case "manager":
        return "default";
      case "supplier admin":
      case "supplier staff":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
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
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => {
              const roleName = getRoleName(user.role_id);
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(roleName)}>
                      {roleName}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ActionButton
                        onClick={() => onEdit(user)}
                        icon={Edit}
                        label="Edit"
                      />
                      <ActionButton
                        onClick={() => onDelete(user.id)}
                        icon={Trash2}
                        label="Delete"
                        variant="ghost"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;