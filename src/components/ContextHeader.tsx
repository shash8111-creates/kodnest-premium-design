interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => (
  <section className="border-b px-s4 py-s4">
    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">{headline}</h1>
    <p className="mt-s1 text-muted-foreground text-prose">{subtext}</p>
  </section>
);

export default ContextHeader;
