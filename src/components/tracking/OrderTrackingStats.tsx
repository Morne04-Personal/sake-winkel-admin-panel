import { Card, CardContent } from "@/components/ui/card";
import { OrderStats } from "@/services";
import { Loader } from "lucide-react";

interface OrderTrackingStatsProps {
  stats?: OrderStats;
  isLoading: boolean;
}

const OrderTrackingStats = ({ stats, isLoading }: OrderTrackingStatsProps) => {
  const defaultStats = {
    totalOrders: 0,
    pendingPayment: 0,
    deliveryPending: 0,
    completedOrders: 0
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        title="Total Orders" 
        value={data.totalOrders} 
        className="bg-sakewinkel-navy text-white"
        isLoading={isLoading}
      />
      <StatsCard 
        title="Pending Payment" 
        value={data.pendingPayment} 
        className="bg-yellow-500 text-white"
        isLoading={isLoading}
      />
      <StatsCard 
        title="Delivery Pending" 
        value={data.deliveryPending} 
        className="bg-blue-500 text-white"
        isLoading={isLoading}
      />
      <StatsCard 
        title="Completed Orders" 
        value={data.completedOrders} 
        className="bg-green-600 text-white"
        isLoading={isLoading}
      />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  className?: string;
  isLoading: boolean;
}

const StatsCard = ({ title, value, className, isLoading }: StatsCardProps) => (
  <Card className={`${className} transition-transform hover:scale-105`}>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-8">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </CardContent>
  </Card>
);

export default OrderTrackingStats;