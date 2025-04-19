
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";
import { mockRoles, mockSuppliers } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  initialData?: User;
  isAdd: boolean;
}

const userSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  role_id: z.coerce.number().positive("Role is required"),
  supplier_id: z.union([z.coerce.number().positive().optional().nullable(), z.literal("")])
    .transform(val => val === "" ? null : val),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

const UserForm = ({ isOpen, onClose, onSave, initialData, isAdd }: UserFormProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      role_id: 7, // Default to guest role
      supplier_id: null,
    },
  });

  const watchRoleId = form.watch("role_id");
  
  // Check if the selected role is a supplier role (4 or 5)
  const isSupplierRole = watchRoleId === 4 || watchRoleId === 5;

  const handleSubmit = (values: UserFormValues) => {
    onSave(values as User);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add User" : "Edit User"}
      description={isAdd ? "Add a new user to the system" : "Edit user details"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSupplierRole && (
            <FormField
              control={form.control}
              name="supplier_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                    defaultValue={field.value?.toString() || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockSuppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-sakewinkel-navy">
              {isAdd ? "Add User" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default UserForm;
