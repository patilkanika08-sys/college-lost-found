function Hero() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-blue-700">
          College Lost & Found Portal
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Report lost items, upload found items, and reconnect students with their belongings using AI-powered object recognition.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Report Lost Item
          </button>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Report Found Item
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;