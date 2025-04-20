export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      balanceChecks: {
        Row: {
          accountBalance: number | null
          availableBalance: number | null
          created_at: string
          entityId: string | null
          id: number
          outstandingRequisitions: number | null
          Statement: Json | null
        }
        Insert: {
          accountBalance?: number | null
          availableBalance?: number | null
          created_at?: string
          entityId?: string | null
          id?: number
          outstandingRequisitions?: number | null
          Statement?: Json | null
        }
        Update: {
          accountBalance?: number | null
          availableBalance?: number | null
          created_at?: string
          entityId?: string | null
          id?: number
          outstandingRequisitions?: number | null
          Statement?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "balanceChecks_entityId_fkey"
            columns: ["entityId"]
            isOneToOne: false
            referencedRelation: "gpayConsumers"
            referencedColumns: ["entityId"]
          },
          {
            foreignKeyName: "balanceChecks_entityId_fkey"
            columns: ["entityId"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["gpay_entity_id"]
          },
        ]
      }
      gpayConsumers: {
        Row: {
          created_at: string
          email: string | null
          entityAccountId: string | null
          entityId: string | null
          entityReference: string | null
          firstName: string | null
          id: number
          idNumber: number | null
          phoneNumber: string | null
          StreetAddr: string | null
          surname: string | null
          townId: string | null
          townName: string | null
          url: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          entityAccountId?: string | null
          entityId?: string | null
          entityReference?: string | null
          firstName?: string | null
          id?: number
          idNumber?: number | null
          phoneNumber?: string | null
          StreetAddr?: string | null
          surname?: string | null
          townId?: string | null
          townName?: string | null
          url?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          entityAccountId?: string | null
          entityId?: string | null
          entityReference?: string | null
          firstName?: string | null
          id?: number
          idNumber?: number | null
          phoneNumber?: string | null
          StreetAddr?: string | null
          surname?: string | null
          townId?: string | null
          townName?: string | null
          url?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gpayConsumers_townId_fkey"
            columns: ["townId"]
            isOneToOne: false
            referencedRelation: "towns"
            referencedColumns: ["id"]
          },
        ]
      }
      orderIntent: {
        Row: {
          created_at: string
          email: string | null
          firstName: string | null
          id: number
          lastName: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: number
          lastName?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: number
          lastName?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          clientConfirmed: boolean
          clientConfirmedAt: string | null
          created_at: string
          expectedPayment: number | null
          gpayConsumer: number | null
          id: number
          isPayed: boolean
          orderStatus: number | null
          paymentConfirmedAt: string | null
          productOrdered: number | null
          quantity: number | null
          statusUpdatedAt: string | null
          trackingNumber: string | null
          verifiedPaymentId: number | null
        }
        Insert: {
          clientConfirmed?: boolean
          clientConfirmedAt?: string | null
          created_at?: string
          expectedPayment?: number | null
          gpayConsumer?: number | null
          id?: number
          isPayed?: boolean
          orderStatus?: number | null
          paymentConfirmedAt?: string | null
          productOrdered?: number | null
          quantity?: number | null
          statusUpdatedAt?: string | null
          trackingNumber?: string | null
          verifiedPaymentId?: number | null
        }
        Update: {
          clientConfirmed?: boolean
          clientConfirmedAt?: string | null
          created_at?: string
          expectedPayment?: number | null
          gpayConsumer?: number | null
          id?: number
          isPayed?: boolean
          orderStatus?: number | null
          paymentConfirmedAt?: string | null
          productOrdered?: number | null
          quantity?: number | null
          statusUpdatedAt?: string | null
          trackingNumber?: string | null
          verifiedPaymentId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_gpayConsumer_fkey"
            columns: ["gpayConsumer"]
            isOneToOne: false
            referencedRelation: "gpayConsumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_gpayConsumer_fkey"
            columns: ["gpayConsumer"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "orders_orderStatus_fkey"
            columns: ["orderStatus"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["order_status_id"]
          },
          {
            foreignKeyName: "orders_orderStatus_fkey"
            columns: ["orderStatus"]
            isOneToOne: false
            referencedRelation: "orderStatuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_productOrdered_fkey"
            columns: ["productOrdered"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "orders_productOrdered_fkey"
            columns: ["productOrdered"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_verifiedPaymentId_fkey"
            columns: ["verifiedPaymentId"]
            isOneToOne: false
            referencedRelation: "paymentsVerified"
            referencedColumns: ["id"]
          },
        ]
      }
      orderStatuses: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      paymentsVerified: {
        Row: {
          consumerId: number | null
          created_at: string
          gpayDescription: string | null
          gpayReference: string | null
          gpaySyncDate: string | null
          id: number
          orderId: number | null
          paymentAmount: number | null
        }
        Insert: {
          consumerId?: number | null
          created_at?: string
          gpayDescription?: string | null
          gpayReference?: string | null
          gpaySyncDate?: string | null
          id?: number
          orderId?: number | null
          paymentAmount?: number | null
        }
        Update: {
          consumerId?: number | null
          created_at?: string
          gpayDescription?: string | null
          gpayReference?: string | null
          gpaySyncDate?: string | null
          id?: number
          orderId?: number | null
          paymentAmount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "paymentsVerified_consumerId_fkey"
            columns: ["consumerId"]
            isOneToOne: false
            referencedRelation: "gpayConsumers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paymentsVerified_consumerId_fkey"
            columns: ["consumerId"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "paymentsVerified_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "paymentsVerified_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          id: number
          name: string | null
          price: number | null
          qtyAvailable: number | null
          supplier: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          price?: number | null
          qtyAvailable?: number | null
          supplier?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          price?: number | null
          qtyAvailable?: number | null
          supplier?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_supplier_fkey"
            columns: ["supplier"]
            isOneToOne: false
            referencedRelation: "order_tracking_view"
            referencedColumns: ["supplier_id"]
          },
          {
            foreignKeyName: "products_supplier_fkey"
            columns: ["supplier"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          adminEmail: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          adminEmail?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          adminEmail?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      towns: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      order_tracking_view: {
        Row: {
          balance_checked_at: string | null
          client_account_balance: number | null
          client_address: string | null
          client_available_balance: number | null
          client_email: string | null
          client_id: number | null
          client_name: string | null
          client_outstanding_requisitions: number | null
          client_phone: string | null
          client_town: string | null
          delivery_confirmed_at: string | null
          entity_reference: string | null
          gpay_account_id: string | null
          gpay_entity_id: string | null
          hours_to_delivery: number | null
          hours_to_payment: number | null
          is_delivery_confirmed: boolean | null
          is_paid: boolean | null
          order_amount: number | null
          order_created_at: string | null
          order_id: number | null
          order_status: string | null
          order_status_id: number | null
          payment_confirmed_at: string | null
          product_id: number | null
          product_name: string | null
          product_price: number | null
          product_quantity_available: number | null
          status_description: string | null
          status_updated_at: string | null
          supplier_id: number | null
          supplier_name: string | null
          total_order_hours: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
