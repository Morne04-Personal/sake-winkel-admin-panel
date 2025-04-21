
import { User, Role, Supplier, Product, Event } from "@/types";

// Mock users data
export const mockUsers: User[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    role_id: 1,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    supplier_id: null,
    id_number: null,
    entity_reference: null,
    entity_account_id: null,
    entity_id: null,
    street_address: null,
    town_name: null
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone_number: "234-567-8901",
    role_id: 2,
    created_at: "2023-01-02T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
    supplier_id: 1,
    id_number: "ID123456",
    entity_reference: "REF001",
    entity_account_id: "ACC001",
    entity_id: "ENT001",
    street_address: "123 Main St",
    town_name: "Downtown"
  },
  {
    id: "3",
    first_name: "Bob",
    last_name: "Johnson",
    email: "bob.johnson@example.com",
    phone_number: "345-678-9012",
    role_id: 3,
    created_at: "2023-01-03T00:00:00Z",
    updated_at: "2023-01-03T00:00:00Z",
    supplier_id: null,
    id_number: null,
    entity_reference: null,
    entity_account_id: null,
    entity_id: null,
    street_address: null,
    town_name: null
  }
];

// Mock roles data
export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all functionalities",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Supplier",
    description: "Access to supplier functionalities",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Customer",
    description: "Limited access to view products and place orders",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  }
];

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Sake",
    supplier_id: 1,
    sale_price: 39.99,
    original_price: 49.99,
    qty_in_stock: 100,
    delivery_cost: 5.99,
    commission_value: 2.5,
    short_overview: "Premium quality sake imported from Japan",
    description: "This premium sake is brewed using traditional methods and high-quality rice.",
    color: null,
    specifications: "Alcohol content: 15%, Volume: 750ml",
    main_image_url: "/placeholder.svg",
    on_homepage: true,
    max_per_order: 5,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z"
  },
  {
    id: 2,
    name: "Junmai Daiginjo",
    supplier_id: 2,
    sale_price: 59.99,
    original_price: 69.99,
    qty_in_stock: 50,
    delivery_cost: 6.99,
    commission_value: 3.0,
    short_overview: "Ultra-premium sake with fruity notes",
    description: "Junmai Daiginjo is the highest grade of sake with at least 50% of the rice polished away.",
    color: null,
    specifications: "Alcohol content: 16%, Volume: 720ml",
    main_image_url: "/placeholder.svg",
    on_homepage: true,
    max_per_order: 3,
    created_at: "2023-01-05T00:00:00Z",
    updated_at: "2023-01-06T00:00:00Z"
  },
  {
    id: 3,
    name: "Honjozo Sake",
    supplier_id: 3,
    sale_price: 29.99,
    original_price: 34.99,
    qty_in_stock: 150,
    delivery_cost: 4.99,
    commission_value: 2.0,
    short_overview: "Everyday drinking sake with a light profile",
    description: "Honjozo is a versatile sake that works well both warm and chilled.",
    color: null,
    specifications: "Alcohol content: 14.5%, Volume: 750ml",
    main_image_url: "/placeholder.svg",
    on_homepage: false,
    max_per_order: 10,
    created_at: "2023-01-10T00:00:00Z",
    updated_at: "2023-01-11T00:00:00Z"
  }
];

