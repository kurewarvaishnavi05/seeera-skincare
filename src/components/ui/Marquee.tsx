export function Marquee() {
  const items = [
    "✧ CRUELTY FREE",
    "✧ DERMATOLOGIST TESTED",
    "✧ SCIENCE-BACKED",
    "✧ FOR EVERY SHADE",
    "✧ PDRN INFUSED",
    "✧ BARRIER REPAIR",
  ];

  return (
    <div className="bg-primary-brown py-4 overflow-hidden flex whitespace-nowrap border-y border-cream/10">
      {/* We use w-max so the container stretches to fit its contents, and translate by -50% in the animation */}
      <div className="animate-marquee flex items-center w-max">
        {/* Render 4 sets of items to guarantee screen fill on any device width */}
        {[...Array(4)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0">
            {items.map((item, index) => (
              <span key={`${groupIndex}-${index}`} className="text-cream text-xs md:text-sm tracking-[0.2em] px-8 font-medium">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
