import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const Settings = () => (
  <div className="max-w-2xl mx-auto py-s4 px-s4">
    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
      Preferences
    </h1>
    <p className="mt-s1 text-muted-foreground text-prose">
      Define what kind of roles you're looking for. Matching logic will be added in the next step.
    </p>

    <div className="mt-s4 space-y-s3">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Keywords</CardTitle>
          <CardDescription>Enter job titles or keywords you're targeting.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="e.g. Frontend Engineer, Product Designer" disabled />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preferred Locations</CardTitle>
          <CardDescription>Cities or regions you'd consider working in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="e.g. Bangalore, Remote, San Francisco" disabled />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Work Mode</CardTitle>
          <CardDescription>Select your preferred work arrangement.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup disabled defaultValue="remote" className="flex flex-col gap-s1">
            {["Remote", "Hybrid", "Onsite"].map((mode) => (
              <div key={mode} className="flex items-center gap-s1">
                <RadioGroupItem value={mode.toLowerCase()} id={mode.toLowerCase()} />
                <Label htmlFor={mode.toLowerCase()} className="cursor-pointer">{mode}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Experience Level</CardTitle>
          <CardDescription>Your current career stage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="e.g. Junior, Mid, Senior" disabled />
        </CardContent>
      </Card>

      <Button disabled className="w-full" size="lg">
        Save Preferences
      </Button>
    </div>
  </div>
);

export default Settings;
