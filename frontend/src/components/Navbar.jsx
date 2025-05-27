import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useLocation } from "react-router-dom";
import {
      FaUser,
      FaSignInAlt,
      FaSignOutAlt,
      FaInfoCircle,
      FaEnvelope,
      FaTimes,
      FaBars,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { TbTransactionRupee } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";

const Navbar = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const { isAuthenticated, logout } = useAuthStore();
      const location = useLocation();

      const handleLogout = () => {
            logout();
            setIsMenuOpen(false);
      };

      const closeMenu = () => setIsMenuOpen(false);

      // Helper function to determine if a link is active
      const isActive = (path) => location.pathname === path;

      return (
            <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                              {/* Logo */}
                              <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
                                    <Link to="/" onClick={closeMenu}>
                                          BudgetManager
                                    </Link>
                              </div>

                              {/* Desktop Navigation */}
                              <div className="hidden md:flex items-center space-x-6">
                                    {location.pathname === "/" && (
                                          <>
                                                <a
                                                      href="#about"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            location.hash ===
                                                            "#about"
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                >
                                                      About
                                                </a>
                                                <a
                                                      href="#contact"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            location.hash ===
                                                            "#contact"
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                >
                                                      Contact
                                                </a>
                                          </>
                                    )}

                                    {!isAuthenticated ? (
                                          <>
                                                <Link
                                                      to="/login"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            isActive("/login")
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                      onClick={closeMenu}
                                                >
                                                      Login
                                                </Link>
                                                <Link
                                                      to="/signup"
                                                      className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            isActive("/signup")
                                                                  ? "bg-blue-600"
                                                                  : ""
                                                      }`}
                                                      onClick={closeMenu}
                                                >
                                                      Sign Up
                                                </Link>
                                          </>
                                    ) : (
                                          <>
                                                <Link
                                                      to="/dashboard"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            isActive(
                                                                  "/dashboard"
                                                            )
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                      disabled={isActive(
                                                            "/dashboard"
                                                      )}
                                                      onClick={closeMenu}
                                                >
                                                      Dashboard
                                                </Link>
                                                <Link
                                                      to="/allTransactions"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            isActive(
                                                                  "/allTransactions"
                                                            )
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                      disabled={isActive(
                                                            "/allTransactions"
                                                      )}
                                                      onClick={closeMenu}
                                                >
                                                      Transactions
                                                </Link>
                                                <Link
                                                      to="/budgets"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            isActive("/budgets")
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                      disabled={isActive(
                                                            "/budgets"
                                                      )}
                                                      onClick={closeMenu}
                                                >
                                                      Budgets
                                                </Link>
                                                <Link
                                                      to="/user"
                                                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                            isActive("/user")
                                                                  ? "text-gray-900 font-semibold"
                                                                  : "text-gray-600 hover:text-gray-900"
                                                      }`}
                                                      onClick={closeMenu}
                                                      disabled={isActive(
                                                            "/user"
                                                      )}
                                                >
                                                      Profile
                                                </Link>
                                                {/* <button
                                                      onClick={handleLogout}
                                                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                                >
                                                      Logout
                                                </button> */}
                                          </>
                                    )}
                              </div>

                              {/* Mobile menu button */}
                              <div className="md:hidden flex items-center">
                                    <button
                                          onClick={() =>
                                                setIsMenuOpen(!isMenuOpen)
                                          }
                                          className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                                          aria-label="Main menu"
                                    >
                                          {isMenuOpen ? (
                                                <FaTimes className="h-6 w-6" />
                                          ) : (
                                                <FaBars className="h-6 w-6" />
                                          )}
                                    </button>
                              </div>
                        </div>
                  </div>

                  {/* Mobile Navigation - Popup Style */}
                  <div
                        className={`fixed inset-0 z-50 transform ${
                              isMenuOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out md:hidden`}
                  >
                        <div
                              className="absolute inset-0 bg-transparent backdrop-blur bg-opacity-50"
                              onClick={closeMenu}
                        ></div>
                        <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl">
                              <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b">
                                          <h3 className="text-lg font-medium text-gray-900">
                                                Menu
                                          </h3>
                                          <button
                                                onClick={closeMenu}
                                                className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                                          >
                                                <FaTimes className="h-6 w-6" />
                                          </button>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                          {location.pathname === "/" && (
                                                <>
                                                      <a
                                                            href="#about"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  location.hash ===
                                                                  "#about"
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <FaInfoCircle className="mr-3 text-gray-500" />
                                                                  About
                                                            </div>
                                                      </a>
                                                      <a
                                                            href="#contact"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  location.hash ===
                                                                  "#contact"
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <FaEnvelope className="mr-3 text-gray-500" />
                                                                  Contact
                                                            </div>
                                                      </a>
                                                </>
                                          )}

                                          {!isAuthenticated ? (
                                                <>
                                                      <Link
                                                            to="/login"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  isActive(
                                                                        "/login"
                                                                  )
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <FaSignInAlt className="mr-3 text-gray-500" />
                                                                  Login
                                                            </div>
                                                      </Link>
                                                      <Link
                                                            to="/signup"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  isActive(
                                                                        "/signup"
                                                                  )
                                                                        ? "bg-blue-600 text-white"
                                                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center justify-center">
                                                                  <FaUser className="mr-3" />
                                                                  Sign Up
                                                            </div>
                                                      </Link>
                                                </>
                                          ) : (
                                                <>
                                                      <Link
                                                            to="/dashboard"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  isActive(
                                                                        "/dashboard"
                                                                  )
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <RiDashboardFill className="mr-3 text-gray-500" />
                                                                  Dashboard
                                                            </div>
                                                      </Link>
                                                      <Link
                                                            to="/allTransactions"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  isActive(
                                                                        "/allTransactions"
                                                                  )
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <TbTransactionRupee className="mr-3 text-gray-500" />
                                                                  Transactions
                                                            </div>
                                                      </Link>
                                                      <Link
                                                            to="/budgets"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  isActive(
                                                                        "/budgets"
                                                                  )
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <GiTakeMyMoney className="mr-3 text-gray-500" />
                                                                  Budgets
                                                            </div>
                                                      </Link>
                                                      <Link
                                                            to="/user"
                                                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-base font-medium ${
                                                                  isActive(
                                                                        "/user"
                                                                  )
                                                                        ? "text-gray-900 font-semibold bg-gray-100"
                                                                        : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                            onClick={closeMenu}
                                                      >
                                                            <div className="flex items-center">
                                                                  <FaUser className="mr-3 text-gray-500" />
                                                                  Profile
                                                            </div>
                                                      </Link>
                                                      <button
                                                            onClick={
                                                                  handleLogout
                                                            }
                                                            className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-base font-medium"
                                                      >
                                                            <div className="flex items-center">
                                                                  <FaSignOutAlt className="mr-3 text-gray-500" />
                                                                  Logout
                                                            </div>
                                                      </button>
                                                </>
                                          )}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-4 border-t text-sm text-gray-500">
                                          BudgetManager ©{" "}
                                          {new Date().getFullYear()}
                                    </div>
                              </div>
                        </div>
                  </div>
            </nav>
      );
};

export default Navbar;
