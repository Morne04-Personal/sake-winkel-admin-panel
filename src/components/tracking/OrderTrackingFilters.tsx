
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const OrderTrackingFilters = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              id="search" 
              className="pl-9" 
              placeholder="Search by name, email..." 
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label htmlFor="status">Status</Label>
          <select 
            id="status" 
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          >
            <option value="">All Statuses</option>
            <option value="new">New Order</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" />
            <Input type="date" />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-end gap-2">
          <button className="btn-submit px-4 py-2 rounded-md flex-1">
            Apply Filters
          </button>
          <button className="btn-cancel px-4 py-2 rounded-md">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingFilters;
