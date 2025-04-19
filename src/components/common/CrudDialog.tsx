
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
  size?: "default" | "large";
}

const CrudDialog = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  size = "default",
}: CrudDialogProps) => {
  const maxWidthClass = size === "large" ? "max-w-5xl" : "max-w-4xl";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${maxWidthClass} p-6 bg-white shadow-xl`}>
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
        <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrudDialog;
