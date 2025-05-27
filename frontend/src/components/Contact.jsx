// Contact.js
const teamMembers = [
      {
            name: "Shreenivas N",
            email: "1ds22is143@dsce.edu.in",
            role: "Team Member",
      },
      {
            name: "Shreesha A",
            email: "1ds22is144@dsce.edu.in",
            role: "Team Leader",
      },
      {
            name: "Siddeshwar M",
            email: "1ds22is155@dsce.edu.in",
            role: "Team Member",
      },
      {
            name: "Prashant S N",
            email: "1ds23is415@dsce.edu.in",
            role: "Team Member",
      },
];

const Contact = () => {
      return (
            <section id="contact" className="py-16 bg-gray-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Contact Our Team
                              </h2>
                              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                    Have questions about managing your finances?
                                    Reach out to us!
                              </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                              {teamMembers.map((member) => (
                                    <div
                                          key={member.email}
                                          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                                    >
                                          <div className="p-6">
                                                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mx-auto mb-4">
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-8 w-8 text-green-600"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                      </svg>
                                                </div>
                                                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                                                      {member.name}
                                                </h3>
                                                <p className="text-gray-500 text-center mb-3">
                                                      {member.role}
                                                </p>
                                                <a
                                                      href={`mailto:${member.email}`}
                                                      className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                                                >
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-2"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={
                                                                        2
                                                                  }
                                                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                      </svg>
                                                      Email{" "}
                                                      {
                                                            member.name.split(
                                                                  " "
                                                            )[0]
                                                      }
                                                </a>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                      <div className="px-6 py-8 sm:p-10">
                          <h3 className="text-lg font-medium text-center text-gray-900 mb-6">
                              Or send us a general message
                          </h3>
                          <form className="space-y-6 max-w-md mx-auto">
                              <div>
                                  <input
                                      type="text"
                                      placeholder="Your Name"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                              </div>
                              <div>
                                  <input
                                      type="email"
                                      placeholder="Your Email"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                              </div>
                              <div>
                                  <textarea
                                      rows={4}
                                      placeholder="Your Message"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                  ></textarea>
                              </div>
                              <div>
                                  <button
                                      type="submit"
                                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                                  >
                                      Send Message
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div> */}
                        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                              <div className="px-6 py-8 sm:p-10">
                                    <h3 className="text-lg font-medium text-center text-gray-900 mb-6">
                                          Or send us a general message
                                    </h3>
                                    <form
                                          action="https://formsubmit.co/shreenivasnayakawadi2@gmail.com"
                                          method="POST"
                                          className="space-y-6 max-w-md mx-auto"
                                    >
                                          {/* HoneyPot field to prevent spam */}
                                          <input
                                                type="text"
                                                name="_honey"
                                                className="hidden"
                                          />

                                          {/* Disable Captcha */}
                                          <input
                                                type="hidden"
                                                name="_captcha"
                                                value="false"
                                          />

                                          {/* Success Redirect */}
                                          <input
                                                type="hidden"
                                                name="_next"
                                                value="http://yourwebsite.com/thank-you"
                                          />

                                          <div>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      placeholder="Your Name"
                                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                      required
                                                />
                                          </div>
                                          <div>
                                                <input
                                                      type="email"
                                                      name="email"
                                                      placeholder="Your Email"
                                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                      required
                                                />
                                          </div>
                                          <div>
                                                <select
                                                      name="subject"
                                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                      required
                                                >
                                                      <option value="">
                                                            Select Subject
                                                      </option>
                                                      <option value="General Inquiry">
                                                            General Inquiry
                                                      </option>
                                                      <option value="Budget Help">
                                                            Budget Help
                                                      </option>
                                                      <option value="Feature Request">
                                                            Feature Request
                                                      </option>
                                                      <option value="Report Issue">
                                                            Report Issue
                                                      </option>
                                                </select>
                                          </div>
                                          <div>
                                                <textarea
                                                      name="message"
                                                      rows={4}
                                                      placeholder="Your Message"
                                                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                      required
                                                ></textarea>
                                          </div>
                                          <div>
                                                <button
                                                      type="submit"
                                                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                                                >
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 mr-2"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                      >
                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                      </svg>
                                                      Send Message
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Contact;
