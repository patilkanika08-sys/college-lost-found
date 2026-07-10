function Stats() {
  const stats = [
    { number: "500+", title: "Lost Items Reported" },
    { number: "420+", title: "Found Items" },
    { number: "350+", title: "Recovered Items" },
    { number: "1200+", title: "Registered Students" },
  ];

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white text-blue-700 rounded-xl p-6 text-center shadow-lg"
            >
              <h3 className="text-4xl font-bold">{item.number}</h3>
              <p className="mt-3">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;