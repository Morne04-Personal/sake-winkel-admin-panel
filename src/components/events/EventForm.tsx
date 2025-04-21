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
import { Event } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  initialData?: Event;
  isAdd: boolean;
}

const eventSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required").nullable(),
  short_description: z.string().nullable(),
  start_date: z.string().min(1, "Start date is required").nullable(),
  end_date: z.string().nullable(),
  city: z.string().nullable(),
  address: z.string().nullable(),
  venue_name: z.string().nullable(),
  original_price: z.union([z.coerce.number().positive().optional().nullable(), z.literal("")])
    .transform(val => val === "" ? null : val),
  sale_price: z.union([z.coerce.number().positive().optional().nullable(), z.literal("")])
    .transform(val => val === "" ? null : val),
  ticket_url: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  logo_url: z.string().nullable(),
  is_featured: z.boolean().nullable().default(false),
  created_at: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

type FormStep = {
  title: string;
  fields: (keyof EventFormValues)[];
};

const EventForm = ({ isOpen, onClose, onSave, initialData, isAdd }: EventFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  const formSteps: FormStep[] = [
    {
      title: "Event Details",
      fields: ["name", "short_description"]
    },
    {
      title: "Date & Location",
      fields: ["start_date", "end_date", "city", "venue_name", "address"]
    },
    {
      title: "Tickets & Media",
      fields: ["original_price", "sale_price", "ticket_url", "thumbnail_url", "logo_url", "is_featured"]
    }
  ];

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      name: "",
      short_description: "",
      start_date: "",
      end_date: "",
      city: "",
      address: "",
      venue_name: "",
      original_price: null,
      sale_price: null,
      ticket_url: "",
      thumbnail_url: "",
      logo_url: "",
      is_featured: false,
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

  const handleSubmit = (values: EventFormValues) => {
    onSave(values as Event);
  };

  return (
    <CrudDialog
      title={isAdd ? "Add Event" : "Edit Event"}
      description={isAdd ? "Create a new event" : "Edit event details"}
      isOpen={isOpen}
      onClose={onClose}
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
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Event name" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="short_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief event description" 
                        rows={4}
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

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="form-grid-2">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="form-grid-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City name" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="venue_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <FormControl>
                        <Input placeholder="Venue name" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Event address" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="form-grid-2">
                <FormField
                  control={form.control}
                  name="original_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Price (R)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="Regular price" 
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
                  name="sale_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price (R) (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="Discounted price"
                          {...field}
                          value={field.value === null ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="ticket_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Link to buy tickets" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="form-grid-2">
                <FormField
                  control={form.control}
                  name="thumbnail_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Thumbnail image link" {...field} value={field.value || ''} />
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
                        <Input placeholder="Logo image link" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Feature on homepage
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
                  {isAdd ? "Add Event" : "Save Changes"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default EventForm;