import { Briefcase } from "lucide-react";

const Dashboard = () => (
  <div className="flex flex-col items-center justify-center py-s5 px-s4">
    <div className="rounded-full bg-muted p-s3 mb-s3">
      <Briefcase className="h-8 w-8 text-muted-foreground" />
    </div>
    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-center">
      No jobs yet.
    </h1>
    <p className="mt-s1 text-muted-foreground text-base text-center text-prose">
      In the next step, you will load a realistic dataset.
    </p>
  </div>
);

export default Dashboard;
