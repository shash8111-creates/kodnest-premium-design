import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const checklistItems = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deploy", label: "Deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="border-t px-s4 py-s3">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-s2">Proof Checklist</p>
      <div className="flex flex-wrap gap-s4">
        {checklistItems.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-s1 text-sm cursor-pointer select-none"
          >
            <Checkbox
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className={checked[item.id] ? "text-foreground" : "text-muted-foreground"}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
