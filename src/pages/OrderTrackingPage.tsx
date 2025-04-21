import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderTrackingStats from "@/components/tracking/OrderTrackingStats";
import OrderTrackingFilters from "@/components/tracking/OrderTrackingFilters";
import OrderTrackingTable from "@/components/tracking/OrderTrackingTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrderTracking, fetchOrderStats, fetchOrderStatuses, OrderTrackingItem } from "@/services";

const OrderTrackingPage = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: ""
  });

  // Fetch order tracking data
  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orderTracking', filters],
    queryFn: () => fetchOrderTracking(filters),
  });

  // Fetch order stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['orderStats'],
    queryFn: fetchOrderStats,
  });

  // Fetch order statuses for filter dropdown
  const { data: statuses = [] } = useQuery({
    queryKey: ['orderStatuses'],
    queryFn: fetchOrderStatuses,
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['orderTracking'] });
    queryClient.invalidateQueries({ queryKey: ['orderStats'] });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-h1 mb-2">Order Tracking Dashboard</h1>
            <p className="text-sakewinkel-slate">Manage and monitor all order activities</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-small whitespace-nowrap">Last updated: {new Date().toLocaleString()}</span>
            <button 
              className="btn-submit px-4 py-2 rounded-md flex items-center gap-2 text-sm"
              onClick={handleRefresh}
            >
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <OrderTrackingStats stats={stats} isLoading={isLoadingStats} />

      {/* Filters */}
      <OrderTrackingFilters 
        onFilterChange={handleFilterChange} 
        filters={filters}
        statuses={statuses}
      />

      {/* Table */}
      <OrderTrackingTable 
        orders={orders} 
        isLoading={isLoadingOrders} 
      />
    </DashboardLayout>
  );
};

export default OrderTrackingPage;