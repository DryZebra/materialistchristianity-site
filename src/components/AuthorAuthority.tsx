export default function AuthorAuthority() {
  return (
    <section className="w-full bg-bone text-ink b-border-b flex flex-col md:flex-row min-h-[60vh]">
      <div className="flex-1 p-8 md:p-24 border-b-2 md:border-b-0 md:border-r-2 border-current">
        <h2 className="text-4xl md:text-7xl mb-8 uppercase">Ezra Byrd</h2>
        <div className="w-16 h-px bg-current mb-8"></div>
        <p className="text-lg md:text-2xl italic leading-relaxed">
          "Materialist Christianity was not born in a classroom. It was discovered in motion, through labor, love, rupture, and the long effort to make sense of a world in contradiction."
        </p>
      </div>
      <div className="flex-1 p-8 md:p-24 bg-white flex flex-col justify-center">
        <h3 className="text-xl md:text-3xl mb-6 uppercase tracking-tighter">The Forensics of Survival</h3>
        <p className="text-md md:text-xl text-ink/70 mb-8 leading-snug">
          Ezra Byrd is an atheist exploring. This work is not a manifesto; it is a record of what survived betrayal. 
          It is for anyone who has ever believed, even after belief was no longer easy.
        </p>
        <button className="w-fit border-2 border-current px-8 py-4 uppercase font-bold hover:bg-signal-red hover:text-white transition-colors duration-300">
          Trace the Motion
        </button>
      </div>
    </section>
  );
}
