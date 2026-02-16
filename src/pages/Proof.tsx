import { ClipboardCheck, RotateCcw, Info, ShieldCheck, AlertTriangle } from "lucide-react";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/use-test-checklist";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

const Proof = () => {
  const { checked, toggle, reset, passedCount, allPassed, totalCount } = useTestChecklist();

  return (
    <div className="max-w-2xl mx-auto py-s4 px-s4">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        Proof & Verification
      </h1>
      <p className="mt-s1 text-muted-foreground text-prose">
        Complete every check before shipping.
      </p>

      {/* Summary */}
      <Card className="mt-s3">
        <CardContent className="flex items-center justify-between p-s3">
          <div className="flex items-center gap-s2">
            {allPassed ? (
              <ShieldCheck className="h-5 w-5 text-success" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-warning" />
            )}
            <span className="text-lg font-medium">
              Tests Passed: {passedCount} / {totalCount}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </CardContent>
      </Card>

      {!allPassed && (
        <p className="mt-s2 text-sm text-warning">
          Resolve all issues before shipping.
        </p>
      )}

      {/* Checklist */}
      <div className="mt-s3 space-y-s1">
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

      <p className="mt-s4 text-xs text-muted-foreground text-center">
        Demo Mode: Checklist is manually verified. Results persist in localStorage.
      </p>
    </div>
  );
};

export default Proof;
