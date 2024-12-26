import React from "react";
import {User, PaymentMethod} from "../../interfaces";

interface ReviewEntriesProps {
    user: User;
    paymentMethod: PaymentMethod;
}

const ReviewEntries = ({user, paymentMethod}: ReviewEntriesProps) => {
    return (
        <div>
            <h2>Review Entries</h2>
            <p>User Name: {user.full_name}</p>
            <p>Email: {user.email}</p>
            <p>Payment Method: {paymentMethod.type}</p>
        </div>
    );
};

export default ReviewEntries;