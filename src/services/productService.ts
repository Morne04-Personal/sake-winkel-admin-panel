
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { toast } from "@/components/ui/use-toast";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select("*")
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    toast({
      title: "Error fetching products",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const addProduct = async (product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .insert(product);
      
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
    const { error } = await supabase
      .from('products')
      .update({
        ...product,
        updated_at: new Date().toISOString()
      })
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
    const { error } = await supabase
      .from('products')
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
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
