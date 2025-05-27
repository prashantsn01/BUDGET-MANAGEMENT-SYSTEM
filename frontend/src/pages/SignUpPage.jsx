import { Loader, Lock, Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrength from "../components/ui/PasswordStrength";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
      const [username, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      const { signup, error, isLoading, setError } = useAuthStore();

      useEffect(() => {
            setError(null); // Clear error on component mount
      }, [setError]);

      const handleSignUp = async (e) => {
            e.preventDefault();
            try {
                  await signup(email, password, username);
                  navigate("/dashboard");
                  setName("");
                  setEmail("");
                  setPassword("");
            } catch (error) {
                  console.log(error);
            }
      };

      return (
            <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-auto">
                  <div className="p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
                              Create Account
                        </h2>

                        <form onSubmit={handleSignUp}>
                              <Input
                                    icon={User}
                                    type="text"
                                    placeholder="Full Name"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                              />
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
                              {error && (
                                    <p className="text-red-500 font-semibold mt-2">
                                          {error}
                                    </p>
                              )}
                              <PasswordStrength password={password} />

                              <button
                                    className="mt-5 w-full py-3 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200"
                                    type="submit"
                                    disabled={isLoading}
                              >
                                    {isLoading ? (
                                          <Loader
                                                className="animate-spin mx-auto"
                                                size={24}
                                          />
                                    ) : (
                                          "Sign Up"
                                    )}
                              </button>
                        </form>
                  </div>
                  <div className="px-6 py-4 bg-gray-100 flex justify-center">
                        <p className="text-sm text-gray-600">
                              Already have an account?{" "}
                              <Link
                                    to={"/login"}
                                    className="text-gray-800 hover:underline"
                              >
                                    Login
                              </Link>
                        </p>
                  </div>
            </div>
      );
};

export default SignUpPage;
