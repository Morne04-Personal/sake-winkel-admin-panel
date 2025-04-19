
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CrudDialogProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CrudDialog = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: CrudDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-sakewinkel-navy">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sakewinkel-slate text-base mt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrudDialog;
