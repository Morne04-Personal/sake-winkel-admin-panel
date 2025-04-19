
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
import { Supplier } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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

type FormStep = {
  title: string;
  fields: (keyof SupplierFormValues)[];
};

const SupplierForm = ({ isOpen, onClose, onSave, initialData, isAdd }: SupplierFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  const formSteps: FormStep[] = [
    {
      title: "Company Info",
      fields: ["name", "trading_as", "entity_type"]
    },
    {
      title: "Identification",
      fields: ["identification_type", "identification_number", "is_vat_registered", "vat_number", "is_vat_exempt"]
    },
    {
      title: "Classification",
      fields: ["industry_sector", "cluster_grouping", "zone", "description", "logo_url", "settlement_bank_choice", "comments"]
    }
  ];

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

  const handleSubmit = (values: SupplierFormValues) => {
    onSave(values as Supplier);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add Supplier" : "Edit Supplier"}
      description={isAdd ? "Add a new supplier to the system" : "Edit supplier details"}
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

              <FormField
                control={form.control}
                name="entity_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Pty Ltd, Sole Proprietor" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="form-grid-2">
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

              <div className="form-grid-2">
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
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
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

              <div className="form-grid-2">
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
                  {isAdd ? "Add Supplier" : "Save Changes"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default SupplierForm;
