
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { Supplier } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const SuppliersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);

  // Fetch suppliers from Supabase
  const { data: suppliers = [], isLoading, refetch } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("suppliers").select("*");
        if (error) throw error;
        
        // Map database suppliers to our Supplier type
        const typedSuppliers: Supplier[] = data.map(supplier => ({
          id: supplier.id,
          name: supplier.name || "",
          trading_as: null,
          entity_type: null,
          identification_type: "Other",
          identification_number: "0",
          is_vat_exempt: false,
          vat_exemption_proof_url: null,
          is_vat_registered: false,
          vat_number: null,
          industry_sector: null,
          cluster_grouping: null,
          zone: null,
          description: null,
          comments: null,
          logo_url: null,
          settlement_bank_choice: "Other",
          business_description_role: null,
          declaration_name: null,
          declaration_signed: null,
          declaration_date: null,
          created_at: supplier.created_at,
          updated_at: supplier.created_at
        }));
        
        return typedSuppliers;
      } catch (error: any) {
        toast({
          title: "Error fetching suppliers",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
    }
  });

  const handleAddSupplier = async (supplier: Supplier) => {
    try {
      // Convert to Supabase supplier format
      const dbSupplier = {
        name: supplier.name,
        adminEmail: null
      };

      const { error } = await supabase.from("suppliers").insert(dbSupplier);
      if (error) throw error;
      
      toast({
        title: "Supplier added",
        description: "Supplier has been added successfully",
      });
      
      setIsAddFormOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error adding supplier",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditSupplier = async (updatedSupplier: Supplier) => {
    try {
      // Convert to Supabase supplier format
      const dbSupplier = {
        name: updatedSupplier.name,
        adminEmail: null
      };

      const { error } = await supabase
        .from("suppliers")
        .update(dbSupplier)
        .eq("id", updatedSupplier.id);
      
      if (error) throw error;
      
      toast({
        title: "Supplier updated",
        description: "Supplier has been updated successfully",
      });
      
      setIsEditFormOpen(false);
      setCurrentSupplier(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error updating supplier",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      const { error } = await supabase.from("suppliers").delete().eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Supplier deleted",
        description: "Supplier has been deleted successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error deleting supplier",
        description: error.message,
        variant: "destructive",
      });
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
