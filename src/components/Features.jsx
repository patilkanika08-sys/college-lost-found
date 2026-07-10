function Features() {
  const features = [
    {
      title: "Report Lost Items",
      description: "Students can easily report lost items with details and images.",
    },
    {
      title: "AI Image Recognition",
      description: "Groq Vision identifies objects from uploaded images.",
    },
    {
      title: "Email Notifications",
      description: "Resend sends notifications when an item is claimed.",
    },
    {
      title: "Analytics Dashboard",
      description: "View lost, found, and recovered item statistics.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;