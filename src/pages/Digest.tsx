import ContextHeader from "@/components/ContextHeader";
import { Mail } from "lucide-react";

const Digest = () => (
  <div className="flex flex-col">
    <ContextHeader
      headline="Digest"
      subtext="Your daily curated job summary, delivered at 9AM."
    />
    <div className="flex flex-col items-center justify-center py-s5 px-s4">
      <Mail className="h-10 w-10 text-muted-foreground/40 mb-s2" />
      <p className="text-muted-foreground text-center text-prose text-lg">
        No digests yet. Once tracking begins, your first digest will appear here.
      </p>
    </div>
  </div>
);

export default Digest;
