"use client";
import "../general.css";
import Navbar from "./navbar";
import About from "./about";
import ContactUs from "./contact_us";
import { GetStartedButton, LearnMoreButton } from "../buttons";

export default function WelcomePage() {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <section className="p-8 md:p-20 h-auto w-full overflow-hidden">
                {/* Hero Section */}
                <div className="mt-20 mb-36 flex flex-col md:flex-row items-center h-full w-full gap-8">
                    <div className="bg-white w-full md:w-1/2 p-6 md:p-12 p4th-bg flex flex-col gap-4">
                        <div className="flex flex-col gap-2 mb-3 max-w-2xl md:text-left">
                            <h1 className="text-6xl md:text-8xl font-extrabold p1st">Welcome to <br /> Wello</h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Simplify your finances with Wello—a secure, user-friendly platform that unifies your transactions, payment management,
                                and financial history in one place. Revolutionize your banking experience today!
                            </p>
                        </div>
                        <div className="flex flex-row gap-4 justify-center md:justify-start">
                            <GetStartedButton />
                            <LearnMoreButton />
                        </div>
                    </div>
                    <div className="p1st w-full md:w-1/2 p-6 md:p-12 border-2 border-gray-200 rounded-lg flex flex-col justify-center items-center gap-4">
                        Content for advertising the website
                    </div>
                </div>
            </section>
            {/* About Section */}
            <About />
            {/* Contact Us Section */}
            <ContactUs />
        </>
    );
}
