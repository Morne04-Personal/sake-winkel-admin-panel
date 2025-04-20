
export interface Product {
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
}

export interface ProductGalleryImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  created_at: string;
}

export interface Supplier {
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
}

export interface Event {
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
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role_id: number;
  supplier_id: number | null;
  id_number: string | null;
  entity_reference: string | null;
  entity_account_id: string | null;
  street_address: string | null;
  entity_id: string | null;
  town_name: string | null;
}

export interface Contact {
  id: number;
  supplier_id: number;
  title: string | null;
  first_name: string;
  last_name: string;
  initials: string | null;
  id_number: string;
  telephone: string;
  fax: string | null;
  cell_phone: string;
  email: string;
  residing_address_type: string | null;
  is_primary_contact: boolean;
  created_at: string;
  updated_at: string;
}

export interface BankingDetail {
  id: number;
  supplier_id: number;
  bank_name: string;
  account_type: string;
  account_number: string;
  branch_name: string;
  branch_code: string;
  is_primary_external: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  supplier_id: number;
  address_type: string;
  is_primary: boolean;
  province: string;
  town: string;
  address_line_1: string;
  address_line_2: string | null;
  address_line_3: string | null;
  postal_code: string;
  telephone: string | null;
  fax: string | null;
  cell_phone: string | null;
  email: string | null;
  gps_latitude: string | null;
  gps_longitude: string | null;
  created_at: string;
  updated_at: string;
}
