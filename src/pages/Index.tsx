import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center px-s4 py-s5">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold tracking-tight leading-tight">
            Stop Missing The Right Jobs.
          </h1>
          <p className="mt-s3 text-lg text-muted-foreground text-prose mx-auto">
            Precision-matched job discovery delivered daily at 9AM.
          </p>
          <div className="mt-s4">
            <Button asChild size="lg">
              <Link to="/settings">Start Tracking</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
