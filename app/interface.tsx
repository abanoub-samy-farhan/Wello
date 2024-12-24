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