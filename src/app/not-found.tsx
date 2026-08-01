import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-concrete text-ash p-8 text-center">
      <h1 className="text-6xl md:text-9xl font-black text-signal mb-4 uppercase">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold mb-8 uppercase tracking-tighter">Logical Discontinuity</h2>
      <p className="max-w-2xl text-lg md:text-xl font-mono uppercase opacity-60 mb-12">
        The requested path does not exist in the current material record. You have reached a void in the structure.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <Link href="/" className="cta-terminal">
          Return to Hub Root &rarr;
        </Link>
        <Link href="/wiki" className="cta-terminal border-ash bg-transparent hover:bg-ash hover:text-concrete">
          Inspect Archive Hub
        </Link>
      </div>
      <footer className="mt-24 opacity-30 text-xs font-mono uppercase">
        Structure | Matter | Motion
      </footer>
    </div>
  );
}
