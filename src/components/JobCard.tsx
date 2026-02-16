import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, BookmarkCheck, ExternalLink, Eye, MapPin, Clock } from "lucide-react";
import { ScoreTier } from "@/lib/match-score";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onView: (job: Job) => void;
  matchScore?: number;
  scoreTier?: ScoreTier;
}

function formatPostedAgo(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const sourceBg: Record<string, string> = {
  LinkedIn: "bg-accent text-accent-foreground",
  Naukri: "bg-secondary text-secondary-foreground",
  Indeed: "bg-muted text-muted-foreground",
};

const tierStyles: Record<ScoreTier, string> = {
  excellent: "bg-success text-success-foreground",
  good: "bg-warning text-warning-foreground",
  fair: "bg-secondary text-secondary-foreground",
  low: "bg-muted text-muted-foreground",
};

const JobCard = ({ job, isSaved, onToggleSave, onView, matchScore, scoreTier }: JobCardProps) => (
  <Card className="transition-system hover:border-primary/30">
    <CardContent className="p-s3">
      <div className="flex items-start justify-between gap-s2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-s1 flex-wrap">
            <h3 className="font-serif text-lg font-semibold leading-tight truncate">
              {job.title}
            </h3>
            {matchScore !== undefined && scoreTier && (
              <Badge className={`${tierStyles[scoreTier]} text-xs font-medium`}>
                {matchScore}% match
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-1">{job.company}</p>
        </div>
        <Badge variant="outline" className={sourceBg[job.source]}>
          {job.source}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-s1 mt-s2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span>·</span>
        <span>{job.mode}</span>
        <span>·</span>
        <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
      </div>

      <p className="text-sm font-medium mt-s1">{job.salaryRange}</p>

      <div className="flex items-center justify-between mt-s2">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatPostedAgo(job.postedDaysAgo)}
        </span>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onView(job)}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleSave(job.id)}
            className={isSaved ? "text-primary" : ""}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 mr-1" />
            ) : (
              <Bookmark className="h-4 w-4 mr-1" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Apply
            </a>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default JobCard;
