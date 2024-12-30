"use client";
import "../general.css";
import Navbar from "./navbar";
import About from "./about";
import { useEffect, useState } from "react";
import ContactUs from "./contact_us";
import { GetStartedButton, LearnMoreButton, GoToDashboardButton } from "../buttons";
import { checkSignedIn } from "@/app/utils/fetches";
import Loading from "../../loading";
import ChatbotModal from '../chatbot/ChatbotModal';
import { Popover, FloatButton } from "antd";
import { BsRobot } from "react-icons/bs";


export default function WelcomePage() {
    // Request fetching here
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        checkSignedIn().then((res) => {
            if (res) {
                setIsSignedIn(true);
            }
            else {
                setIsSignedIn(false);   
            }
        });
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {/* Navbar */}
            <Navbar signedIn={isSignedIn}/>
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
                            
                            {!isSignedIn ? <GetStartedButton rel={'/auth/sign_up'} /> : <GoToDashboardButton />}
                            <LearnMoreButton />
                        </div>
                    </div>
                    <div className="p1st w-full md:w-1/2 p-6 md:p-12 border-2 border-gray-200 rounded-lg flex flex-col justify-center items-center gap-4">
                        Content for advertising the website
                    </div>
                </div>
                <ChatbotModal isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}/>
            </section>
            {/* About Section */}
            <About />
            {/* Contact Us Section */}
            <ContactUs />
            <Popover placement="left" content="AI Customer Support" title="" trigger="hover">
                <FloatButton icon={<BsRobot className='hover:text-purple-900'/>} className='shadow-4' onClick={
                    () => setIsChatOpen(!isChatOpen)
                }/>
            </Popover>
        </>
    );
}
