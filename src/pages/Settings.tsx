import ContextHeader from "@/components/ContextHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const Settings = () => (
  <div className="flex flex-col">
    <ContextHeader
      headline="Preferences"
      subtext="Define what you're looking for. Your daily digest will be built from these inputs."
    />
    <div className="px-s4 py-s4 max-w-2xl w-full mx-auto space-y-s4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Role Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="keywords" className="sr-only">Role keywords</Label>
          <Input id="keywords" placeholder="e.g. Frontend Engineer, React Developer" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Preferred Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="locations" className="sr-only">Preferred locations</Label>
          <Input id="locations" placeholder="e.g. Bangalore, Mumbai, Delhi" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Work Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="remote" className="flex flex-col gap-s2">
            <div className="flex items-center gap-s1">
              <RadioGroupItem value="remote" id="remote" />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center gap-s1">
              <RadioGroupItem value="hybrid" id="hybrid" />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
            <div className="flex items-center gap-s1">
              <RadioGroupItem value="onsite" id="onsite" />
              <Label htmlFor="onsite">Onsite</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Experience Level</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="mid" className="flex flex-col gap-s2">
            <div className="flex items-center gap-s1">
              <RadioGroupItem value="entry" id="entry" />
              <Label htmlFor="entry">Entry Level</Label>
            </div>
            <div className="flex items-center gap-s1">
              <RadioGroupItem value="mid" id="mid" />
              <Label htmlFor="mid">Mid Level</Label>
            </div>
            <div className="flex items-center gap-s1">
              <RadioGroupItem value="senior" id="senior" />
              <Label htmlFor="senior">Senior</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button size="lg" className="w-full">Save Preferences</Button>
    </div>
  </div>
);

export default Settings;
