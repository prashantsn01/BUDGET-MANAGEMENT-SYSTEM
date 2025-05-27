// import About from "../components/About";
// import Contact from "../components/Contact";

// const teamMembers = [
//       {
//             name: "Shreenivas Nayakawadi",
//             roll: "1DS22IS143",
//             college: "Dayananda Sagar College of Engineering",
//             department: "Information Science and Engineering",
//       },
//       {
//             name: "Shreesha A",
//             roll: "1DS22IS144",
//             college: "Dayananda Sagar College of Engineering",
//             department: "Information Science and Engineering",
//       },
//       {
//             name: "Siddeshwar M",
//             roll: "1DS22IS155",
//             college: "Dayananda Sagar College of Engineering",
//             department: "Information Science and Engineering",
//       },
//       {
//             name: "Prashant S N",
//             roll: "1DS23IS415",
//             college: "Dayananda Sagar College of Engineering",
//             department: "Information Science and Engineering",
//       },
// ];

// const Home = () => {
//       return (
//             <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-4">
//                   {/* Section 1 */}
//                   <div>
//                         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center mt-3">
//                               Personal Budget Management System
//                         </h1>
//                         <p className="text-lg mb-6 text-center">
//                               Track your income, manage expenses, and visualize
//                               your budget seamlessly.
//                         </p>
//                         <div className="w-full flex justify-center mt-8">
//                               <img
//                                     src="/Banner.webp"
//                                     alt="Budget Management Banner"
//                                     className="w-3/4 h-64 object-fit rounded-2xl shadow-lg"
//                               />
//                         </div>
//                   </div>
//                   {/* Section 2 */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//                         {/* Existing Card 1 */}
//                         <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
//                               <div className="flex items-center mb-4">
//                                     <div className="bg-blue-100 p-3 rounded-full mr-4">
//                                           <svg
//                                                 className="w-6 h-6 text-blue-600"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                           >
//                                                 <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth={2}
//                                                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                                                 />
//                                           </svg>
//                                     </div>
//                                     <h2 className="text-2xl font-semibold">
//                                           Visualize Budget
//                                     </h2>
//                               </div>
//                               <p className="text-gray-600">
//                                     Get clear insights on your income and
//                                     expenses through interactive charts.
//                               </p>
//                         </div>

//                         {/* Existing Card 2 */}
//                         <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
//                               <div className="flex items-center mb-4">
//                                     <div className="bg-green-100 p-3 rounded-full mr-4">
//                                           <svg
//                                                 className="w-6 h-6 text-green-600"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                           >
//                                                 <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth={2}
//                                                       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                 />
//                                           </svg>
//                                     </div>
//                                     <h2 className="text-2xl font-semibold">
//                                           Manage Income & Expenses
//                                     </h2>
//                               </div>
//                               <p className="text-gray-600">
//                                     Easily add, edit, and delete your income and
//                                     expense records.
//                               </p>
//                         </div>

//                         {/* New Card 3 - Receipt Scanning */}
//                         <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
//                               <div className="flex items-center mb-4">
//                                     <div className="bg-purple-100 p-3 rounded-full mr-4">
//                                           <svg
//                                                 className="w-6 h-6 text-purple-600"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                           >
//                                                 <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth={2}
//                                                       d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                                                 />
//                                           </svg>
//                                     </div>
//                                     <h2 className="text-2xl font-semibold">
//                                           Smart Receipt Scanning
//                                     </h2>
//                               </div>
//                               <p className="text-gray-600">
//                                     Upload receipt images and let our AI
//                                     automatically extract transaction details.
//                               </p>
//                         </div>

//                         {/* New Card 4 - Financial Insights */}
//                         <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
//                               <div className="flex items-center mb-4">
//                                     <div className="bg-yellow-100 p-3 rounded-full mr-4">
//                                           <svg
//                                                 className="w-6 h-6 text-yellow-600"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                           >
//                                                 <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth={2}
//                                                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                                                 />
//                                           </svg>
//                                     </div>
//                                     <h2 className="text-2xl font-semibold">
//                                           AI-Powered Insights
//                                     </h2>
//                               </div>
//                               <p className="text-gray-600">
//                                     Get personalized financial advice and
//                                     spending pattern analysis from our AI.
//                               </p>
//                         </div>

