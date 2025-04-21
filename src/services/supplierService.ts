import { supabase } from "@/integrations/supabase/client";
import { Supplier } from "@/types";
import { DbSupplier } from "@/types/dbTypes";
import { toast } from "@/components/ui/use-toast";

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  try {
    // No need to specify schema since client is configured for production schema
    const { data, error } = await supabase
      .from('suppliers')
      .select("*")
      .is('deleted_at', null) // Only select non-deleted suppliers
      .order('name');
    
    if (error) throw error;
    
    // Map database suppliers to our Supplier type
    const typedSuppliers: Supplier[] = data.map((supplier: DbSupplier) => ({
      id: Number(supplier.id),
      name: supplier.name || "",
      trading_as: supplier.trading_as,
      entity_type: supplier.entity_type,
      identification_type: supplier.identification_type || "Other",
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
      settlement_bank_choice: supplier.settlement_bank_choice || "",
      business_description_role: supplier.business_description_role,
      declaration_name: supplier.declaration_name,
      declaration_signed: supplier.declaration_signed,
      declaration_date: supplier.declaration_date,
      created_at: supplier.created_at,
      updated_at: supplier.updated_at
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
};

export const addSupplier = async (supplier: Supplier): Promise<boolean> => {
  try {
    // Remove any fields that are not in the database schema
    const { id, created_at, updated_at, ...dbSupplier } = supplier;

    const { error } = await supabase
      .from('suppliers')
      .insert(dbSupplier);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error adding supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const updateSupplier = async (supplier: Supplier): Promise<boolean> => {
  try {
    // Remove any fields that should not be updated
    const { created_at, updated_at, ...dbSupplier } = supplier;

    const { error } = await supabase
      .from('suppliers')
      .update(dbSupplier)
      .eq("id", supplier.id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error updating supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const deleteSupplier = async (id: number): Promise<boolean> => {
  try {
    // Using soft delete by setting deleted_at timestamp
    const { error } = await supabase
      .from('suppliers')
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting supplier",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};