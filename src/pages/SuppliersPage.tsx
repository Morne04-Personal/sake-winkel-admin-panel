
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { Supplier } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SuppliersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);

  // Fetch suppliers from Supabase
  const { data: suppliers = [], isLoading, refetch } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase.from("suppliers").select("*");
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  const handleAddSupplier = async (supplier: Supplier) => {
    await supabase.from("suppliers").insert(supplier);
    setIsAddFormOpen(false);
    refetch();
  };

  const handleEditSupplier = async (updatedSupplier: Supplier) => {
    await supabase.from("suppliers").update(updatedSupplier).eq("id", updatedSupplier.id);
    setIsEditFormOpen(false);
    setCurrentSupplier(null);
    refetch();
  };

  const handleDeleteSupplier = async (id: number) => {
    await supabase.from("suppliers").delete().eq("id", id);
    refetch();
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
          <div className="flex justify-center items-center h-40">Loading suppliers...</div>
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
