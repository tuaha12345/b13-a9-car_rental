import { RiShieldCheckLine, RiCustomerServiceLine, RiCarLine, RiPriceTagLine } from "react-icons/ri";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <RiCarLine className="text-2xl" />,
      title: "Premium Fleet",
      desc: "Choose from a wide range of well-maintained luxury and economy cars.",
    },
    {
      icon: <RiPriceTagLine className="text-2xl" />,
      title: "Best Prices",
      desc: "Competitive rates with no hidden charges. Pay only what you see.",
    },
    {
      icon: <RiShieldCheckLine className="text-2xl" />,
      title: "Fully Insured",
      desc: "All vehicles come with comprehensive insurance for your peace of mind.",
    },
    {
      icon: <RiCustomerServiceLine className="text-2xl" />,
      title: "24/7 Support",
      desc: "Our team is always ready to assist you anytime, anywhere.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Why Choose <span className="text-[#f97316]">DriveFleet?</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 mt-2 max-w-2xl mx-auto">
            Experience the best car rental service with unmatched benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#121212] rounded-2xl p-6 text-center border border-gray-100 dark:border-white/[0.06] shadow-sm hover:shadow-md transition"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#f97316]/10 flex items-center justify-center text-[#f97316]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}