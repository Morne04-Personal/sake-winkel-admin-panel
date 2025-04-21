import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { OrderTrackingItem } from "@/services";
import { formatCurrency, formatDate } from "@/utils/formatUtils";
import { useState } from "react";
import TableLoader from "@/components/common/TableLoader";
import { Badge } from "@/components/ui/badge";

interface OrderTrackingTableProps {
  orders: OrderTrackingItem[];
  isLoading: boolean;
}

const OrderTrackingTable = ({ orders, isLoading }: OrderTrackingTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new':
      case 'pending':
        return "bg-blue-100 text-blue-800";
      case 'processing':
      case 'preparing':
        return "bg-yellow-100 text-yellow-800";
      case 'shipped':
      case 'dispatched':
        return "bg-purple-100 text-purple-800";
      case 'delivered':
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'cancelled':
      case 'failed':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader colSpan={8} />
            ) : currentOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              currentOrders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium">#{order.order_id}</TableCell>
                  <TableCell>{formatDate(order.order_created_at)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.client_name || '—'}</div>
                      <div className="text-sm text-gray-500">{order.client_email || '—'}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.product_name || '—'}</TableCell>
                  <TableCell>{order.order_amount ? formatCurrency(order.order_amount) : '—'}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`${getStatusBadgeColor(order.order_status)} font-medium`}
                    >
                      {order.order_status || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${order.is_paid ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span>{order.is_paid ? 'Paid' : 'Unpaid'}</span>
                  </TableCell>
                  <TableCell>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && orders.length > 0 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, orders.length)} of {orders.length} orders
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* Show limited page numbers with ellipsis if needed */}
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNumber;
                
                if (totalPages <= 5) {
                  // If 5 or fewer total pages, show all page numbers
                  pageNumber = idx + 1;
                } else if (currentPage <= 3) {
                  // If on early pages, show first 5 pages
                  pageNumber = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  // If on late pages, show last 5 pages
                  pageNumber = totalPages - 4 + idx;
                } else {
                  // If in middle, show current page and 2 before/after
                  pageNumber = currentPage - 2 + idx;
                }
                
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingTable;