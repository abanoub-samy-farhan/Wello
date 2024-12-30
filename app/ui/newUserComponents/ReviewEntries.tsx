import React from "react";
import {User, PaymentMethod} from "../../interfaces";

interface ReviewEntriesProps {
    user: User;
    paymentMethod: PaymentMethod;
}

const ReviewEntries = ({user, paymentMethod}: ReviewEntriesProps) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-5">Review Entries</h2>
            <div className="flex flex-col mb-5">
                <h3 className="font-bold">User Information</h3>
                <p>Full Name: {user.full_name}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phone_number}</p>
                <p>Address: {user.address}</p>
            </div>
            <div>
                <h3 className="font-bold">Primary Payment Method</h3>
                <p>Provider: {paymentMethod.provider}</p>
                <p>Method Type: {paymentMethod.method_type}</p>
                <p>Card Number: {paymentMethod.card_number}</p>
                <p>Expiry Date: {paymentMethod.expiry_date}</p>
            </div>
        </div>
    );
};

export default ReviewEntries;