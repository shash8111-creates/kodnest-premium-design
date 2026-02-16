import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
}

const statusConfig = {
  "not-started": { label: "Not Started", className: "bg-muted text-muted-foreground border-border" },
  "in-progress": { label: "In Progress", className: "bg-warning/15 text-warning border-warning/30" },
  shipped: { label: "Shipped", className: "bg-success/15 text-success border-success/30" },
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  const s = statusConfig[status];

  return (
    <header className="flex items-center justify-between border-b px-s4 py-s2">
      <span className="font-serif text-lg font-semibold tracking-tight">{projectName}</span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge variant="outline" className={s.className}>
        {s.label}
      </Badge>
    </header>
  );
};

export default TopBar;
