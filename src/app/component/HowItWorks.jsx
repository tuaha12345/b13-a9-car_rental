import { RiSearchLine, RiCalendarLine, RiCarFill } from "react-icons/ri";

export default function HowItWorks() {
  const steps = [
    {
      icon: <RiSearchLine className="text-2xl" />,
      step: "01",
      title: "Search & Select",
      desc: "Browse our fleet and pick the perfect car for your journey.",
    },
    {
      icon: <RiCalendarLine className="text-2xl" />,
      step: "02",
      title: "Book Online",
      desc: "Choose dates, add extras, and confirm your booking instantly.",
    },
    {
      icon: <RiCarFill className="text-2xl" />,
      step: "03",
      title: "Drive Away",
      desc: "Collect your car at the scheduled time and hit the road.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            How It <span className="text-[#f97316]">Works</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 mt-2">
            Rent a car in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative text-center">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[30%] h-[2px] bg-gradient-to-r from-[#f97316]/20 to-[#f97316]/40" />
              )}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f97316] text-white flex items-center justify-center text-2xl shadow-lg">
                  {step.icon}
                </div>
                <span className="inline-block px-3 py-1 text-xs font-bold text-[#f97316] bg-[#f97316]/10 rounded-full mb-3">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-white/50 max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}