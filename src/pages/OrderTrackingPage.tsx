
import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderTrackingStats from "@/components/tracking/OrderTrackingStats";
import OrderTrackingFilters from "@/components/tracking/OrderTrackingFilters";
import OrderTrackingTable from "@/components/tracking/OrderTrackingTable";

const OrderTrackingPage = () => {
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
              onClick={() => window.location.reload()}
            >
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <OrderTrackingStats />

      {/* Filters */}
      <OrderTrackingFilters />

      {/* Table */}
      <OrderTrackingTable />
    </DashboardLayout>
  );
};

export default OrderTrackingPage;