//                         {/* New Card 5 - Budget Goals */}
//                         <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
//                               <div className="flex items-center mb-4">
//                                     <div className="bg-red-100 p-3 rounded-full mr-4">
//                                           <svg
//                                                 className="w-6 h-6 text-red-600"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                           >
//                                                 <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth={2}
//                                                       d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                                                 />
//                                           </svg>
//                                     </div>
//                                     <h2 className="text-2xl font-semibold">
//                                           Budget Goals
//                                     </h2>
//                               </div>
//                               <p className="text-gray-600">
//                                     Set and track financial goals with progress
//                                     indicators and reminders.
//                               </p>
//                         </div>

//                         {/* New Card 6 - Multi-Device Sync */}
//                         <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
//                               <div className="flex items-center mb-4">
//                                     <div className="bg-indigo-100 p-3 rounded-full mr-4">
//                                           <svg
//                                                 className="w-6 h-6 text-indigo-600"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                           >
//                                                 <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth={2}
//                                                       d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                                                 />
//                                           </svg>
//                                     </div>
//                                     <h2 className="text-2xl font-semibold">
//                                           Cross-Device Sync
//                                     </h2>
//                               </div>
//                               <p className="text-gray-600">
//                                     Access your financial data anywhere with
//                                     real-time sync across all your devices.
//                               </p>
//                         </div>
//                   </div>
//                   {/* Section 3 */}
//                   <div>
//                         <About teamMembers={teamMembers} />
//                   </div>
//                   {/* Section 4*/}
//                   <div>
//                         <Contact />
//                   </div>
//                   <footer className="w-full text-center py-4 mt-16 bg-gray-100 rounded-t-2xl">
//                         <p>
//                               &copy; 2025 Personal Budget Management System. All
//                               rights reserved.
//                         </p>
//                   </footer>
//             </div>
//       );
// };

// export default Home;

import About from "../components/About";
import Contact from "../components/Contact";

const teamMembers = [
      {
            name: "Shreenivas Nayakawadi",
            roll: "1DS22IS143",
            college: "Dayananda Sagar College of Engineering",
            department: "Information Science and Engineering",
      },
      {
            name: "Shreesha A",
            roll: "1DS22IS144",
            college: "Dayananda Sagar College of Engineering",
            department: "Information Science and Engineering",
      },
      {
            name: "Siddeshwar M",
            roll: "1DS22IS155",
            college: "Dayananda Sagar College of Engineering",
            department: "Information Science and Engineering",
      },
      {
            name: "Prashant S N",
            roll: "1DS23IS415",
            college: "Dayananda Sagar College of Engineering",
            department: "Information Science and Engineering",
      },
];

