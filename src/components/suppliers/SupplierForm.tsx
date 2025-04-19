
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
import { Supplier } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Supplier) => void;
  initialData?: Supplier;
  isAdd: boolean;
}

const identificationTypes = ["Company Registration", "VAT Number", "ID Number"];
const bankChoices = ["Standard Bank", "ABSA", "FNB", "Nedbank", "Capitec", "Other"];

const supplierSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  trading_as: z.string().optional().nullable(),
  entity_type: z.string().optional().nullable(),
  identification_type: z.string().min(1, "Identification type is required"),
  identification_number: z.string().min(1, "Identification number is required"),
  is_vat_exempt: z.boolean(),
  vat_exemption_proof_url: z.string().optional().nullable(),
  is_vat_registered: z.boolean(),
  vat_number: z.string().optional().nullable(),
  industry_sector: z.string().optional().nullable(),
  cluster_grouping: z.string().optional().nullable(),
  zone: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  comments: z.string().optional().nullable(),
  logo_url: z.string().optional().nullable(),
  settlement_bank_choice: z.string().min(1, "Bank choice is required"),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).refine(
  (data) => {
    return !data.is_vat_registered || (data.is_vat_registered && data.vat_number);
  },
  {
    message: "VAT number is required if VAT registered",
    path: ["vat_number"],
  }
);

type SupplierFormValues = z.infer<typeof supplierSchema>;

const SupplierForm = ({ isOpen, onClose, onSave, initialData, isAdd }: SupplierFormProps) => {
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: initialData || {
      name: "",
      trading_as: null,
      entity_type: null,
      identification_type: "Company Registration",
      identification_number: "",
      is_vat_exempt: false,
      vat_exemption_proof_url: null,
      is_vat_registered: false,
      vat_number: null,
      industry_sector: null,
      cluster_grouping: null,
      zone: null,
      description: null,
      comments: null,
      logo_url: null,
      settlement_bank_choice: "",
    },
  });

  const watchIsVatRegistered = form.watch("is_vat_registered");

  const handleSubmit = (values: SupplierFormValues) => {
    onSave(values as Supplier);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add Supplier" : "Edit Supplier"}
      description={isAdd ? "Add a new supplier to the system" : "Edit supplier details"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Registered company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trading_as"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trading As</FormLabel>
                <FormControl>
                  <Input placeholder="Trading name (if different)" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="identification_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {identificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
              name="identification_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Registration/ID number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="is_vat_registered"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    VAT Registered
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchIsVatRegistered && (
              <FormField
                control={form.control}
                name="vat_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VAT Number</FormLabel>
                    <FormControl>
                      <Input placeholder="VAT number" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="is_vat_exempt"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  VAT Exempt
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry_sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Sector</FormLabel>
                <FormControl>
                  <Input placeholder="Industry sector" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone/Region</FormLabel>
                  <FormControl>
                    <Input placeholder="Geographical zone" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cluster_grouping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cluster/Grouping</FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier group" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Supplier description" 
                    rows={2}
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="URL to company logo" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="settlement_bank_choice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Settlement Bank</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bankChoices.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
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
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional comments" 
                    rows={2}
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-sakewinkel-navy">
              {isAdd ? "Add Supplier" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default SupplierForm;
