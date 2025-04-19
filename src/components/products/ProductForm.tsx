
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";
import { mockSuppliers } from "@/data/mockData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialData?: Product;
  isAdd: boolean;
}

const productSchema = z.object({
  id: z.number().optional(),
  supplier_id: z.coerce.number().positive("Supplier is required"),
  name: z.string().min(1, "Name is required"),
  sale_price: z.union([z.coerce.number().positive().optional().nullable(), z.literal("")])
    .transform(val => val === "" ? null : val),
  original_price: z.coerce.number().positive("Original price is required"),
  qty_in_stock: z.coerce.number().min(0, "Stock cannot be negative"),
  delivery_cost: z.coerce.number().min(0, "Delivery cost cannot be negative"),
  commission_value: z.coerce.number().min(0, "Commission value cannot be negative"),
  short_overview: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  specifications: z.string().optional().nullable(),
  main_image_url: z.string().optional().nullable(),
  on_homepage: z.boolean().optional().nullable(),
  max_per_order: z.union([z.coerce.number().positive().optional().nullable(), z.literal("")])
    .transform(val => val === "" ? null : val),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductForm = ({ isOpen, onClose, onSave, initialData, isAdd }: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      supplier_id: 0,
      name: "",
      sale_price: null,
      original_price: 0,
      qty_in_stock: 0,
      delivery_cost: 0,
      commission_value: 0,
      short_overview: "",
      description: "",
      color: "",
      specifications: "",
      main_image_url: null,
      on_homepage: false,
      max_per_order: null,
    },
  });

  const handleSubmit = (values: ProductFormValues) => {
    onSave(values as Product);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add Product" : "Edit Product"}
      description={isAdd ? "Add a new product to the catalog" : "Edit product details"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="supplier_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockSuppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="original_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price (R)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price (R) (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="If on sale"
                      {...field}
                      value={field.value === null ? '' : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="qty_in_stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delivery_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Cost (R)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commission_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission (R)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="short_overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Overview</FormLabel>
                <FormControl>
                  <Input placeholder="Brief product description" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed product description" 
                    rows={4} 
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Product color" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specifications</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. 720ml, 16% ABV" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="main_image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="URL to product image" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="max_per_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Per Order</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Maximum items per order"
                      {...field}
                      value={field.value === null ? '' : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="on_homepage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Display on homepage
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-sakewinkel-navy">
              {isAdd ? "Add Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default ProductForm;