const Home = () => {
      return (
            <div className="snap-y snap-mandatory h-screen overflow-y-visible">
                  {/* Section 1 - Hero */}
                  <section className="snap-start min-h-screen relative rounded-lg overflow-hidden bg-gray-800 text-white flex items-center justify-center p-4">
                        {/* Full-width banner container */}
                        <div className="absolute inset-0 overflow-hidden">
                              {/* Banner image - ensure the path is correct */}
                              <img
                                    src="/banner.jpeg" // Double check this path matches your file location
                                    alt="Budget Management Banner"
                                    className="w-full h-full object-cover"
                              />

                              {/* Overlay - fixed version */}
                              <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
                              <div className="max-w-4xl mx-auto text-center text-white">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                                          Personal Budget Management System
                                    </h1>
                                    <p className="text-xl sm:text-2xl mb-8">
                                          Take control of your finances with our
                                          powerful budgeting tools.
                                    </p>

                                    {/* Feature highlights with better visibility */}
                                    <div className="bg-black opacity-70 p-8 rounded-lg backdrop-blur-sm">
                                          <h2 className="text-2xl font-semibold mb-6 text-amber-300">
                                                Why Choose Our System?
                                          </h2>
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {[
                                                      [
                                                            "Smart Tracking",
                                                            "Automatic categorization of transactions",
                                                      ],
                                                      [
                                                            "AI Analysis",
                                                            "Personalized financial recommendations",
                                                      ],
                                                      [
                                                            "Multi-Device",
                                                            "Access anywhere on any device",
                                                      ],
                                                ].map(([title, desc]) => (
                                                      <div
                                                            key={title}
                                                            className="p-4"
                                                      >
                                                            <h3 className="text-xl font-medium mb-2 text-amber-200">
                                                                  {title}
                                                            </h3>
                                                            <p>{desc}</p>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Section 2 - Features */}
                  <section className="snap-start min-h-screen bg-gray-50 flex items-center justify-center p-4">
                        <div className="max-w-6xl mx-auto">
                              <h2 className="text-3xl font-bold text-center mb-12">
                                    Features
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Card 1 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                          <div className="flex items-center mb-4">
                                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                      <svg
                                                            className="w-6 h-6 text-blue-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                            />
                                                      </svg>
                                                </div>
                                                <h2 className="text-2xl font-semibold">
                                                      Visualize Budget
                                                </h2>
                                          </div>
                                          <p className="text-gray-600">
                                                Get clear insights on your
                                                income and expenses through
                                                interactive charts.
                                          </p>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                          <div className="flex items-center mb-4">
                                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                                      <svg
                                                            className="w-6 h-6 text-green-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                      </svg>
                                                </div>
                                                <h2 className="text-2xl font-semibold">
                                                      Manage Income & Expenses
                                                </h2>
                                          </div>
                                          <p className="text-gray-600">
                                                Easily add, edit, and delete
                                                your income and expense records.
                                          </p>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                          <div className="flex items-center mb-4">
                                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                                      <svg
                                                            className="w-6 h-6 text-purple-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                            />
                                                      </svg>
                                                </div>
                                                <h2 className="text-2xl font-semibold">
                                                      Smart Receipt Scanning
                                                </h2>
                                          </div>
                                          <p className="text-gray-600">
                                                Upload receipt images and let
                                                our AI automatically extract
                                                transaction details.
                                          </p>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                          <div className="flex items-center mb-4">
                                                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                                      <svg
                                                            className="w-6 h-6 text-yellow-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                                            />
                                                      </svg>
                                                </div>
                                                <h2 className="text-2xl font-semibold">
                                                      AI-Powered Insights
                                                </h2>
                                          </div>
                                          <p className="text-gray-600">
                                                Get personalized financial
                                                advice and spending pattern
                                                analysis from our AI.
                                          </p>
                                    </div>

                                    {/* Card 5 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                          <div className="flex items-center mb-4">
                                                <div className="bg-red-100 p-3 rounded-full mr-4">
                                                      <svg
                                                            className="w-6 h-6 text-red-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                            />
                                                      </svg>
                                                </div>
                                                <h2 className="text-2xl font-semibold">
                                                      Budget Goals
                                                </h2>
                                          </div>
                                          <p className="text-gray-600">
                                                Set and track financial goals
                                                with progress indicators and
                                                reminders.
                                          </p>
                                    </div>

                                    {/* Card 6 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                          <div className="flex items-center mb-4">
                                                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                                      <svg
                                                            className="w-6 h-6 text-indigo-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                            />
                                                      </svg>
                                                </div>
                                                <h2 className="text-2xl font-semibold">
                                                      Cross-Device Sync
                                                </h2>
                                          </div>
                                          <p className="text-gray-600">
                                                Access your financial data
                                                anywhere with real-time sync
                                                across all your devices.
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Section 3 - About */}
                  <section className="snap-start min-h-screen bg-white flex items-center justify-center p-4">
                        <div className="max-w-6xl mx-auto">
                              <About teamMembers={teamMembers} />
                        </div>
                  </section>

                  {/* Section 4 - Contact */}
                  <section className="snap-start min-h-screen bg-gray-50 flex items-center justify-center p-4">
                        <div className="max-w-6xl mx-auto">
                              <Contact />
                        </div>
                  </section>

                  {/* Footer */}
                  <footer className="snap-start bg-gray-100 text-center py-12 px-4">
                        <p>
                              &copy; 2025 Personal Budget Management System. All
                              rights reserved.
                        </p>
                  </footer>
            </div>
      );
};

export default Home;
