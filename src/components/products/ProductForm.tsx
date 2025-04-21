import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchSuppliers } from "@/services";

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

type FormStep = {
  title: string;
  fields: (keyof ProductFormValues)[];
};

const ProductForm = ({ isOpen, onClose, onSave, initialData, isAdd }: ProductFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Fetch suppliers for dropdown
  const { data: suppliers = [], isLoading: isLoadingSuppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers
  });
  
  const formSteps: FormStep[] = [
    {
      title: "Basic Info",
      fields: ["supplier_id", "name", "original_price", "sale_price"]
    },
    {
      title: "Inventory & Pricing",
      fields: ["qty_in_stock", "delivery_cost", "commission_value", "max_per_order"]
    },
    {
      title: "Product Details",
      fields: ["short_overview", "description", "color", "specifications", "main_image_url", "on_homepage"]
    }
  ];

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

  const handleNext = async () => {
    const currentFields = formSteps[currentStep].fields;
    const isValid = await form.trigger(currentFields as any);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (values: ProductFormValues) => {
    onSave(values as Product);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add Product" : "Edit Product"}
      description={isAdd ? "Add a new product to the catalog" : "Edit product details"}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
    >
      <div className="form-steps">
        {formSteps.map((step, index) => (
          <div 
            key={index} 
            className={`form-step ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}
          >
            <div className="form-step-number">
              {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <div className="form-step-label">{step.title}</div>
            {index < formSteps.length - 1 && <div className="form-step-line" />}
          </div>
        ))}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="supplier_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value ? field.value.toString() : undefined}
                      disabled={isLoadingSuppliers}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {isLoadingSuppliers ? (
                            <div className="flex items-center">Loading suppliers...</div>
                          ) : (
                            <SelectValue placeholder="Select supplier" />
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {suppliers && suppliers.length > 0 ? (
                          suppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id.toString()}>
                              {supplier.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            No suppliers available
                          </SelectItem>
                        )}
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

              <div className="form-grid-2">
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
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="form-grid-2">
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
              </div>

              <div className="form-grid-2">
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
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
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

              <div className="form-grid-2">
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

              <FormField
                control={form.control}
                name="on_homepage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
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
          )}

          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="btn-cancel flex gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            
            <div className="space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="btn-cancel"
              >
                Cancel
              </Button>
              
              {currentStep < formSteps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleNext}
                  className="btn-submit flex gap-2"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="btn-submit">
                  {isAdd ? "Add Product" : "Save Changes"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default ProductForm;