interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
  <div className="flex flex-col items-center justify-center py-s5 px-s4">
    <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-s2">
      {title}
    </h1>
    <p className="text-muted-foreground text-base text-center text-prose">
      This section will be built in the next step.
    </p>
  </div>
);

export default PlaceholderPage;
