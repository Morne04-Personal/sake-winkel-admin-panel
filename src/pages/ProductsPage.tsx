
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const ProductsPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Fetch products from Supabase
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        
        // Map database products to our Product type
        const typedProducts: Product[] = data.map(product => ({
          id: product.id,
          supplier_id: product.supplier || 0,
          name: product.name || "",
          sale_price: null,
          original_price: product.price || 0,
          qty_in_stock: product.qtyAvailable || 0,
          delivery_cost: 0,
          commission_value: 0,
          short_overview: null,
          description: null,
          color: null,
          specifications: null,
          main_image_url: null,
          on_homepage: false,
          max_per_order: null,
          created_at: product.created_at,
          updated_at: product.created_at
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
    }
  });

  const handleAddProduct = async (product: Product) => {
    try {
      // Convert to Supabase product format
      const dbProduct = {
        name: product.name,
        price: product.original_price,
        qtyAvailable: product.qty_in_stock,
        supplier: product.supplier_id
      };

      const { error } = await supabase.from("products").insert(dbProduct);
      if (error) throw error;
      
      toast({
        title: "Product added",
        description: "Product has been added successfully",
      });
      
      setIsAddFormOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      // Convert to Supabase product format
      const dbProduct = {
        name: updatedProduct.name,
        price: updatedProduct.original_price,
        qtyAvailable: updatedProduct.qty_in_stock,
        supplier: updatedProduct.supplier_id
      };

      const { error } = await supabase
        .from("products")
        .update(dbProduct)
        .eq("id", updatedProduct.id);
      
      if (error) throw error;
      
      toast({
        title: "Product updated",
        description: "Product has been updated successfully",
      });
      
      setIsEditFormOpen(false);
      setCurrentProduct(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error updating product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openEditForm = (product: Product) => {
    setCurrentProduct(product);
    setIsEditFormOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-h1 font-bold text-sakewinkel-navy">Products</h1>
          <Button onClick={() => setIsAddFormOpen(true)} className="bg-sakewinkel-navy">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">Loading products...</div>
        ) : (
          <ProductTable
            products={products}
            onEdit={openEditForm}
            onDelete={handleDeleteProduct}
          />
        )}

        {isAddFormOpen && (
          <ProductForm
            isOpen={isAddFormOpen}
            onClose={() => setIsAddFormOpen(false)}
            onSave={handleAddProduct}
            isAdd
          />
        )}

        {isEditFormOpen && currentProduct && (
          <ProductForm
            isOpen={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
            onSave={handleEditProduct}
            initialData={currentProduct}
            isAdd={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
