
import { TableCell, TableRow } from "@/components/ui/table";

interface TableLoaderProps {
  colSpan: number;
}

const TableLoader = ({ colSpan }: TableLoaderProps) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24">
      <div className="flex justify-center items-center">
        <div className="w-6 h-6 border-2 border-t-transparent border-sakewinkel-navy rounded-full animate-spin" />
      </div>
    </TableCell>
  </TableRow>
);

export default TableLoader;
