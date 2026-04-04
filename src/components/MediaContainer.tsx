import Image from 'next/image';

const assets = [
  { src: '/media/icon-cross.png', label: 'The Pure Form' },
  { src: '/media/recursion.png', label: 'Recursive Alignment' },
  { src: '/media/autonomy.jpg', label: 'Inherited Autonomy' },
  { src: '/media/party.webp', label: 'Structural Tension' },
];

export default function MediaContainer() {
  return (
    <section className="w-full bg-white text-ink b-border-b">
      <div className="p-8 md:p-12 border-b-2 border-current">
        <h2 className="text-3xl md:text-5xl uppercase">Visual Evidence</h2>
      </div>
      <div className="b-grid border-none">
        {assets.map((asset, i) => (
          <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3 h-[400px] b-cell relative group overflow-hidden border-current md:border-r-2 last:border-r-0">
            <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110">
              <Image 
                src={asset.src} 
                alt={asset.label} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="relative z-10 bottom-0 left-0 bg-ink text-bone p-4 w-fit mt-auto translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-sm font-mono uppercase">{asset.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
