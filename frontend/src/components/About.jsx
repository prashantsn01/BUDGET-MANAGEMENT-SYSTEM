// About.js
const About = ({ teamMembers }) => {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Our Team
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet the brilliant minds from DSCE who built this personal finance solution
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.roll} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="p-6">
                                <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-gray-500 text-center mb-1">
                                    <span className="font-medium  text-gray-900">Roll No:</span> {member.roll}
                                </p>
                                <p className="text-gray-500 text-center mb-1">
                                    <span className="font-medium text-gray-900">College:</span> {member.college}
                                </p>
                                <p className="text-gray-500 text-center">
                                    <span className="font-medium  text-gray-900">Department:</span> {member.department}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;