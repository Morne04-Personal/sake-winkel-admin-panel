
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ActionButton = ({ onClick, icon: Icon, label, variant = "ghost" }: ActionButtonProps) => (
  <Button
    variant={variant}
    size="sm"
    onClick={onClick}
    className="h-8 w-8 p-0"
  >
    <Icon className="h-4 w-4" />
    <span className="sr-only">{label}</span>
  </Button>
);

export default ActionButton;
