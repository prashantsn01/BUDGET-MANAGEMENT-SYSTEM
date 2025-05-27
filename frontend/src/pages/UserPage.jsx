import { useAuthStore } from "../store/authStore";

const UserPage = () => {
      const { user, logout } = useAuthStore();

      const handleLogout = () => {
            logout();
      };

      return (
            <div className="max-w-md w-full mx-auto mt-8 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100">
                  <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-3">
                              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <span className="text-2xl font-bold text-white">
                                          {user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                    </span>
                              </div>
                              <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 capitalize">
                              {user.username.toLowerCase()}
                        </h1>
                        <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="p-4 bg-white rounded-lg shadow-xs border border-gray-200 hover:shadow-sm transition-shadow">
                              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 mr-2 text-blue-500"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                    >
                                          <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                          />
                                    </svg>
                                    Profile Information
                              </h3>
                              <div className="space-y-1 text-sm">
                                    <p className="text-gray-700 flex items-center">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-2 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                          </svg>
                                          <span className="font-medium">
                                                Name:
                                          </span>{" "}
                                          {user.username}
                                    </p>
                                    <p className="text-gray-700 flex items-center">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-2 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                          </svg>
                                          <span className="font-medium">
                                                Email:
                                          </span>{" "}
                                          {user.email}
                                    </p>
                              </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-xs border border-gray-200 hover:shadow-sm transition-shadow">
                              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 mr-2 text-purple-500"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                    >
                                          <path
                                                fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"
                                          />
                                    </svg>
                                    Account Activity
                              </h3>
                              <div className="space-y-1 text-sm">
                                    <p className="text-gray-700 flex items-center">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-2 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                          </svg>
                                          <span className="font-medium">
                                                Joined:
                                          </span>{" "}
                                          {new Date(
                                                user.created_at
                                          ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                          })}
                                    </p>
                                    <p className="text-gray-700 flex items-center">
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-2 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                          </svg>
                                          <span className="font-medium">
                                                Last Updated:
                                          </span>{" "}
                                          {new Date(
                                                user.updated_at
                                          ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                          })}
                                    </p>
                              </div>
                        </div>
                  </div>

                  <div className="flex justify-center">
                        <button
                              onClick={handleLogout}
                              className="w-full max-w-xs py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-md shadow-sm hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200 flex items-center justify-center text-sm"
                        >
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                              >
                                    <path
                                          fillRule="evenodd"
                                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l3-3a1 1 0 10-1.414-1.414L14 7.586l-2.293-2.293a1 1 0 10-1.414 1.414L12.586 9H7a1 1 0 100 2h5.586l-1.293 1.293z"
                                          clipRule="evenodd"
                                    />
                              </svg>
                              Sign Out
                        </button>
                  </div>
            </div>
      );
};

export default UserPage;
