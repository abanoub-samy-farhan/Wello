// Creating the interface for the props of the components in the app


/**
 * This is the interface for the props of the User component
*/

export interface User {
    user_id: string;
    email: string;
    full_name: string;
    phone_number: string;
    photo_uri: string;
    is_suspended: boolean;
}

export interface UserProps {
    user: User;
}

export interface UserListProps {
    users: User[];
}

// PaymentMethod interface

export interface PaymentMethod {
    payment_method_id: string;
    currency: string;
    user_id: string;
    provider: string;
    is_primary: boolean;
    expires_at: Date;
    type: string;
    balance: number;
    last_four: string;
}

export interface PaymentMethodProps {
    paymentMethod: PaymentMethod;
}

export interface PaymentMethodListProps {
    paymentMethods: PaymentMethod[];
}