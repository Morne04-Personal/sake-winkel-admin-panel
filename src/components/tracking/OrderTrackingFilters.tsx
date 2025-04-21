import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface FiltersState {
  search: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface OrderTrackingFiltersProps {
  onFilterChange: (filters: FiltersState) => void;
  filters: FiltersState;
  statuses: string[];
}

const OrderTrackingFilters = ({ onFilterChange, filters, statuses }: OrderTrackingFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);

  // Update local filters when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setLocalFilters(prev => ({ ...prev, status: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: "",
      status: "",
      startDate: "",
      endDate: ""
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

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
              name="search" 
              className="pl-9" 
              placeholder="Search by name, email..." 
              value={localFilters.search}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select 
            value={localFilters.status} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div>
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input 
              type="date" 
              name="startDate"
              value={localFilters.startDate}
              onChange={handleInputChange}
            />
            <Input 
              type="date" 
              name="endDate"
              value={localFilters.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-end gap-2">
          <Button 
            className="btn-submit px-4 py-2 rounded-md flex-1"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button 
            className="btn-cancel px-4 py-2 rounded-md"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingFilters;