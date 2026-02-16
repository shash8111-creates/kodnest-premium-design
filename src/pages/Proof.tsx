import ContextHeader from "@/components/ContextHeader";
import { ClipboardCheck } from "lucide-react";

const Proof = () => (
  <div className="flex flex-col">
    <ContextHeader
      headline="Proof"
      subtext="Collect and verify build artifacts as you complete each step."
    />
    <div className="flex flex-col items-center justify-center py-s5 px-s4">
      <ClipboardCheck className="h-10 w-10 text-muted-foreground/40 mb-s2" />
      <p className="text-muted-foreground text-center text-prose text-lg">
        No artifacts collected yet. Complete build steps to generate proof.
      </p>
    </div>
  </div>
);

export default Proof;
