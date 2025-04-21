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
import TableLoader from "@/components/common/TableLoader";

const SuppliersPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);

  // Fetch suppliers from Supabase
  const { data: suppliers = [], isLoading, refetch } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('suppliers')
          .select("*")
          .is('deleted_at', null);
          
        if (error) throw error;
        
        // Map database suppliers to our Supplier type
        const typedSuppliers: Supplier[] = data.map(supplier => ({
          id: Number(supplier.id),
          name: supplier.name || "",
          trading_as: supplier.trading_as,
          entity_type: supplier.entity_type,
          identification_type: supplier.identification_type || "Company Registration",
          identification_number: supplier.identification_number || "",
          is_vat_exempt: supplier.is_vat_exempt || false,
          vat_exemption_proof_url: supplier.vat_exemption_proof_url,
          is_vat_registered: supplier.is_vat_registered || false,
          vat_number: supplier.vat_number,
          industry_sector: supplier.industry_sector,
          cluster_grouping: supplier.cluster_grouping,
          zone: supplier.zone,
          description: supplier.description,
          comments: supplier.comments,
          logo_url: supplier.logo_url,
          settlement_bank_choice: supplier.settlement_bank_choice || "Other",
          business_description_role: supplier.business_description_role,
          declaration_name: supplier.declaration_name,
          declaration_signed: supplier.declaration_signed,
          declaration_date: supplier.declaration_date,
          created_at: supplier.created_at,
          updated_at: supplier.updated_at || supplier.created_at
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
      // Extract ID and timestamps which are handled by Supabase
      const { id, created_at, updated_at, ...supplierData } = supplier;

      const { error } = await supabase
        .from('suppliers')
        .insert(supplierData);
        
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
      // Extract ID and timestamps
      const { id, created_at, updated_at, ...supplierData } = updatedSupplier;

      const { error } = await supabase
        .from('suppliers')
        .update({
          ...supplierData,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);
      
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
      // Soft delete with timestamp
      const { error } = await supabase
        .from('suppliers')
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);
      
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
          <TableLoader colSpan={7} />
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