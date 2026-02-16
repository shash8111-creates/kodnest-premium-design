import { ClipboardCheck, RotateCcw, Info, ShieldCheck, AlertTriangle, Copy, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/use-test-checklist";
import { useSubmission, isValidUrl } from "@/hooks/use-submission";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";

const STEPS = [
  "Project Setup & Routing",
  "Data Layer (Mock Jobs)",
  "Preference System",
  "Match Scoring Engine",
  "Job Dashboard & Filters",
  "Daily Digest Engine",
  "Status Tracking & Notifications",
  "Test Checklist & Proof",
];

const Proof = () => {
  const { checked, toggle, reset, passedCount, allPassed, totalCount } = useTestChecklist();
  const { links, updateLink, allLinksValid } = useSubmission();
  const { toast } = useToast();

  const shipStatus: "not-started" | "in-progress" | "shipped" = useMemo(() => {
    if (allPassed && allLinksValid) return "shipped";
    if (passedCount > 0 || allLinksValid) return "in-progress";
    return "not-started";
  }, [allPassed, allLinksValid, passedCount]);

  const statusConfig = {
    "not-started": { label: "Not Started", className: "bg-muted text-muted-foreground" },
    "in-progress": { label: "In Progress", className: "bg-warning/15 text-warning" },
    shipped: { label: "Shipped", className: "bg-success/15 text-success" },
  };

  const s = statusConfig[shipStatus];

  const handleCopySubmission = () => {
    const text = `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovableUrl}

GitHub Repository:
${links.githubUrl}

Live Deployment:
${links.deployedUrl}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;

    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Submission copied to clipboard" });
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-s4 px-s4">
      <div className="flex items-center justify-between mb-s1">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
          Proof & Submission
        </h1>
        <Badge variant="outline" className={s.className}>
          {s.label}
        </Badge>
      </div>
      <p className="text-muted-foreground text-prose">
        Project 1 — Job Notification Tracker
      </p>

      {/* Shipped confirmation */}
      {shipStatus === "shipped" && (
        <Card className="mt-s3 border-success/30">
          <CardContent className="flex items-center gap-s2 p-s3">
            <ShieldCheck className="h-5 w-5 text-success shrink-0" />
            <span className="text-sm font-medium text-success">
              Project 1 Shipped Successfully.
            </span>
          </CardContent>
        </Card>
      )}

      {/* A) Step Completion Summary */}
      <h2 className="text-xl font-serif font-semibold tracking-tight mt-s4 mb-s2">
        Step Completion Summary
      </h2>
      <Card>
        <CardContent className="p-s3">
          <div className="space-y-s1">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex items-center gap-s2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <span className="text-sm">
                  Step {idx + 1}: {step}
                </span>
                <Badge variant="outline" className="ml-auto bg-success/15 text-success text-xs">
                  Completed
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* B) Artifact Collection */}
      <h2 className="text-xl font-serif font-semibold tracking-tight mt-s4 mb-s2">
        Artifact Links
      </h2>
      <Card>
        <CardContent className="p-s3 space-y-s2">
          {([
            { key: "lovableUrl" as const, label: "Lovable Project Link", placeholder: "https://lovable.dev/projects/..." },
            { key: "githubUrl" as const, label: "GitHub Repository Link", placeholder: "https://github.com/..." },
            { key: "deployedUrl" as const, label: "Deployed URL", placeholder: "https://your-app.vercel.app" },
          ]).map((field) => {
            const value = links[field.key];
            const valid = value.trim() === "" || isValidUrl(value);
            return (
              <div key={field.key}>
                <label className="text-sm font-medium mb-1 block">{field.label}</label>
                <Input
                  value={value}
                  onChange={(e) => updateLink(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={!valid ? "border-destructive" : ""}
                />
                {!valid && (
                  <p className="text-xs text-destructive mt-0.5">Please enter a valid URL.</p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Test Checklist */}
      <div className="flex items-center justify-between mt-s4 mb-s2">
        <h2 className="text-xl font-serif font-semibold tracking-tight">
          Test Checklist
        </h2>
        <div className="flex items-center gap-s2">
          <span className="text-sm text-muted-foreground">
            {passedCount} / {totalCount}
          </span>
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {!allPassed && (
        <p className="text-sm text-warning mb-s2">
          Resolve all issues before shipping.
        </p>
      )}

      <div className="space-y-s1">
        {TEST_ITEMS.map((item, idx) => (
          <label
            key={item.id}
            className="flex items-center gap-s2 rounded-lg border border-border bg-card px-s3 py-s2 cursor-pointer select-none transition-system hover:bg-muted/50"
          >
            <Checkbox
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className={`flex-1 text-sm ${checked[item.id] ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {idx + 1}. {item.label}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-foreground transition-system" onClick={(e) => e.preventDefault()}>
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[240px] text-xs">
                {item.hint}
              </TooltipContent>
            </Tooltip>
          </label>
        ))}
      </div>

      {/* Copy Final Submission */}
      <div className="mt-s4">
        <Button
          onClick={handleCopySubmission}
          disabled={shipStatus !== "shipped"}
          size="lg"
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy Final Submission
        </Button>
        {shipStatus !== "shipped" && (
          <p className="text-xs text-muted-foreground mt-s1">
            Complete all tests and provide all links to enable submission.
          </p>
        )}
      </div>

      <p className="mt-s4 text-xs text-muted-foreground text-center">
        Demo Mode: Checklist is manually verified. Results persist in localStorage.
      </p>
    </div>
  );
};

export default Proof;
