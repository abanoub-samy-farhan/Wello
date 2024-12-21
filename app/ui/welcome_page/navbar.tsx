import { useState } from "react";
import { SignInButton } from "../buttons";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex flex-row justify-between items-center p-4 w-screen border-b-2 border-gray-200 fixed top-0 z-50 backdrop-blur-lg bg-opacity-80">
            {/* Logo Section */}
            <Link href="/" className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2 px-2">
                    <img src="/Wello%20Logo.png" alt="logo" className="h-10 w-fit" />
                    <h1 className="text-2xl font-bold p1st">Wello</h1>
                </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-row justify-between items-center p-4 gap-4">
                <div className="p1st hover:text-gray-400 transition duration-200 ease-in-out">
                    Features
                </div>
                <div className="p1st hover:text-gray-400 transition duration-200 ease-in-out">
                    About
                </div>
                <div className="p1st hover:text-gray-400 transition duration-200 ease-in-out">
                    <strong>Contact Us</strong>
                </div>
            </div>

            {/* Hamburger Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-start p-4 md:hidden transition-all duration-500 ease-in-out ${
                    isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div
                    className="p1st hover:text-gray-400 transition duration-200 ease-in-out py-2 w-full justify-center text-center"
                    onClick={() => setIsMenuOpen(false)}
                >
                    About
                </div>
                <div
                    className="p1st hover:text-gray-400 transition duration-200 ease-in-out py-2 w-full justify-center text-center"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Terms of Use
                </div>
                <div
                    className="p1st hover:text-gray-400 transition duration-200 ease-in-out py-2 w-full justify-center text-center"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <strong>Contact Us</strong>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-gray-200 my-2" />
                <div className="mt-4 w-full justify-center text-center">
                    <SignInButton />
                </div>
            </div>

            {/* Sign In Button for Desktop */}
            <div className="hidden md:block mr-4">
                <SignInButton />
            </div>
        </nav>
    );
}
