import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">
          College Lost & Found
        </h1>

        <ul className="flex gap-6 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/Signup">Register</Link>
          </li>

          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/lost-item">Report Lost Item</Link>
          </li>
          <li>
            <Link to="/found-item">Report Found Item</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;