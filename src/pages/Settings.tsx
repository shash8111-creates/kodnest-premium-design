import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferences, Preferences } from "@/hooks/use-preferences";
import { jobs } from "@/data/jobs";
import { toast } from "@/hooks/use-toast";

const allLocations = Array.from(new Set(jobs.map((j) => j.location))).sort();
const modes: Array<"Remote" | "Hybrid" | "Onsite"> = ["Remote", "Hybrid", "Onsite"];
const experienceLevels = ["Fresher", "0-1", "1-3", "3-5"];

const Settings = () => {
  const { preferences, savePreferences } = usePreferences();
  const navigate = useNavigate();

  const [form, setForm] = useState<Preferences>({ ...preferences });

  const updateField = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleLocation = (loc: string) => {
    updateField(
      "preferredLocations",
      form.preferredLocations.includes(loc)
        ? form.preferredLocations.filter((l) => l !== loc)
        : [...form.preferredLocations, loc]
    );
  };

  const toggleMode = (mode: string) => {
    updateField(
      "preferredMode",
      form.preferredMode.includes(mode)
        ? form.preferredMode.filter((m) => m !== mode)
        : [...form.preferredMode, mode]
    );
  };

  const handleSave = () => {
    savePreferences(form);
    toast({
      title: "Preferences saved",
      description: "Your job matching criteria have been updated.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto py-s4 px-s4">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
        Preferences
      </h1>
      <p className="mt-s1 text-muted-foreground text-prose">
        Define what kind of roles you're looking for. Match scores update automatically.
      </p>

      <div className="mt-s4 space-y-s3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role Keywords</CardTitle>
            <CardDescription>Comma-separated job titles or keywords to match.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g. SDE, Frontend, React Developer"
              value={form.roleKeywords}
              onChange={(e) => updateField("roleKeywords", e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferred Locations</CardTitle>
            <CardDescription>Select all cities you'd consider.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-s2">
              {allLocations.map((loc) => (
                <div key={loc} className="flex items-center gap-1">
                  <Checkbox
                    id={`loc-${loc}`}
                    checked={form.preferredLocations.includes(loc)}
                    onCheckedChange={() => toggleLocation(loc)}
                  />
                  <Label htmlFor={`loc-${loc}`} className="cursor-pointer text-sm">
                    {loc}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Work Mode</CardTitle>
            <CardDescription>Select your preferred work arrangements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-s3">
              {modes.map((mode) => (
                <div key={mode} className="flex items-center gap-1">
                  <Checkbox
                    id={`mode-${mode}`}
                    checked={form.preferredMode.includes(mode)}
                    onCheckedChange={() => toggleMode(mode)}
                  />
                  <Label htmlFor={`mode-${mode}`} className="cursor-pointer text-sm">
                    {mode}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Experience Level</CardTitle>
            <CardDescription>Your current career stage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={form.experienceLevel}
              onValueChange={(v) => updateField("experienceLevel", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {experienceLevels.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl === "Fresher" ? "Fresher" : `${lvl} years`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
            <CardDescription>Comma-separated skills to match against job requirements.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g. React, Java, Python, SQL"
              value={form.skills}
              onChange={(e) => updateField("skills", e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Minimum Match Score</CardTitle>
            <CardDescription>
              Only show jobs scoring at or above this threshold when filtering. Currently: {form.minMatchScore}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[form.minMatchScore]}
              onValueChange={([v]) => updateField("minMatchScore", v)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full" size="lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default Settings;
