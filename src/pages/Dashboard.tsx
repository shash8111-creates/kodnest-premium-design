import ContextHeader from "@/components/ContextHeader";

const Dashboard = () => (
  <div className="flex flex-col">
    <ContextHeader
      headline="Dashboard"
      subtext="Your matched jobs will appear here once tracking begins."
    />
    <div className="flex flex-col items-center justify-center py-s5 px-s4">
      <p className="text-muted-foreground text-center text-prose text-lg">
        No jobs yet. In the next step, you will load a realistic dataset.
      </p>
    </div>
  </div>
);

export default Dashboard;
