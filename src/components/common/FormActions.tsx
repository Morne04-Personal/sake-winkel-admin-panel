
import React from 'react';
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  isSubmitting = false,
  submitLabel = "Save Changes"
}) => {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="w-24"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="w-32 bg-sakewinkel-navy hover:bg-sakewinkel-navy/90"
        disabled={isSubmitting}
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;
