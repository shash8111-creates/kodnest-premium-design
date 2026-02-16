import { ClipboardCheck } from "lucide-react";

const Proof = () => (
  <div className="flex flex-col items-center justify-center py-s5 px-s4">
    <div className="rounded-full bg-muted p-s3 mb-s3">
      <ClipboardCheck className="h-8 w-8 text-muted-foreground" />
    </div>
    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-center">
      Proof & Artifacts
    </h1>
    <p className="mt-s1 text-muted-foreground text-base text-center text-prose">
      This section will collect verification artifacts — screenshots, test results, and deployment records.
    </p>
  </div>
);

export default Proof;