// Mock supplier data
export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Tokyo Breweries",
    trading_as: "Tokyo Sake Co.",
    identification_number: "JP12345678",
    entity_type: "Corporation",
    identification_type: "Business Registration",
    is_vat_exempt: false,
    vat_exemption_proof_url: null,
    is_vat_registered: true,
    vat_number: "VAT123456789",
    industry_sector: "Food & Beverage",
    cluster_grouping: "Alcoholic Beverages",
    zone: "Asia-Pacific",
    description: "Leading sake producer from Tokyo region",
    comments: null,
    logo_url: "/placeholder.svg",
    settlement_bank_choice: "Direct Deposit",
    business_description_role: "Manufacturer",
    declaration_name: "Tanaka Hiroshi",
    declaration_signed: true,
    declaration_date: "2022-12-01T00:00:00Z",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Kyoto Traditional",
    trading_as: "Kyoto Sake House",
    identification_number: "JP87654321",
    entity_type: "Partnership",
    identification_type: "Business Registration",
    is_vat_exempt: false,
    vat_exemption_proof_url: null,
    is_vat_registered: false,
    vat_number: null,
    industry_sector: "Food & Beverage",
    cluster_grouping: "Alcoholic Beverages",
    zone: "Asia-Pacific",
    description: "Artisanal sake from Kyoto's historical district",
    comments: null,
    logo_url: "/placeholder.svg",
    settlement_bank_choice: "Wire Transfer",
    business_description_role: "Manufacturer",
    declaration_name: "Yamamoto Kenji",
    declaration_signed: true,
    declaration_date: "2022-12-05T00:00:00Z",
    created_at: "2023-01-03T00:00:00Z",
    updated_at: "2023-01-03T00:00:00Z"
  },
  {
    id: 3,
    name: "Niigata Valley",
    trading_as: "Niigata Premium Sake",
    identification_number: "JP45678901",
    entity_type: "Limited Company",
    identification_type: "Business Registration",
    is_vat_exempt: false,
    vat_exemption_proof_url: null,
    is_vat_registered: true,
    vat_number: "VAT987654321",
    industry_sector: "Food & Beverage",
    cluster_grouping: "Alcoholic Beverages",
    zone: "Asia-Pacific",
    description: "Premium sake from the Niigata region, known for pure water",
    comments: null,
    logo_url: "/placeholder.svg",
    settlement_bank_choice: "Direct Deposit",
    business_description_role: "Manufacturer",
    declaration_name: "Suzuki Akira",
    declaration_signed: true,
    declaration_date: "2022-12-10T00:00:00Z",
    created_at: "2023-01-05T00:00:00Z",
    updated_at: "2023-01-05T00:00:00Z"
  }
];

// Mock events data
export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Tokyo Sake Festival",
    short_description: "Annual celebration of Japan's finest sake",
    start_date: "2023-04-15T10:00:00Z",
    end_date: "2023-04-17T18:00:00Z",
    city: "Tokyo",
    address: "Tokyo Exhibition Center, 1-2-3 Marunouchi",
    venue_name: "Tokyo Exhibition Center",
    original_price: 25.00,
    sale_price: 20.00,
    ticket_url: "https://example.com/tickets/tokyo-sake-festival",
    thumbnail_url: "/placeholder.svg",
    logo_url: "/placeholder.svg",
    is_featured: true,
    created_at: "2023-01-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Sake Tasting Masterclass",
    short_description: "Learn to appreciate premium sake with expert guidance",
    start_date: "2023-05-20T18:30:00Z",
    end_date: "2023-05-20T21:30:00Z",
    city: "Osaka",
    address: "Osaka Cultural Center, 4-5-6 Umeda",
    venue_name: "Osaka Cultural Center",
    original_price: 45.00,
    sale_price: 39.99,
    ticket_url: "https://example.com/tickets/sake-masterclass",
    thumbnail_url: "/placeholder.svg",
    logo_url: "/placeholder.svg",
    is_featured: false,
    created_at: "2023-02-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Sake and Food Pairing Workshop",
    short_description: "Discover perfect food pairings for different sake varieties",
    start_date: "2023-06-10T19:00:00Z",
    end_date: "2023-06-10T22:00:00Z",
    city: "Kyoto",
    address: "Kyoto Culinary Academy, 7-8-9 Gion",
    venue_name: "Kyoto Culinary Academy",
    original_price: 55.00,
    sale_price: 49.99,
    ticket_url: "https://example.com/tickets/sake-food-pairing",
    thumbnail_url: "/placeholder.svg",
    logo_url: "/placeholder.svg",
    is_featured: true,
    created_at: "2023-02-15T00:00:00Z"
  }
];
