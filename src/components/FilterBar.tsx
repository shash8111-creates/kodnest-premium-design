import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
  status: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  locations: string[];
  showMatchToggle?: boolean;
  matchOnly?: boolean;
  onMatchOnlyChange?: (value: boolean) => void;
  hasPreferences?: boolean;
}

const FilterBar = ({
  filters,
  onChange,
  locations,
  showMatchToggle,
  matchOnly,
  onMatchOnlyChange,
  hasPreferences,
}: FilterBarProps) => {
  const update = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-s2">
      <div className="flex flex-col gap-s2 md:flex-row md:flex-wrap md:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search title or company…"
            value={filters.keyword}
            onChange={(e) => update("keyword", e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={filters.location} onValueChange={(v) => update("location", v)}>
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.mode} onValueChange={(v) => update("mode", v)}>
          <SelectTrigger className="w-full md:w-[140px]">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.experience} onValueChange={(v) => update("experience", v)}>
          <SelectTrigger className="w-full md:w-[140px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Fresher">Fresher</SelectItem>
            <SelectItem value="0-1">0-1 yrs</SelectItem>
            <SelectItem value="1-3">1-3 yrs</SelectItem>
            <SelectItem value="3-5">3-5 yrs</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.source} onValueChange={(v) => update("source", v)}>
          <SelectTrigger className="w-full md:w-[140px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Naukri">Naukri</SelectItem>
            <SelectItem value="Indeed">Indeed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(v) => update("status", v)}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Not Applied">Not Applied</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Selected">Selected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sort} onValueChange={(v) => update("sort", v)}>
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="matchScore">Match Score</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
            <SelectItem value="company">Company A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showMatchToggle && hasPreferences && (
        <div className="flex items-center gap-s1">
          <Switch
            id="match-toggle"
            checked={matchOnly}
            onCheckedChange={onMatchOnlyChange}
          />
          <Label htmlFor="match-toggle" className="text-sm cursor-pointer">
            Show only jobs above my threshold
          </Label>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
