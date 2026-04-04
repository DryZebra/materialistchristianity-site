export default function TheFinalBeam() {
  return (
    <footer className="w-full bg-coal text-bone p-16 md:p-48 flex flex-col items-center justify-center space-y-16">
      <div className="w-px h-24 md:h-48 bg-signal-red"></div>
      <div className="max-w-4xl text-center space-y-12">
        <h2 className="text-6xl md:text-9xl leading-none uppercase">
          The Final<br />Beam
        </h2>
        <p className="text-xl md:text-3xl italic opacity-50 max-w-2xl mx-auto">
          Faith is what survives betrayal. It is the continuation of goodness in the absence of reward.
        </p>
        <div className="pt-12">
          <button className="bg-signal-red text-white text-2xl md:text-4xl px-12 py-6 uppercase font-black hover:scale-110 transition-transform duration-300 shadow-2xl">
            Purchase the Book
          </button>
          <div className="mt-8 flex justify-center gap-8 opacity-40 uppercase tracking-widest text-sm font-mono">
            <span>Hardcover</span>
            <span>Digital</span>
            <span>Audio</span>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-bone opacity-10 mt-24"></div>
      <div className="pt-8 text-xs font-mono opacity-30 uppercase tracking-tighter">
        © 2026 Materialist Christianity Press | Ezra Byrd | No Commandment, Only Consequence.
      </div>
    </footer>
  );
}
