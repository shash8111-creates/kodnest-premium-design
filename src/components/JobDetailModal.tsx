import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, MapPin } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-sm">
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-s2">
          <div className="flex items-center gap-s1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{job.location}</span>
            <span>·</span>
            <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
            <span>·</span>
            <span>{job.salaryRange}</span>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </div>

          <Button asChild className="w-full" size="lg">
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Apply Now
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
