import { useState, useMemo } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import FilterBar, { Filters } from "@/components/FilterBar";
import { Briefcase } from "lucide-react";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

const locations = Array.from(new Set(jobs.map((j) => j.location))).sort();

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const { isSaved, toggleSave } = useSavedJobs();

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw)
      );
    }
    if (filters.location !== "all") {
      result = result.filter((j) => j.location === filters.location);
    }
    if (filters.mode !== "all") {
      result = result.filter((j) => j.mode === filters.mode);
    }
    if (filters.experience !== "all") {
      result = result.filter((j) => j.experience === filters.experience);
    }
    if (filters.source !== "all") {
      result = result.filter((j) => j.source === filters.source);
    }

    if (filters.sort === "latest") {
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else if (filters.sort === "oldest") {
      result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    } else if (filters.sort === "company") {
      result.sort((a, b) => a.company.localeCompare(b.company));
    }

    return result;
  }, [filters]);

  return (
    <div className="max-w-4xl mx-auto py-s4 px-s4">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        Dashboard
      </h1>
      <p className="mt-s1 text-muted-foreground text-prose">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-s3">
        <FilterBar filters={filters} onChange={setFilters} locations={locations} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-s5">
          <div className="rounded-full bg-muted p-s3 mb-s3">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-serif font-semibold tracking-tight text-center">
            No matching jobs.
          </h2>
          <p className="mt-s1 text-muted-foreground text-base text-center text-prose">
            Try adjusting your filters to see more results.
          </p>
        </div>
      ) : (
        <div className="mt-s3 space-y-s2">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={toggleSave}
              onView={setViewJob}
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
