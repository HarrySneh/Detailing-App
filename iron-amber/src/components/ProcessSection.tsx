const steps = [
  {
    step: "01",
    title: "Book Online",
    desc: "Choose your service and preferred time slot in seconds.",
  },
  {
    step: "02",
    title: "We Come to You",
    desc: "Our fully equipped mobile studio arrives anywhere in the GTA.",
  },
  {
    step: "03",
    title: "Enjoy the Finish",
    desc: "Your vehicle looks better than the showroom — guaranteed.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-2">
          The Experience
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          How It <span className="text-amber-400">Works</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {steps.map((s) => (
          <div key={s.step} className="flex-1 text-center relative">
            <div className="text-7xl font-extrabold text-amber-400/10 mb-4 select-none">
              {s.step}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              {s.title}
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">
              {s.desc}
            </p>
            {parseInt(s.step) < 3 && (
              <div className="hidden md:block absolute top-10 -right-6 text-amber-400/30 text-3xl">
                ⟶
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
