import { User, Role, Product, Supplier, Event } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    role_id: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone_number: "987-654-3210",
    role_id: 2,
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    phone_number: "555-123-4567",
    role_id: 3,
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
];

export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Manager",
  },
  {
    id: 3,
    name: "Customer",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    supplier_id: 1,
    name: "Premium Sake Set",
    original_price: 299.99,
    sale_price: 249.99,
    qty_in_stock: 50,
    delivery_cost: 15,
    commission_value: 30,
    short_overview: "Traditional Japanese sake set",
    description: "Premium quality sake set with traditional designs",
    color: "White",
    specifications: "4 cups, 1 server",
    main_image_url: "https://example.com/sake-set.jpg",
    on_homepage: true,
    max_per_order: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    supplier_id: 2,
    name: "Craft Beer Selection",
    original_price: 149.99,
    sale_price: 129.99,
    qty_in_stock: 80,
    delivery_cost: 10,
    commission_value: 20,
    short_overview: "Variety of craft beers",
    description: "Selection of different craft beers from around the world",
    color: "Mixed",
    specifications: "6 bottles, assorted styles",
    main_image_url: "https://example.com/craft-beer.jpg",
    on_homepage: false,
    max_per_order: 5,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z"
  },
  {
    id: 3,
    supplier_id: 1,
    name: "Artisanal Wine Collection",
    original_price: 399.99,
    sale_price: 349.99,
    qty_in_stock: 30,
    delivery_cost: 20,
    commission_value: 40,
    short_overview: "Exclusive wine selection",
    description: "Collection of rare and artisanal wines from top vineyards",
    color: "Red",
    specifications: "3 bottles, vintage 2015",
    main_image_url: "https://example.com/wine-collection.jpg",
    on_homepage: true,
    max_per_order: 1,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z"
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Sake Heaven",
    trading_as: "Sake Imports",
    identification_number: "SAKE123",
    is_vat_registered: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Brew Master",
    trading_as: "Craft Beer Suppliers",
    identification_number: "BREW456",
    is_vat_registered: false,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: 3,
    name: "Vineyard Select",
    trading_as: "Fine Wine Distributors",
    identification_number: "VINE789",
    is_vat_registered: true,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
];

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Sake Tasting Evening",
    short_description: "Join us for an evening of premium sake tasting",
    start_date: "2024-05-01T18:00:00Z",
    end_date: "2024-05-01T21:00:00Z",
    city: "Cape Town",
    address: "123 Sake Street",
    venue_name: "Sake Lounge",
    original_price: 150,
    sale_price: 120,
    ticket_url: "https://example.com/tickets/1",
    thumbnail_url: "https://example.com/event1.jpg",
    logo_url: "https://example.com/logo1.jpg",
    is_featured: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Craft Beer Festival",
    short_description: "Experience the best craft beers from local breweries",
    start_date: "2024-06-15T12:00:00Z",
    end_date: "2024-06-15T22:00:00Z",
    city: "Johannesburg",
    address: "456 Beer Avenue",
    venue_name: "Brew Fest Arena",
    original_price: 100,
    sale_price: 80,
    ticket_url: "https://example.com/tickets/2",
    thumbnail_url: "https://example.com/event2.jpg",
    logo_url: "https://example.com/logo2.jpg",
    is_featured: false,
    created_at: "2024-01-05T00:00:00Z",
  },
  {
    id: 3,
    name: "Wine and Cheese Pairing",
    short_description: "Indulge in a sophisticated wine and cheese pairing event",
    start_date: "2024-07-20T19:00:00Z",
    end_date: "2024-07-20T23:00:00Z",
    city: "Stellenbosch",
    address: "789 Wine Road",
    venue_name: "Wine Estate Cellar",
    original_price: 200,
    sale_price: 180,
    ticket_url: "https://example.com/tickets/3",
    thumbnail_url: "https://example.com/event3.jpg",
    logo_url: "https://example.com/logo3.jpg",
    is_featured: true,
    created_at: "2024-01-10T00:00:00Z",
  },
];

// Add proper error handling for date formatting
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Add proper currency formatting
export const formatCurrency = (amount: number | null): string => {
  if (amount === null) return "N/A";
  try {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return "Invalid amount";
  }
};
