'use client'
import React from 'react';
import BalanceView from './BalanceView';
import { PaymentMethodListProps } from '../../interfaces';
import { UserProps } from '../../interfaces';
import { DashboardSendMoneyButton,
    DashboardMakePurchaseButton,
    DashboardRecieveMoneyButton
 } from '../buttons';

export default function DashboardPage({ user }: UserProps) {
    const paymentMethods: PaymentMethodListProps = {
        paymentMethods: [
            {
                payment_method_id: "1",
                currency: 'USD',
                user_id: user.user_id,
                provider: 'Visa',
                balance: 1000,
                expires_at: new Date(),
                is_primary: true,
                type: 'Credit Card',
                last_four: '1234'
            },
            {
                payment_method_id: "2",
                provider: 'MasterCard',
                currency: 'USD',
                user_id: user.user_id,
                balance: 2000,
                expires_at: new Date(),
                is_primary: false,
                type: 'Debit Card',
                last_four: '5678',
            },

    ]}
    return (
        <div className="flex flex-col bg-primary4 text-primary1 h-screen w-screen md:ml-20 p-10" >
            <div className="flex flex-col text-3xl font-semibold gap-2 mt-10 md:mt-0">
                <h1>Welcome, {user.full_name.split(' ')[0]}</h1>
                <p className='text-sm'>Thanks for Trusting Wello</p>
            </div>
            <div className="flex flex-col gap-4">
                <BalanceView paymentMethods={paymentMethods} />
            </div>
            <div className="flex flex-col gap-4 mt-10 border-t-2 py-4 border-primary3 pt-4 justify-center items-center">
                <h1 className="text-sm font-semibold">Make some Actions</h1>
                <div className="flex flex-col md:flex-row md:justify-center w-full mt-4 gap-4 md:gap-10">
                    <DashboardSendMoneyButton />
                    <DashboardMakePurchaseButton />
                    <DashboardRecieveMoneyButton />
                </div>
            </div>
        </div>
    );
}