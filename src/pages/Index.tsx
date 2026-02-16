import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background px-s4">
    <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-center max-w-2xl">
      Stop Missing The Right Jobs.
    </h1>
    <p className="mt-s2 text-muted-foreground text-lg md:text-xl text-center text-prose">
      Precision-matched job discovery delivered daily at 9AM.
    </p>
    <Button asChild size="lg" className="mt-s4">
      <Link to="/settings">Start Tracking</Link>
    </Button>
  </div>
);

export default Index;
