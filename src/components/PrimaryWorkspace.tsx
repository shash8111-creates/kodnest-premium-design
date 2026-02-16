import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PrimaryWorkspace = () => (
  <section className="flex-1 p-s4 space-y-s3">
    {/* Example card — workspace content */}
    <Card className="border shadow-none">
      <CardHeader className="pb-s2">
        <CardTitle className="font-serif text-xl">Component Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-s3">
        <p className="text-sm text-muted-foreground text-prose">
          This workspace area is where primary interaction happens. Clean cards, predictable components, no crowding.
        </p>

        {/* Input example */}
        <div className="space-y-s1">
          <Label htmlFor="demo-input">Project Name</Label>
          <Input id="demo-input" placeholder="Enter project name" className="max-w-sm" />
        </div>

        {/* Button row */}
        <div className="flex gap-s2 flex-wrap">
          <Button variant="default">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        {/* Status badges row */}
        <div className="flex gap-s2 flex-wrap">
          <Button variant="success" size="sm">Success State</Button>
          <Button variant="warning" size="sm">Warning State</Button>
          <Button variant="destructive" size="sm">Error State</Button>
        </div>
      </CardContent>
    </Card>

    {/* Empty state example */}
    <Card className="border shadow-none">
      <CardContent className="py-s5 text-center">
        <p className="text-muted-foreground mb-s2">No builds yet. Start your first build to see results here.</p>
        <Button variant="default">Start Building</Button>
      </CardContent>
    </Card>

    {/* Error state example */}
    <Card className="border border-destructive/30 shadow-none">
      <CardContent className="py-s3">
        <p className="text-sm font-medium text-destructive mb-s1">Build failed: Missing environment variable</p>
        <p className="text-sm text-muted-foreground">
          Add <code className="bg-muted px-1 py-0.5 rounded text-xs">DATABASE_URL</code> to your project settings, then retry the build.
        </p>
      </CardContent>
    </Card>
  </section>
);

export default PrimaryWorkspace;
