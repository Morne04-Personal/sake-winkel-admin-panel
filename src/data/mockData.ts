
import { Product, Supplier, Event, User, Role } from "@/types";

export const mockRoles: Role[] = [
  { id: 1, name: "Admin", description: "Full access to all features" },
  { id: 2, name: "Manager", description: "Access to manage content" },
  { id: 3, name: "Staff", description: "Limited access to content" },
  { id: 4, name: "Supplier Admin", description: "Admin for supplier" },
  { id: 5, name: "Supplier Staff", description: "Staff for supplier" },
  { id: 6, name: "Customer", description: "End customer" },
  { id: 7, name: "Guest", description: "Limited access" },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Japanese Imports Ltd",
    trading_as: "Japan Sake Direct",
    identification_type: "Company Registration",
    identification_number: "2022/123456/07",
    is_vat_exempt: false,
    vat_exemption_proof_url: null,
    is_vat_registered: true,
    vat_number: "4560123897",
    industry_sector: "Beverage",
    cluster_grouping: "Imported Beverages",
    zone: "Western Cape",
    description: "Premium Japanese sake importer",
    comments: "Excellent supplier relationship since 2020",
    logo_url: null,
    settlement_bank_choice: "Standard Bank",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-06-22T14:45:00Z",
  },
  {
    id: 2,
    name: "Sake Brewery Co",
    trading_as: "Sake Masters",
    identification_type: "Company Registration",
    identification_number: "2021/789012/07",
    is_vat_exempt: false,
    vat_exemption_proof_url: null,
    is_vat_registered: true,
    vat_number: "4890123456",
    industry_sector: "Beverage",
    cluster_grouping: "Brewing",
    zone: "Gauteng",
    description: "Local sake brewery with Japanese techniques",
    comments: "Growing supplier with excellent product quality",
    logo_url: null,
    settlement_bank_choice: "FNB",
    created_at: "2022-03-10T09:15:00Z",
    updated_at: "2023-05-18T11:20:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    supplier_id: 1,
    name: "Dassai 23 Junmai Daiginjo",
    sale_price: 1295.00,
    original_price: 1495.00,
    qty_in_stock: 24,
    delivery_cost: 120.00,
    commission_value: 195.00,
    short_overview: "Premium sake with rice polished to 23%",
    description: "Dassai 23 is the pinnacle of the Dassai sake range, with rice polished to 23% of its original size. This results in an extremely refined, delicate, and aromatic sake.",
    color: "Clear",
    specifications: "720ml, 16% ABV",
    main_image_url: null,
    on_homepage: true,
    max_per_order: 2,
    created_at: "2023-02-15T10:30:00Z",
    updated_at: "2023-06-22T14:45:00Z",
  },
  {
    id: 2,
    supplier_id: 2,
    name: "Hakkaisan Junmai Ginjo",
    sale_price: null,
    original_price: 895.00,
    qty_in_stock: 36,
    delivery_cost: 120.00,
    commission_value: 135.00,
    short_overview: "Clean, crisp sake from Niigata",
    description: "Hakkaisan is known for its clean, dry style typical of Niigata prefecture. This Junmai Ginjo has subtle fruit notes and a clean finish.",
    color: "Clear",
    specifications: "720ml, 15.5% ABV",
    main_image_url: null,
    on_homepage: false,
    max_per_order: 3,
    created_at: "2023-03-10T09:15:00Z",
    updated_at: "2023-07-05T11:20:00Z",
  },
];

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Sake Tasting Festival",
    short_description: "Annual sake tasting event featuring over 20 premium sakes",
    start_date: "2024-10-15",
    end_date: "2024-10-16",
    city: "Cape Town",
    address: "123 Main Road, Gardens",
    venue_name: "Artscape Theatre",
    original_price: 350,
    sale_price: 295,
    ticket_url: "https://example.com/tickets",
    thumbnail_url: null,
    logo_url: null,
    is_featured: true,
    created_at: "2024-03-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Sake and Food Pairing Workshop",
    short_description: "Learn to pair different sakes with various cuisines",
    start_date: "2024-11-05",
    end_date: "2024-11-05",
    city: "Johannesburg",
    address: "42 Long Street, Sandton",
    venue_name: "Culinary Institute",
    original_price: 250,
    sale_price: null,
    ticket_url: "https://example.com/workshop-tickets",
    thumbnail_url: null,
    logo_url: null,
    is_featured: false,
    created_at: "2024-03-15T14:30:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    created_at: "2023-01-10T08:30:00Z",
    updated_at: "2023-06-15T14:20:00Z",
    first_name: "John",
    last_name: "Smith",
    phone_number: "+27123456789",
    email: "john.smith@example.com",
    role_id: 1,
    supplier_id: null,
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    created_at: "2023-02-15T10:45:00Z",
    updated_at: "2023-05-20T09:15:00Z",
    first_name: "Sarah",
    last_name: "Johnson",
    phone_number: "+27234567890",
    email: "sarah.johnson@example.com",
    role_id: 2,
    supplier_id: null,
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    created_at: "2023-03-05T11:20:00Z",
    updated_at: "2023-07-10T16:30:00Z",
    first_name: "Hiroshi",
    last_name: "Tanaka",
    phone_number: "+27345678901",
    email: "hiroshi@sakebrewery.com",
    role_id: 4,
    supplier_id: 2,
  },
];

export const formatCurrency = (amount: number | null): string => {
  if (amount === null) return "—";
  return `R ${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
