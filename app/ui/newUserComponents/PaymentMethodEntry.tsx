import React from 'react';
import {PaymentMethod} from '../../interfaces';
import AddMethodForm from './AddMethodForm';


interface PaymentMethodEntryProps {
    paymentMethod: Partial<PaymentMethod>;
    handleSubmit: (paymentMethod: PaymentMethod) => void;
}

const PaymentMethodEntry: React.FC<PaymentMethodEntryProps> = ( {paymentMethod, handleSubmit} ) => {
    return (
        <div className="flex flex-col space-y-6">
                <AddMethodForm paymentMethod={paymentMethod} handleSubmit={handleSubmit} />
        </div>

    );
}

export default PaymentMethodEntry;