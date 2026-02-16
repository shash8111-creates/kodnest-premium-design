import { useState } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobStatus } from "@/hooks/use-job-status";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Saved = () => {
  const { savedIds, isSaved, toggleSave } = useSavedJobs();
  const { getStatus, setStatus } = useJobStatus();
  const { toast } = useToast();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const handleStatusChange = (jobId: number, status: import("@/hooks/use-job-status").JobStatus) => {
    setStatus(jobId, status);
    if (status !== "Not Applied") {
      toast({ title: `Status updated: ${status}` });
    }
  };

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  if (savedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-s5 px-s4">
        <div className="rounded-full bg-muted p-s3 mb-s3">
          <Bookmark className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-center">
          No saved jobs yet.
        </h1>
        <p className="mt-s1 text-muted-foreground text-base text-center text-prose">
          Jobs you bookmark will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-s4 px-s4">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        Saved Jobs
      </h1>
      <p className="mt-s1 text-muted-foreground text-prose">
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-s3 space-y-s2">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
            status={getStatus(job.id)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      />
    </div>
  );
};

export default Saved;
