'use client';

import { useEffect } from "react";
import { createPortal } from "react-dom";


export default function AddNewPaymentMethodModel({
    onClose,
    isOpen,
    children,
}: {
    onClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
}) {

    useEffect(() => {
        if (!isOpen) return;

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [isOpen, onClose]);
    
    return createPortal(
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
            ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300`}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}