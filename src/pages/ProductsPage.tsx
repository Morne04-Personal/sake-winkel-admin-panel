import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import TableLoader from "@/components/common/TableLoader";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "@/services";
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const ProductsPage = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  // Fetch products from Supabase
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const handleAddProduct = async (product: Product) => {
    const success = await addProduct(product);
    
    if (success) {
      toast({
        title: "Product added",
        description: "Product has been added successfully",
      });
      
      setIsAddFormOpen(false);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    const success = await updateProduct(updatedProduct);
    
    if (success) {
      toast({
        title: "Product updated",
        description: "Product has been updated successfully",
      });
      
      setIsEditFormOpen(false);
      setCurrentProduct(null);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const success = await deleteProduct(id);
    
    if (success) {
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['products'] });
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[150px]">Supplier</TableHead>
                  <TableHead className="min-w-[150px]">Original Price</TableHead>
                  <TableHead className="min-w-[150px]">Sale Price</TableHead>
                  <TableHead className="min-w-[100px]">Stock</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableLoader colSpan={7} />
              </TableBody>
            </Table>
          </div>
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