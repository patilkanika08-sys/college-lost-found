function HowItWorks() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold">1. Report Item</h3>
            <p className="text-gray-600 mt-3">
              Report a lost or found item with its details and image.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold">2. AI Identifies</h3>
            <p className="text-gray-600 mt-3">
              Groq Vision detects the object and helps match similar items.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold">3. Claim Item</h3>
            <p className="text-gray-600 mt-3">
              The owner receives an email notification and claims the item.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;