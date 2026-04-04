import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center b-border-b bg-white transition-colors duration-1000" id="hero">
      <div className="absolute inset-0 z-0 opacity-20 filter grayscale hover:grayscale-0 transition-all duration-700">
        <Image 
          src="/media/hero.png" 
          alt="Materialist Christianity Industrial Imagery" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-9xl mb-4 text-ink">
          Materialist<br />Christianity
        </h1>
        <div className="w-full h-px bg-current mb-8"></div>
        <p className="text-xl md:text-2xl uppercase tracking-widest font-mono">
          A Record of Motion by Ezra Byrd
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm uppercase tracking-tighter opacity-50">Downward Pressure</span>
        <div className="w-px h-12 bg-current"></div>
      </div>
    </section>
  );
}
