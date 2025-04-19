
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    setIsAddFormOpen(false);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id
          ? { ...updatedProduct, updated_at: new Date().toISOString() }
          : p
      )
    );
    setIsEditFormOpen(false);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
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

        <ProductTable
          products={products}
          onEdit={openEditForm}
          onDelete={handleDeleteProduct}
        />

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
