
import React from 'react';
import {PaymentMethod } from '../../interfaces';
import  DashboardPaymentMethodView  from './DashboardPaymentMethodView';
import { SwitchPrimaryMethod } from '@/app/utils/fetches';
import {message} from 'antd';

export default function BalanceView({ paymentMethods }: { paymentMethods: PaymentMethod[] }) {
    let swithcAccountOption = false;
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.success('Primary account switched successfully');
    }

    const error = () => {
        messageApi.error('Failed to switch primary account');
    }

    const handleSwitchPrimary = async () => {
        const response = await SwitchPrimaryMethod();
        if (response) {
            success();
        } else {
            error();
        }
    }

    if (paymentMethods.length > 1) {
        swithcAccountOption = true;
    }
    const totalBalance = paymentMethods.reduce((acc, curr) => acc + (Number(curr.balance) || 0), 0);
    const currency = "USD";
    return (
        <div className='flex flex-col md:flex-row justify-center md:justify-between px-4 mt-10 w-full'>
            {contextHolder}
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
            <div className="flex flex-col">
                <div className='flex flex-col md:flex-row gap-4'>
                    {/* Adding the payment method view */}
                    {paymentMethods.map((paymentMethod, index) => (
                        <DashboardPaymentMethodView
                            key={index} 
                            paymentMethod={paymentMethod}
                        />
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center gap-2 mt-4">
                    {swithcAccountOption && (
                        <button className="text-primary1 font-bold text-sm mt-2 hover:text-primary2 transition-all 
                        duration-300 ease-in-out"
                        onClick={handleSwitchPrimary}
                        >Switch Primary</button>
                    )}
                </div>
            </div>
        </div>
    );
}