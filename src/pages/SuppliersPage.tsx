
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { mockSuppliers } from "@/data/mockData";
import { Supplier } from "@/types";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);

  const handleAddSupplier = (supplier: Supplier) => {
    const newSupplier = {
      ...supplier,
      id: Math.max(0, ...suppliers.map((p) => p.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSuppliers([...suppliers, newSupplier]);
    setIsAddFormOpen(false);
  };

  const handleEditSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(
      suppliers.map((s) =>
        s.id === updatedSupplier.id
          ? { ...updatedSupplier, updated_at: new Date().toISOString() }
          : s
      )
    );
    setIsEditFormOpen(false);
    setCurrentSupplier(null);
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
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

        <SupplierTable
          suppliers={suppliers}
          onEdit={openEditForm}
          onDelete={handleDeleteSupplier}
        />

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
