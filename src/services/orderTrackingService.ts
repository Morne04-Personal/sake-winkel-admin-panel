import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface OrderTrackingItem {
  order_id: number;
  order_created_at: string;
  client_name: string;
  client_email: string; 
  client_phone: string;
  product_name: string;
  order_amount: number;
  order_status: string;
  status_updated_at: string;
  is_paid: boolean;
  payment_confirmed_at: string | null;
  total_order_hours: number | null;
  hours_to_payment: number | null;
  hours_to_delivery: number | null;
}

export interface OrderStats {
  totalOrders: number;
  pendingPayment: number;
  deliveryPending: number;
  completedOrders: number;
}

export const fetchOrderTracking = async (
  filters?: {
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<OrderTrackingItem[]> => {
  try {
    let query = supabase
      .from('order_tracking_view')
      .select("*")
      .order('order_created_at', { ascending: false });
    
    // Apply filters if they exist
    if (filters) {
      if (filters.search) {
        query = query.or(
          `client_name.ilike.%${filters.search}%,client_email.ilike.%${filters.search}%,product_name.ilike.%${filters.search}%`
        );
      }
      
      if (filters.status) {
        query = query.eq('order_status', filters.status);
      }
      
      if (filters.startDate) {
        query = query.gte('order_created_at', filters.startDate);
      }
      
      if (filters.endDate) {
        query = query.lte('order_created_at', filters.endDate);
      }
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    const orders: OrderTrackingItem[] = data.map(order => ({
      order_id: order.order_id,
      order_created_at: order.order_created_at,
      client_name: order.client_name,
      client_email: order.client_email,
      client_phone: order.client_phone,
      product_name: order.product_name,
      order_amount: order.order_amount,
      order_status: order.order_status,
      status_updated_at: order.status_updated_at,
      is_paid: order.is_paid,
      payment_confirmed_at: order.payment_confirmed_at,
      total_order_hours: order.total_order_hours,
      hours_to_payment: order.hours_to_payment,
      hours_to_delivery: order.hours_to_delivery,
    }));
    
    return orders;
  } catch (error: any) {
    toast({
      title: "Error fetching order tracking data",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

export const fetchOrderStats = async (): Promise<OrderStats> => {
  try {
    // Fetch total orders
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('id')
      .is('deleted_at', null);
    
    if (ordersError) throw ordersError;
    
    // Fetch pending payment orders
    const { data: pendingPaymentData, error: pendingPaymentError } = await supabase
      .from('orders')
      .select('id')
      .eq('isPayed', false)
      .is('deleted_at', null);
    
    if (pendingPaymentError) throw pendingPaymentError;
    
    // Fetch pending delivery orders (ordered but not delivered yet)
    // Assuming status 4 is "Delivered" - adjust this based on your status IDs
    const { data: pendingDeliveryData, error: pendingDeliveryError } = await supabase
      .from('orders')
      .select('id')
      .eq('isPayed', true)
      .neq('orderStatus', 4) // Not delivered yet
      .is('deleted_at', null);
    
    if (pendingDeliveryError) throw pendingDeliveryError;
    
    // Fetch completed orders (both paid and delivered)
    const { data: completedData, error: completedError } = await supabase
      .from('orders')
      .select('id')
      .eq('isPayed', true)
      .eq('orderStatus', 4) // Delivered status
      .is('deleted_at', null);
    
    if (completedError) throw completedError;
    
    return {
      totalOrders: ordersData.length,
      pendingPayment: pendingPaymentData.length,
      deliveryPending: pendingDeliveryData.length,
      completedOrders: completedData.length
    };
    
  } catch (error: any) {
    toast({
      title: "Error fetching order statistics",
      description: error.message,
      variant: "destructive",
    });
    return {
      totalOrders: 0,
      pendingPayment: 0,
      deliveryPending: 0,
      completedOrders: 0
    };
  }
};

export const fetchOrderStatuses = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('orderStatuses')
      .select('name')
      .order('id', { ascending: true });
    
    if (error) throw error;
    
    // Extract statuses and filter out null values
    return data.map(status => status.name).filter(Boolean) as string[];
  } catch (error: any) {
    toast({
      title: "Error fetching order statuses",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};