
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
import { Event } from "@/types";
import CrudDialog from "@/components/common/CrudDialog";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  initialData?: Event;
  isAdd: boolean;
}

const eventSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable(),
  short_description: z.string().nullable(),
  start_date: z.string().nullable(),
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

const EventForm = ({ isOpen, onClose, onSave, initialData, isAdd }: EventFormProps) => {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                    rows={3}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-sakewinkel-navy">
              {isAdd ? "Add Event" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </CrudDialog>
  );
};

export default EventForm;
