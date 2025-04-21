// Database types with additional properties like deleted_at for soft deletes
export interface DbProduct {
    id: number;
    supplier_id: number;
    name: string;
    sale_price: number | null;
    original_price: number;
    qty_in_stock: number;
    delivery_cost: number;
    commission_value: number;
    short_overview: string | null;
    description: string | null;
    color: string | null;
    specifications: string | null;
    main_image_url: string | null;
    on_homepage: boolean | null;
    max_per_order: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  
  export interface DbSupplier {
    id: number;
    name: string;
    trading_as: string | null;
    entity_type: string | null;
    identification_type: string;
    identification_number: string;
    is_vat_exempt: boolean;
    vat_exemption_proof_url: string | null;
    is_vat_registered: boolean;
    vat_number: string | null;
    industry_sector: string | null;
    cluster_grouping: string | null;
    zone: string | null;
    description: string | null;
    comments: string | null;
    logo_url: string | null;
    settlement_bank_choice: string;
    business_description_role: string | null;
    declaration_name: string | null;
    declaration_signed: boolean | null;
    declaration_date: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  
  export interface DbEvent {
    id: number;
    name: string | null;
    short_description: string | null;
    start_date: string | null;
    end_date: string | null;
    city: string | null;
    address: string | null;
    venue_name: string | null;
    original_price: number | null;
    sale_price: number | null;
    ticket_url: string | null;
    thumbnail_url: string | null;
    logo_url: string | null;
    is_featured: boolean | null;
    created_at: string;
    deleted_at: string | null;
  }