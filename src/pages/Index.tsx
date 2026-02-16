import TopBar from "@/components/TopBar";
import ContextHeader from "@/components/ContextHeader";
import PrimaryWorkspace from "@/components/PrimaryWorkspace";
import SecondaryPanel from "@/components/SecondaryPanel";
import ProofFooter from "@/components/ProofFooter";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        projectName="KodNest Premium"
        currentStep={1}
        totalSteps={6}
        status="in-progress"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="Establish the visual language that every component and page will inherit. Typography, color, spacing, and interaction patterns — defined once, used everywhere."
      />

      <div className="flex flex-1 flex-col md:flex-row">
        <PrimaryWorkspace />
        <SecondaryPanel
          stepTitle="Step 1: Design Tokens"
          stepDescription="Define your color palette, typography scale, and spacing system. These tokens propagate across every component automatically."
          prompt={`Create a premium SaaS design system with:\n- Background: #F7F6F3\n- Primary text: #111111\n- Accent: #8B0000 (deep red)\n- Serif headings, sans-serif body\n- 8px spacing scale`}
        />
      </div>

      <ProofFooter />
    </div>
  );
};

export default Index;
