import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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
import { User, Role } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchSuppliers } from "@/services";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User | Omit<User, "id" | "created_at" | "updated_at">) => void;
  initialData?: User;
  roles: Role[];
  isLoading: boolean;
  isAdd: boolean;
}

const userSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  role_id: z.coerce.number().positive("Role is required"),
  supplier_id: z.union([z.coerce.number().positive().optional().nullable(), z.literal("")])
    .transform(val => val === "" ? null : val),
  id_number: z.string().nullable().optional(),
  entity_reference: z.string().nullable().optional(),
  entity_account_id: z.string().nullable().optional(),
  street_address: z.string().nullable().optional(),
  entity_id: z.string().nullable().optional(),
  town_name: z.string().nullable().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

const UserForm = ({ isOpen, onClose, onSave, initialData, roles, isLoading, isAdd }: UserFormProps) => {
  const { toast } = useToast();
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(
    initialData?.role_id || null
  );

  // Fetch suppliers for supplier role users
  const { data: suppliers = [], isLoading: isLoadingSuppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers
  });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      role_id: 0,
      supplier_id: null,
      id_number: null,
      entity_reference: null,
      entity_account_id: null,
      street_address: null,
      entity_id: null,
      town_name: null,
    },
  });

  // Update the selected role when the form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'role_id') {
        setSelectedRoleId(Number(value.role_id));
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Check if the selected role is a supplier role (roles 4 or 5)
  const isSupplierRole = selectedRoleId === 4 || selectedRoleId === 5;

  const handleSubmit = (values: UserFormValues) => {
    onSave(values);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add User" : "Edit User"}
      description={isAdd ? "Add a new user to the system" : "Edit user details"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="form-section">
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-grid-2">
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
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Contact Information</h3>
            <div className="form-grid-2">
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
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Role Assignment</h3>
            <div className="form-grid space-y-6">
              <FormField
                control={form.control}
                name="role_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value ? field.value.toString() : undefined}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {isLoading ? (
                            <div className="flex items-center">Loading roles...</div>
                          ) : (
                            <SelectValue placeholder="Select role" />
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles && roles.length > 0 ? (
                          roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                              {role.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            No roles available
                          </SelectItem>
                        )}
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
                        disabled={isLoadingSuppliers}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {isLoadingSuppliers ? (
                              <div className="flex items-center">Loading suppliers...</div>
                            ) : (
                              <SelectValue placeholder="Select supplier" />
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suppliers && suppliers.length > 0 ? (
                            suppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                {supplier.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              No suppliers available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-submit">
              {isAdd ? "Add User" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default UserForm;