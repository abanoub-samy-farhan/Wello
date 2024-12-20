"use client"
import "../general.css";
import { GetStartedButton, LearnMoreButton } from "../buttons";

export default function WelcomePage(){
    return (
        <div className="">
            <div className="bg-white h-full w-full p2nd m-0 p-2 p4th-bg flex flex-col gap-4 p-20">
            <div className="flex flex-col gap-2 mb-3 max-w-2xl">
                <h1 className="text-8xl font-extrabold p1st">Welcome to <br /> Wello</h1>
                <p className="px-1">
                    Simplify your finances with Wello—a secure, user-friendly platform that unifies your transactions, 
                    payment management, and financial history in one place. <br />
                    Revolutionize your banking experience today! </p>
            </div>
                <div className="flex flex-row gap-2 justify-center w-fit h-100">
                    <GetStartedButton />
                    <LearnMoreButton />
                </div>
            </div>
        </div>
    );
}