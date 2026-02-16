import ContextHeader from "@/components/ContextHeader";
import { Bookmark } from "lucide-react";

const Saved = () => (
  <div className="flex flex-col">
    <ContextHeader
      headline="Saved"
      subtext="Jobs you've bookmarked for later review."
    />
    <div className="flex flex-col items-center justify-center py-s5 px-s4">
      <Bookmark className="h-10 w-10 text-muted-foreground/40 mb-s2" />
      <p className="text-muted-foreground text-center text-prose text-lg">
        Nothing saved yet. Bookmark jobs from the dashboard to see them here.
      </p>
    </div>
  </div>
);

export default Saved;
