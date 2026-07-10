function CTA() {
  return (
    <section className="bg-blue-700 text-white py-16">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold">
          Ready to Find Your Lost Item?
        </h2>

        <p className="mt-4 text-lg">
          Report a lost item or browse found items to reconnect with your belongings.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Report Lost Item
          </button>

          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
            Browse Found Items
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;