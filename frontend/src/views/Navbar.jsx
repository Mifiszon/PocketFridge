import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  const [isOpen, setIsOpen] = useState(false);

  if (token) {
    const decoded = jwtDecode(token);
    var user_id = decoded.user_id;
  }

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md border-b-2 border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src="assets/pocketlogo.png" alt="logo" className="h-10 w-auto" />
          </Link>
          <span style={{fontFamily: "winky-rough"}} className="text-xl font-semibold hidden sm:inline">Pocket Fridge</span>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="text-xl font-sans transition duration-200"
            style={{ textDecoration: "none", color: '#16a34a' }}
            onMouseEnter={(e) => e.target.style.color = '#276749'}
            onMouseLeave={(e) => e.target.style.color = '#16a34a'}
          >
            Home
          </Link>

          {token === null ? (
            <>
              <Link
                to="/login"
                className="text-xl transition duration-200"
                style={{ textDecoration: "none", color: 'white' }}
                onMouseEnter={(e) => e.target.style.color = '#f56565'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xl transition duration-200"
                style={{ textDecoration: "none", color: 'white' }}
                onMouseEnter={(e) => e.target.style.color = '#f56565'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "#16a34a" }}
                className="text-xl hover:text-gray-300 hover:no-underline transition duration-200"
                onMouseEnter={(e) => e.target.style.color = '#276749'}
                onMouseLeave={(e) => e.target.style.color = '#16a34a'}
              >
                Dashboard
              </Link>
              <Link
                to="/product"
                style={{ textDecoration: "none", color: "#16a34a" }}
                className="text-xl hover:text-gray-300 hover:no-underline transition duration-200"
                onMouseEnter={(e) => e.target.style.color = '#276749'}
                onMouseLeave={(e) => e.target.style.color = '#16a34a'}
              >
                Product List
              </Link>
              <button
                style={{ fontSize: "20px" }}
                onClick={logout}
                className="text-xl hover:text-red-500 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#16a34a" }}
            className="block py-1 transition duration-200"
            onMouseEnter={(e) => e.target.style.color = '#276749'}
            onMouseLeave={(e) => e.target.style.color = '#16a34a'}
          >
            Home
          </Link>
          {token === null ? (
            <>
              <Link
                to="/login"
                className="block py-1 hover:text-gray-300 transition duration-200"
                onMouseEnter={(e) => e.target.style.color = '#f56565'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-1 hover:text-gray-300 transition duration-200"
                onMouseEnter={(e) => e.target.style.color = '#f56565'}
                onMouseLeave={(e) => e.target.style.color = 'white'}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "#16a34a" }}
                className="block py-1 hover:text-gray-300 transition duration-200"
                onMouseEnter={(e) => e.target.style.color = '#276749'}
                onMouseLeave={(e) => e.target.style.color = '#16a34a'}
              >
                Dashboard
              </Link>
              <Link
                to="/product"
                style={{ textDecoration: "none", color: "#16a34a" }}
                className="block py-1 hover:text-gray-300 transition duration-200"
                onMouseEnter={(e) => e.target.style.color = '#276749'}
                onMouseLeave={(e) => e.target.style.color = '#16a34a'}
              >
                Product List
              </Link>
              <button
                onClick={logout}
                className="block py-1 hover:text-red-500 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
