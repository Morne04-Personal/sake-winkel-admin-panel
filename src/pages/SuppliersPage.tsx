
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { Supplier } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from "@/services";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import TableLoader from "@/components/common/TableLoader";

const SuppliersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const queryClient = useQueryClient();

  // Fetch suppliers from Supabase
  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers
  });

  const handleAddSupplier = async (supplier: Omit<Supplier, "id" | "created_at" | "updated_at">) => {
    const success = await addSupplier(supplier);
    
    if (success) {
      setIsAddFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  };

  const handleEditSupplier = async (updatedSupplier: Supplier) => {
    const success = await updateSupplier(updatedSupplier);
    
    if (success) {
      setIsEditFormOpen(false);
      setCurrentSupplier(null);
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    const success = await deleteSupplier(id);
    
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    }
  };

  const openEditForm = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsEditFormOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-h1 font-bold text-sakewinkel-navy">Suppliers</h1>
          <Button onClick={() => setIsAddFormOpen(true)} className="bg-sakewinkel-navy">
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>

        {isLoading ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableLoader colSpan={4} />
              </TableBody>
            </Table>
          </div>
        ) : (
          <SupplierTable
            suppliers={suppliers}
            onEdit={openEditForm}
            onDelete={handleDeleteSupplier}
          />
        )}

        {isAddFormOpen && (
          <SupplierForm
            isOpen={isAddFormOpen}
            onClose={() => setIsAddFormOpen(false)}
            onSave={handleAddSupplier}
            isAdd
          />
        )}

        {isEditFormOpen && currentSupplier && (
          <SupplierForm
            isOpen={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
            onSave={handleEditSupplier}
            initialData={currentSupplier}
            isAdd={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SuppliersPage;
