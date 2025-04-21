
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
import { Supplier } from "@/types";
import { formatDate } from "@/utils/formatUtils";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead className="min-w-[200px]">Name</TableHead>
            <TableHead className="min-w-[150px]">Trading As</TableHead>
            <TableHead className="min-w-[150px]">Identification</TableHead>
            <TableHead className="min-w-[120px]">VAT Registered</TableHead>
            <TableHead className="min-w-[120px]">Created</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No suppliers found.
              </TableCell>
            </TableRow>
          ) : (
            suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.trading_as || "—"}</TableCell>
                <TableCell>{supplier.identification_number}</TableCell>
                <TableCell>{supplier.is_vat_registered ? "Yes" : "No"}</TableCell>
                <TableCell>{formatDate(supplier.created_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(supplier)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(supplier.id)}
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

export default SupplierTable;
