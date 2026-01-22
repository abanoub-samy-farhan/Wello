'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { checkSignedIn } from '@/app/utils/fetches';

export default function DashboardNavBar() {
    const [active, setActive] = useState('Home');
    const [notifications] = useState(0);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
            checkSignedIn().then((res) => {
                if (!res) {
                    window.location.href = '/auth/sign_in';   
                }
            });
        }, []);

    const handleSignOut = async () => {
        await fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then((res) => {
            if (res.status === 200) {
                console.log('Signed Out');
            }
        });
    }

    const handleDeleteAccount = async () => {
        await fetch('http://localhost:8000/api/user/', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log('Account Deleted');
                window.location.href = '/';
            }
        });

        window.location.href = '/';
    };
    return (
        <nav className={`group bg-gray-200 w-full md:w-20 md:hover:w-56 transition-all 
        duration-250 ease-in-out md:h-screen 
        fixed top-0 left-0 md:border-r-2 border-opacity-20 border-primary1
        z-10 md:z-20 overflow-hidden ${open ? 'h-screen' : 'h-fit'}`}>
            {/* Logo and Header */}
            <div className="hidden md:flex flex-row md:flex-col items-center justify-center py-5 w-full
            border-b-2 border-opacity-20 border-primary1 cursor-pointer"
            onClick={() => window.location.href = '/'}
            >
                <Image src="/Wello%20Logo.png" alt="Logo" width={40} height={64} />
                <h1 className="text-2xl font-bold p-1 transition-opacity duration-250 ease-in-out">
                    Wello
                </h1>
            </div>
            <div className="flex items-center justify-center md:hidden cursor-pointer p-2">
                <Image src="/Wello%20Logo.png" alt="Logo" width={40} height={64}
                onClick={() => setOpen(!open)}
                />
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col font-bold">
                {/* Home Tag */}
                <li>
                    <div
                        className={`md:flex items-center overflow-hidden gap-2 pl-5 pt-2 hover:bg-primary4 p-1 
                            transition-all duration-250 ease-in-out 
                        ${active === 'Home' ? 'bg-primary4' : ''} ${
                            open ? 'flex' : 'hidden'
                        }`}
                        onClick={() => setActive('Home')}
                    >
                        <Image src="/dashboard_home_icon.png" alt="Home" width={32} height={32} />
                        <Link
                            href="/dashboard"
                            className="whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 
                            transition-opacity duration-250 ease-in-out"
                        >
                            Home
                        </Link>
                    </div>
                </li>
                {/* Profile Tag */}
                <li>
                    <div
                        className={`md:flex items-center overflow-hidden gap-2 pl-4 pt-2 hover:bg-primary4 
                            p-1 transition-all duration-250 ease-in-out 
                        ${active === 'Profile' ? 'bg-primary4' : ''}
                        ${
                            open ? 'flex' : 'hidden'
                        }
                        `}
                        onClick={() => setActive('Profile')}
                    >
                        <Image src="/dashboard_profile_icon.png" alt="Profile" width={32} height={32} />
                        <Link
                            href="/dashboard/profile"
                            className="whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 
                            transition-opacity duration-250 ease-in-out"
                        >
                            Profile
                        </Link>
                    </div>
                </li>
                {/* Invoices Tag */}
                <li>
                    <div
                        className={`md:flex items-center overflow-hidden gap-2 pl-4 pt-2 
                            hover:bg-primary4 p-1 transition-all duration-250 ease-in-out 
                        ${active === 'Invoices' ? 'bg-primary4' : ''}
                        ${
                            open ? 'flex' : 'hidden'
                        }
                        `}
                        onClick={() => setActive('Invoices')}
                    >
                        <Image src="/dashboard_invoice_icon.png" alt="Invoices" width={32} height={32} />
                        <Link
                            href="/dashboard/invoices"
                            className="whitespace-nowrap md:opacity-0 
                            md:group-hover:opacity-100 transition-opacity duration-250 ease-in-out"
                        >
                            Invoices
                        </Link>
                    </div>
                </li>
                {/* Notification Tag */}
                <li>
                    <div
                        className={`md:flex items-center overflow-hidden gap-2 pl-4 pt-2 
                            hover:bg-primary4 p-1 transition-all duration-250 ease-in-out 
                        ${active === 'Notification' ? 'bg-primary4' : ''}
                        ${
                            open ? 'flex' : 'hidden'
                        }
                        `}
                        onClick={() => setActive('Notification')}
                    >
                        <Image src="/dashboard_notification_icon.png" alt="Notification" width={32} height={32} />
                        <Link
                            href="/dashboard/notifications"
                            className="whitespace-nowrap md:opacity-0 
                            md:group-hover:opacity-100 transition-opacity duration-250 ease-in-out"
                        >
                            Notification
                        </Link>
                        <div className="rounded-full bg-primary1 text-white w-fit 
                        h-fit flex items-center justify-center px-2 ">
                            {notifications > 0 ? notifications : ''}
                        </div>
                    </div>
                </li>
            </ul>
            {/* Sign Out */}
            <div className=" absolute mt-5 md:mt-20 md:border-t-2 md:border-primary1 md:border-opacity-20 w-full">
                <div className={`flex items-center overflow-hidden gap-2 pl-5 py-4  cursor-pointer
                hover:bg-red-500 hover:text-white p-1 transition-all duration-250 ease-in-out font-bold`}>
                    <Image src="/logout_icon.png" alt="Sign Out" width={20} height={20} />
                    <Link
                        href="/auth/sign_in"
                        className="whitespace-nowrap md:opacity-0 
                        md:group-hover:opacity-100 transition-opacity duration-250 ease-in-out"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Link>
                </div>
            </div>
            {/* Delete Account */}
            <div className=" absolute bottom-5 md:border-t-2 md:border-primary1 md:border-opacity-20 w-full">
                <div className={`flex items-center overflow-hidden gap-2 pl-5 py-4  cursor-pointer
                hover:bg-red-700 hover:text-white p-1 transition-all duration-250 ease-in-out font-bold`}>
                    <button className="flex items-center gap-2"
                    onClick={handleDeleteAccount}
                    >
                        <span className="whitespace-nowrap md:opacity-0 
                        md:group-hover:opacity-100 transition-opacity duration-250 ease-in-out"
                        >
                            Delete Account
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
