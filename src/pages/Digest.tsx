import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { jobs } from "@/data/jobs";
import { usePreferences } from "@/hooks/use-preferences";
import { computeMatchScore, getScoreTier, ScoreTier } from "@/lib/match-score";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Copy, Settings, ExternalLink, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DIGEST_KEY_PREFIX = "jobTrackerDigest_";

interface DigestEntry {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  matchScore: number;
  applyUrl: string;
}

interface StoredDigest {
  date: string;
  entries: DigestEntry[];
  generatedAt: string;
}

function getTodayKey(): string {
  return format(new Date(), "yyyy-MM-dd");
}

function loadDigest(dateKey: string): StoredDigest | null {
  try {
    const raw = localStorage.getItem(DIGEST_KEY_PREFIX + dateKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDigest(digest: StoredDigest): void {
  localStorage.setItem(DIGEST_KEY_PREFIX + digest.date, JSON.stringify(digest));
}

const tierStyles: Record<ScoreTier, string> = {
  excellent: "bg-success text-success-foreground",
  good: "bg-warning text-warning-foreground",
  fair: "bg-secondary text-secondary-foreground",
  low: "bg-muted text-muted-foreground",
};

function digestToPlainText(digest: StoredDigest): string {
  const lines = [
    `Top 10 Jobs For You — 9AM Digest`,
    `Date: ${format(new Date(digest.date), "MMMM d, yyyy")}`,
    "",
  ];
  digest.entries.forEach((entry, i) => {
    lines.push(`${i + 1}. ${entry.title} at ${entry.company}`);
    lines.push(`   Location: ${entry.location} | Experience: ${entry.experience}`);
    lines.push(`   Match Score: ${entry.matchScore}%`);
    lines.push(`   Apply: ${entry.applyUrl}`);
    lines.push("");
  });
  lines.push("This digest was generated based on your preferences.");
  return lines.join("\n");
}

const Digest = () => {
  const { preferences, hasPreferences } = usePreferences();
  const { toast } = useToast();
  const todayKey = getTodayKey();
  const [digest, setDigest] = useState<StoredDigest | null>(() => loadDigest(todayKey));

  const generateDigest = useCallback(() => {
    // Check if already exists
    const existing = loadDigest(todayKey);
    if (existing) {
      setDigest(existing);
      toast({ title: "Digest already exists for today", description: "Loaded your existing digest." });
      return;
    }

    const scored = jobs
      .map((job) => ({
        job,
        matchScore: computeMatchScore(job, preferences),
      }))
      .filter((s) => s.matchScore >= preferences.minMatchScore)
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
        return a.job.postedDaysAgo - b.job.postedDaysAgo;
      })
      .slice(0, 10);

    const newDigest: StoredDigest = {
      date: todayKey,
      entries: scored.map((s) => ({
        id: s.job.id,
        title: s.job.title,
        company: s.job.company,
        location: s.job.location,
        experience: s.job.experience,
        matchScore: s.matchScore,
        applyUrl: s.job.applyUrl,
      })),
      generatedAt: new Date().toISOString(),
    };

    saveDigest(newDigest);
    setDigest(newDigest);
    toast({ title: "Digest generated", description: `${newDigest.entries.length} matching jobs found.` });
  }, [preferences, todayKey, toast]);

  const handleCopy = useCallback(() => {
    if (!digest) return;
    navigator.clipboard.writeText(digestToPlainText(digest)).then(() => {
      toast({ title: "Copied to clipboard" });
    });
  }, [digest, toast]);

  const handleEmailDraft = useCallback(() => {
    if (!digest) return;
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(digestToPlainText(digest));
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  }, [digest]);

  // No preferences state
  if (!hasPreferences) {
    return (
      <div className="max-w-4xl mx-auto py-s4 px-s4">
        <div className="flex flex-col items-center justify-center py-s5">
          <div className="rounded-full bg-muted p-s3 mb-s3">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-center">
            Set preferences to generate a personalized digest.
          </h1>
          <p className="mt-s1 text-muted-foreground text-base text-center text-prose">
            Your daily job summary requires matching preferences to be configured first.
          </p>
          <Button variant="outline" size="lg" className="mt-s3" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-1" />
              Go to Preferences
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-s4 px-s4">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        Daily Digest
      </h1>
      <p className="mt-s1 text-muted-foreground text-prose">
        Your personalized job summary, delivered at 9AM.
      </p>

      {/* Generate button */}
      {!digest && (
        <div className="mt-s3">
          <Button size="lg" onClick={generateDigest}>
            Generate Today's 9AM Digest (Simulated)
          </Button>
        </div>
      )}

      {/* Digest content */}
      {digest && (
        <div className="mt-s3">
          {/* Email-style card */}
          <Card className="bg-white border">
            <CardContent className="p-s4">
              {/* Header */}
              <div className="border-b border-border pb-s3 mb-s3">
                <h2 className="text-2xl font-serif font-semibold tracking-tight">
                  Top 10 Jobs For You — 9AM Digest
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(new Date(digest.date), "EEEE, MMMM d, yyyy")}
                </p>
              </div>

              {/* Jobs list */}
              {digest.entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-s4">
                  <div className="rounded-full bg-muted p-s3 mb-s3">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-center">
                    No matching roles today.
                  </h3>
                  <p className="mt-s1 text-muted-foreground text-sm text-center">
                    Check again tomorrow or adjust your preferences.
                  </p>
                </div>
              ) : (
                <div className="space-y-s2">
                  {digest.entries.map((entry, i) => {
                    const tier = getScoreTier(entry.matchScore);
                    return (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between gap-s2 py-s2 border-b border-border last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-s1 flex-wrap">
                            <span className="text-xs text-muted-foreground font-medium">
                              {i + 1}.
                            </span>
                            <h4 className="font-serif font-semibold text-base truncate">
                              {entry.title}
                            </h4>
                            <Badge className={`${tierStyles[tier]} text-xs`}>
                              {entry.matchScore}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {entry.company} · {entry.location} · {entry.experience === "Fresher" ? "Fresher" : `${entry.experience} yrs`}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={entry.applyUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            Apply
                          </a>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-border mt-s3 pt-s3">
                <p className="text-xs text-muted-foreground text-center">
                  This digest was generated based on your preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex items-center gap-s2 mt-s3">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-1" />
              Copy Digest to Clipboard
            </Button>
            <Button variant="outline" onClick={handleEmailDraft}>
              <Mail className="h-4 w-4 mr-1" />
              Create Email Draft
            </Button>
          </div>

          {/* Regenerate */}
          <div className="mt-s2">
            <Button variant="ghost" size="sm" onClick={generateDigest}>
              <Clock className="h-3.5 w-3.5 mr-1" />
              Regenerate
            </Button>
          </div>

          {/* Simulation note */}
          <p className="mt-s3 text-xs text-muted-foreground text-center italic">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      )}
    </div>
  );
};

export default Digest;
