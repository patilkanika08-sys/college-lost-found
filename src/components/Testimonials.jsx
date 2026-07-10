function Testimonials() {
  const reviews = [
    {
      name: "Rahul Patil",
      review: "I found my laptop within two days using this portal!",
    },
    {
      name: "Sneha Sharma",
      review: "Very easy to report and claim lost items. Amazing experience.",
    },
    {
      name: "Amit Joshi",
      review: "The AI object detection made finding my bag much easier.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Student Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow"
            >
              <p className="text-gray-600">"{item.review}"</p>
              <h3 className="mt-4 font-bold text-blue-700">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;