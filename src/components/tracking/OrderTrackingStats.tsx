
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { title: "Total Orders", value: 254, className: "bg-sakewinkel-navy text-white" },
  { title: "Pending Payment", value: 45, className: "bg-yellow-500 text-white" },
  { title: "Delivery Pending", value: 89, className: "bg-blue-500 text-white" },
  { title: "Completed Orders", value: 120, className: "bg-green-600 text-white" },
];

const OrderTrackingStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.className} transition-transform hover:scale-105`}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-white">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderTrackingStats;
