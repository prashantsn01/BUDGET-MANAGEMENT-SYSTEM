import { useState, useEffect, use } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const { login, isLoading, error, setError } = useAuthStore(); // Include setError
      const navigate = useNavigate();

      useEffect(() => {
            setError(null);
      }, [setError]);

      useEffect(() => {
            setEmail("");
            setPassword("");
      }, []);

      const handleLogin = async (e) => {
            e.preventDefault();
            try {
                  await login(email, password);
                  navigate("/dashboard");
                  setEmail("");
                  setPassword("");
            } catch (error) {
                  console.log(error);
            }
      };

      return (
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-auto">
                  <div className="p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
                              Welcome Back
                        </h2>

                        <form onSubmit={handleLogin}>
                              <Input
                                    icon={Mail}
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                              />

                              <Input
                                    icon={Lock}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                          setPassword(e.target.value)
                                    }
                              />

                              {/* <div className="flex items-center mb-4 sm:mb-6">
                                    <Link
                                          to="/forgot-password"
                                          className="text-gray-800 text-sm sm:text-base hover:underline"
                                    >
                                          Forgot password?
                                    </Link>
                              </div> */}
                              {error && (
                                    <p className="text-red-500 font-semibold text-sm sm:text-base mb-2">
                                          {error}
                                    </p>
                              )}

                              <button
                                    className="mt-4 sm:mt-5 w-full py-2 sm:py-3 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200"
                                    type="submit"
                                    disabled={isLoading}
                              >
                                    {isLoading ? (
                                          <Loader className="w-5 sm:w-6 h-5 sm:h-6 animate-spin mx-auto" />
                                    ) : (
                                          "Login"
                                    )}
                              </button>
                        </form>
                  </div>
                  <div className="px-6 sm:px-8 py-4 bg-gray-100 flex justify-center">
                        <p className="text-xs sm:text-sm text-gray-600">
                              Don't have an account?{" "}
                              <Link
                                    to="/signup"
                                    className="text-gray-800 hover:underline"
                              >
                                    Sign up
                              </Link>
                        </p>
                  </div>
            </div>
      );
};

export default LoginPage;
