export default function MoralityGrid() {
  const variables = [
    {
      title: "Moral Capital",
      desc: "The stored value of goodness that survived contradiction. It is the currency of the structure."
    },
    {
      title: "Sub-objects",
      desc: "Invisible rules with visible consequences. The behavioral gravity that binds us without command."
    },
    {
      title: "Gmorknicity",
      desc: "The frequency of resonance within a sub-objectual field. The measure of structural alignment."
    }
  ];

  return (
    <section className="w-full bg-ink text-bone b-border-b">
      <div className="p-8 md:p-12 border-b-2 border-bone/20">
        <h2 className="text-3xl md:text-5xl opacity-50">The Variables</h2>
      </div>
      <div className="b-grid border-none">
        {variables.map((v, i) => (
          <div key={i} className="col-span-12 md:col-span-4 b-cell border-bone/20 md:border-r-2 last:border-r-0">
            <h4 className="text-2xl md:text-4xl text-signal-red mb-4">{v.title}</h4>
            <div className="h-px w-12 bg-bone mb-6"></div>
            <p className="text-bone/70 italic leading-snug font-mono">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
