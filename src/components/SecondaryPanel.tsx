import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  prompt: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, prompt }: SecondaryPanelProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="flex flex-col gap-s3 border-l p-s3">
      <div>
        <h3 className="font-serif text-lg font-semibold">{stepTitle}</h3>
        <p className="mt-s1 text-sm text-muted-foreground leading-relaxed">{stepDescription}</p>
      </div>

      <div className="rounded-md border bg-muted/50 p-s2">
        <p className="text-sm font-mono leading-relaxed whitespace-pre-wrap">{prompt}</p>
      </div>

      <div className="flex flex-col gap-s1">
        <Button variant="default" size="sm" onClick={handleCopy}>
          {copied ? <Check className="mr-1" /> : <Copy className="mr-1" />}
          {copied ? "Copied" : "Copy Prompt"}
        </Button>
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-1" />
          Build in Lovable
        </Button>
        <Button variant="success" size="sm">
          <Check className="mr-1" />
          It Worked
        </Button>
        <Button variant="outline" size="sm">
          <AlertCircle className="mr-1" />
          Error
        </Button>
        <Button variant="outline" size="sm">
          <Camera className="mr-1" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
