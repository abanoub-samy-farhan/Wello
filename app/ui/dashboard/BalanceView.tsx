import React from 'react';
import { PaymentMethodListProps } from '../../interfaces';
import  DashboardPaymentMethodView  from './DashboardPaymentMethodView';

export default function BalanceView({ paymentMethods }: { paymentMethods: PaymentMethodListProps }) {
    const totalBalance = paymentMethods.paymentMethods.reduce((acc, paymentMethod) => acc + paymentMethod.balance, 0);
    const currency = paymentMethods.paymentMethods[0].currency;
    return (
        <div className='flex flex-col md:flex-row justify-center md:justify-between px-4 mt-10 w-full'>
            <div className="flex flex-col items-center md:items-start justify-center md:justify-start h-fit gap-2 p-4 w-full max-w-sm">
                <h1 className="text-lg font-medium text-primary1">Balance</h1>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-5xl font-extrabold text-primary1">{totalBalance}</h2>
                        <div className="flex flex-col bg-primary1 rounded-md px-1 w-fit h-fit relative">
                            <span className="text-xs font-bold text-white  bottom-0 right-0">{currency}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2 border-t border-primary3 w-full">
                        <p>Exchange Rate</p>
                        <strong>1 USD = 51 EGP</strong>
                    </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                {/* Adding the payment method view */}
                {paymentMethods.paymentMethods.map((paymentMethod, index) => (
                    <DashboardPaymentMethodView 
                    provider={paymentMethod.provider} 
                    balance={paymentMethod.balance}
                    expires_at={paymentMethod.expires_at}
                    is_primary={paymentMethod.is_primary}
                    type={paymentMethod.type}
                    key={index}
                    />
                ))}
            </div>
        </div>
    );
}