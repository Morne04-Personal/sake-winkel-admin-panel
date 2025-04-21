import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { DbProduct } from "@/types/dbTypes";
import { toast } from "@/components/ui/use-toast";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // No need to specify schema since client is configured for production schema
    const { data, error } = await supabase
      .from('products')
      .select("*")
      .is('deleted_at', null) // Only select non-deleted products
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Map database products to our Product type
    const typedProducts: Product[] = data.map((product: DbProduct) => ({
      id: Number(product.id),
      supplier_id: product.supplier_id,
      name: product.name,
      sale_price: product.sale_price,
      original_price: product.original_price,
      qty_in_stock: product.qty_in_stock,
      delivery_cost: product.delivery_cost,
      commission_value: product.commission_value,
      short_overview: product.short_overview,
      description: product.description,
      color: product.color,
      specifications: product.specifications,
      main_image_url: product.main_image_url,
      on_homepage: product.on_homepage,
      max_per_order: product.max_per_order,
      created_at: product.created_at,
      updated_at: product.updated_at
    }));
    
    return typedProducts;
  } catch (error: any) {
    toast({
      title: "Error fetching products",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const addProduct = async (product: Product): Promise<boolean> => {
  try {
    // Remove any fields that are not in the database schema
    const { id, created_at, updated_at, ...dbProduct } = product;

    const { error } = await supabase
      .from('products')
      .insert(dbProduct);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error adding product",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const updateProduct = async (product: Product): Promise<boolean> => {
  try {
    // Remove any fields that should not be updated
    const { created_at, updated_at, ...dbProduct } = product;

    const { error } = await supabase
      .from('products')
      .update(dbProduct)
      .eq("id", product.id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error updating product",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    // Using soft delete by setting deleted_at timestamp
    const { error } = await supabase
      .from('products')
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    toast({
      title: "Error deleting product",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};