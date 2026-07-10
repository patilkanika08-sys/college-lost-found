function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <h2 className="text-xl font-bold">College Lost & Found Portal</h2>
        <p className="mt-2 text-gray-300">
          Helping students recover their lost belongings quickly and securely.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          © 2026 College Lost & Found Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;