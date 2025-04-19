
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/data/mockData";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead className="min-w-[200px]">Name</TableHead>
            <TableHead className="min-w-[150px]">Original Price</TableHead>
            <TableHead className="min-w-[150px]">Sale Price</TableHead>
            <TableHead className="min-w-[100px]">Stock</TableHead>
            <TableHead className="min-w-[150px]">Supplier ID</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.original_price)}</TableCell>
                <TableCell>
                  {product.sale_price ? formatCurrency(product.sale_price) : "—"}
                </TableCell>
                <TableCell>{product.qty_in_stock}</TableCell>
                <TableCell>{product.supplier_id}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
