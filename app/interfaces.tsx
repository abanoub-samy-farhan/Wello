// Creating the interface for the props of the components in the app


/**
 * This is the interface for the props of the User component
*/

export interface User {
    user_id: string;
    email: string;
    address: string;
    full_name: string;
    phone_number: string;
    is_suspended: boolean | false;
    is_verified: boolean | false;
    is_first_login: boolean | false;
}

export interface UserProps {
    user: User;
}

export interface UserListProps {
    users: User[];
}

// PaymentMethod interface

export interface PaymentMethod {
    payment_method_id?: string;
    user_id: string;
    provider: string;
    is_primary: boolean | true;
    expiry_date: string;
    method_type: string;
    card_number?: string;
    balance?: number | 0;
}

export interface PaymentMethodProps {
    paymentMethod: PaymentMethod;
}

export interface PaymentMethodListProps {
    paymentMethods: PaymentMethod[];
}

export interface Transaction {
    transaction_id: string;
    amount: number;
    type: 'Money Transfer' | 'Purchase';
    state: 'Completed' | 'Pending' | 'Failed';
    balance: number;
  }


// Notification interface

export interface Notification {
    id: string;
    title: string;
    notification_type: string;
    message: string;
    is_read: boolean;
    created_at: Date;
}

export interface NotificationProps {
    notification: Notification;
}
