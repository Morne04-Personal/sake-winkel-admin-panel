
import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Index = () => {
  // Fetch counts from Supabase in the production schema
  const { data: productCount, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['productCount'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .is('deleted_at', null);
          
        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error("Error fetching product count:", error);
        return 0;
      }
    }
  });

  const { data: supplierCount, isLoading: isLoadingSuppliers } = useQuery({
    queryKey: ['supplierCount'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('suppliers')
          .select('*', { count: 'exact', head: true })
          .is('deleted_at', null);
          
        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error("Error fetching supplier count:", error);
        return 0;
      }
    }
  });

  // Fetch user count
  const { data: userCount, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['userCount'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .is('deleted_at', null);

        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error("Error fetching user count:", error);
        return 0;
      }
    }
  });

  // Fetch event count
  const { data: eventCount, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['eventCount'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true })
          .is('deleted_at', null);

        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error("Error fetching event count:", error);
        return 0;
      }
    }
  });

  // Function to render count with loading state
  const renderCount = (count: number | undefined, isLoading: boolean) => {
    if (isLoading) {
      return <Loader2 className="h-6 w-6 animate-spin text-gray-400" />;
    }
    return <div className="text-2xl font-bold">{count || 0}</div>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-sakewinkel-navy">Dashboard Overview</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Products</CardTitle>
            </CardHeader>
            <CardContent>
              {renderCount(productCount, isLoadingProducts)}
              <p className="text-xs text-muted-foreground">Total products</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              {renderCount(supplierCount, isLoadingSuppliers)}
              <p className="text-xs text-muted-foreground">Active suppliers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Users</CardTitle>
            </CardHeader>
            <CardContent>
              {renderCount(userCount, isLoadingUsers)}
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Events</CardTitle>
            </CardHeader>
            <CardContent>
              {renderCount(eventCount, isLoadingEvents)}
              <p className="text-xs text-muted-foreground">Upcoming events</p>
            </CardContent>
          </Card>
        </div>

        {/* Add a recently added products section */}
        <RecentProducts />
      </div>
    </DashboardLayout>
  );
};

// Component to display recently added products
const RecentProducts = () => {
  const { data: recentProducts = [], isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name, 
            original_price,
            sale_price,
            created_at,
            supplier_id
          `)
          .is('deleted_at', null)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        // Get supplier names for each product
        if (data && data.length > 0) {
          const supplierIds = data.map(product => product.supplier_id).filter(Boolean);
          
          if (supplierIds.length > 0) {
            const { data: suppliers } = await supabase
              .from('suppliers')
              .select('id, name')
              .in('id', supplierIds);
              
            // Attach supplier name to each product
            return data.map(product => ({
              ...product,
              supplier_name: suppliers?.find(s => s.id === product.supplier_id)?.name || 'Unknown'
            }));
          }
        }
        
        return data || [];
      } catch (error) {
        console.error("Error fetching recent products:", error);
        return [];
      }
    }
  });

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recently Added Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recently Added Products</CardTitle>
      </CardHeader>
      <CardContent>
        {recentProducts && recentProducts.length > 0 ? (
          <div className="space-y-4">
            {recentProducts.map((product: any) => (
              <div key={product.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.supplier_name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    R{product.sale_price ? product.sale_price : product.original_price}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(product.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No products found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Index;
