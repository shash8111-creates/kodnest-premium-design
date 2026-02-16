import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { usePreferences } from "@/hooks/use-preferences";
import { useJobStatus } from "@/hooks/use-job-status";
import { computeMatchScore, getScoreTier } from "@/lib/match-score";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import FilterBar, { Filters } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Briefcase, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
  status: "all",
};

const locations = Array.from(new Set(jobs.map((j) => j.location))).sort();

function extractSalaryNumber(salary: string): number {
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [matchOnly, setMatchOnly] = useState(false);
  const { isSaved, toggleSave } = useSavedJobs();
  const { preferences, hasPreferences } = usePreferences();
  const { getStatus, setStatus } = useJobStatus();
  const { toast } = useToast();

  const handleStatusChange = (jobId: number, status: import("@/hooks/use-job-status").JobStatus) => {
    setStatus(jobId, status);
    if (status !== "Not Applied") {
      toast({ title: `Status updated: ${status}` });
    }
  };

  const scoredJobs = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: hasPreferences ? computeMatchScore(job, preferences) : 0,
    }));
  }, [preferences, hasPreferences]);

  const filtered = useMemo(() => {
    let result = [...scoredJobs];

    if (matchOnly && hasPreferences) {
      result = result.filter((s) => s.matchScore >= preferences.minMatchScore);
    }

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (s) =>
          s.job.title.toLowerCase().includes(kw) ||
          s.job.company.toLowerCase().includes(kw)
      );
    }
    if (filters.location !== "all") {
      result = result.filter((s) => s.job.location === filters.location);
    }
    if (filters.mode !== "all") {
      result = result.filter((s) => s.job.mode === filters.mode);
    }
    if (filters.experience !== "all") {
      result = result.filter((s) => s.job.experience === filters.experience);
    }
    if (filters.source !== "all") {
      result = result.filter((s) => s.job.source === filters.source);
    }
    if (filters.status !== "all") {
      result = result.filter((s) => getStatus(s.job.id) === filters.status);
    }

    if (filters.sort === "latest") {
      result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
    } else if (filters.sort === "oldest") {
      result.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
    } else if (filters.sort === "matchScore") {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sort === "salary") {
      result.sort((a, b) => extractSalaryNumber(b.job.salaryRange) - extractSalaryNumber(a.job.salaryRange));
    } else if (filters.sort === "company") {
      result.sort((a, b) => a.job.company.localeCompare(b.job.company));
    }

    return result;
  }, [scoredJobs, filters, matchOnly, hasPreferences, preferences.minMatchScore, getStatus]);

  return (
    <div className="max-w-4xl mx-auto py-s4 px-s4">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        Dashboard
      </h1>
      <p className="mt-s1 text-muted-foreground text-prose">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      {!hasPreferences && (
        <div className="mt-s3 border border-border rounded-lg p-s3 flex items-center justify-between gap-s2 bg-card">
          <div>
            <p className="text-sm font-medium">Set your preferences to activate intelligent matching.</p>
            <p className="text-xs text-muted-foreground mt-1">Match scores will appear on each job card once configured.</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-1" />
              Preferences
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-s3">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          locations={locations}
          showMatchToggle={true}
          matchOnly={matchOnly}
          onMatchOnlyChange={setMatchOnly}
          hasPreferences={hasPreferences}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-s5">
          <div className="rounded-full bg-muted p-s3 mb-s3">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-serif font-semibold tracking-tight text-center">
            No roles match your criteria.
          </h2>
          <p className="mt-s1 text-muted-foreground text-base text-center text-prose">
            Adjust filters or lower your match threshold in preferences.
          </p>
        </div>
      ) : (
        <div className="mt-s3 space-y-s2">
          {filtered.map(({ job, matchScore }) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={toggleSave}
              onView={setViewJob}
              matchScore={hasPreferences ? matchScore : undefined}
              scoreTier={hasPreferences ? getScoreTier(matchScore) : undefined}
              status={getStatus(job.id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      />
    </div>
  );
};

export default Dashboard;
