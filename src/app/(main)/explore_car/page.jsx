import Card from "@/app/component/Card";

export default async function ExploreCars() {
  let data = await fetch('http://localhost:9
    000/cars', { cache: 'no-store' });
  let cars = await data.json();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
            Explore Our <span className="text-[#f97316]">Fleets</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
            Browse through our complete collection of dynamic rentals available across Bangladesh.
          </p>
        </div>

        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <Card key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-8">
            <h3 className="text-base font-bold text-gray-950 dark:text-white">No Vehicles Available</h3>
            <p className="text-xs text-gray-500 dark:text-white/40 mt-1">
              Currently, there are no cars listed in the system. Check back later!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}