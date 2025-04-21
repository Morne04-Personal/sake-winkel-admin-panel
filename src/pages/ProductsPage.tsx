
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProductsPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Fetch products from Supabase
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  const handleAddProduct = async (product: Product) => {
    await supabase.from("products").insert(product);
    setIsAddFormOpen(false);
    refetch();
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    await supabase.from("products").update(updatedProduct).eq("id", updatedProduct.id);
    setIsEditFormOpen(false);
    setCurrentProduct(null);
    refetch();
  };

  const handleDeleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("id", id);
    refetch();
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
