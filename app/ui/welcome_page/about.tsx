import React from 'react';
export default function About() {
    return (
        <section id="about" className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row items-start gap-8 w-full border-t-2 p-20">
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-extrabold p1st">About Wello</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Wello is a secure, user-friendly platform that unifies your transactions, payment management, and financial history in one place.
                        Our platform is designed to help you simplify your finances and revolutionize your banking experience.
                    </p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-extrabold p1st">Our Mission</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our mission is to provide a secure, user-friendly platform that simplifies your finances and revolutionizes your banking experience.
                        We believe that managing your finances should be easy, convenient, and stress-free.
                    </p>
                </div>
            </div>
            {/* Features listed */}
            <div id="features" className="flex flex-col items-center gap-16 w-full border-t-2 py-20 p2nd-bg py-20">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white">Key Features</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full px-6 md:px-12">
                    {/* Feature: Transaction History */}
                    <div className="group relative shadow-lg rounded-lg p-6 md:p-8 flex flex-col items-start gap-4 transition-all duration-500 text-white border-2 hover:text-[#3b1e54] hover-background-color-[#f9f871] hover:border-[#3b1e54] hover:shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-extrabold">Transactional History</h1>
                        <p className="text-lg leading-relaxed">
                            Trace back all your transactions and view your financial history in one place. Keep track of your spending and monitor your financial activity.
                        </p>
                        <button className="mt-auto hover:text-[#3b1e54] hover:underline font-semibold">Learn More</button>
                    </div>

                    {/* Feature: Payment Management */}
                    <div className="group relative shadow-lg rounded-lg p-6 md:p-8 flex flex-col items-start gap-4 transition-all duration-500 text-white border-2 hover:text-[#3b1e54] hover-background-color-[#f9f871] hover:border-[#3b1e54] hover:shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-extrabold">Payment Management</h1>
                        <p className="text-lg leading-relaxed">
                            Manage your payments, bills, and subscriptions in one place. Set up recurring payments and never miss a due date again.
                        </p>
                        <button className="mt-auto hover:text-[#3b1e54] hover:underline font-semibold">Learn More</button>
                    </div>

                    {/* Feature: Financial Insights */}
                    <div className="group relative shadow-lg rounded-lg p-6 md:p-8 flex flex-col items-start gap-4 transition-all duration-500 text-white border-2 hover:text-[#3b1e54] hover-background-color-[#f9f871] hover:border-[#3b1e54] hover:shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-extrabold">Payment Management</h1>
                        <p className="text-lg leading-relaxed">
                            Manage your payments, bills, and subscriptions in one place. Set up recurring payments and never miss a due date again.
                        </p>
                        <button className="mt-auto hover:text-[#3b1e54] hover:underline font-semibold">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
}