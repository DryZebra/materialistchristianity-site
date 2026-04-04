export default function Disqualification() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-bone text-ink b-border-b">
      <div className="max-w-4xl border-2 border-current p-12 md:p-24 space-y-12">
        <h2 className="text-5xl md:text-8xl leading-none">
          This is not<br />a religion.
        </h2>
        <h2 className="text-5xl md:text-8xl leading-none ml-12 md:ml-24">
          This is not<br />a theory.
        </h2>
        <div className="h-2 w-full bg-signal-red"></div>
        <p className="text-2xl md:text-4xl uppercase font-bold leading-tight">
          Wait, what the fuck is this?<br />
          <span className="opacity-60 text-xl md:text-2xl font-normal lowercase italic mt-4 block">
            It is the forensic analysis of why you are still standing.
          </span>
        </p>
      </div>
    </section>
  );
}
