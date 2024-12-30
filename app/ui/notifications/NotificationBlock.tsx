import React from 'react';
import { NotificationProps } from '@/app/interfaces';

    
const NotificationBlock: React.FC<NotificationProps> = ({ notification }) => {
    return (
        <div className="flex flex-row gap-3 items-start justify-start p-4 bg-white w-full border-b-2 border-primary1">
            {/* if not read before, place a purple dot in the beginning */}
            {!notification.is_read && <div className='flex h-full w-2 items-center justify-center'>
                <div className='h-2 w-2 bg-primary1 rounded-full'>
                </div>
                </div>}
            <div className="flex flex-col">
                <div>
                    <h1 className="text-lg md:text-2xl font-semibold">{notification.title}</h1>
                </div>
                <div>
                    <p className="text-xs">{notification.notification_type}</p>
                    <p className='text-xs text-gray-500'>{notification.created_at}</p>
                </div>
                <p className='text-md'>{notification.message}</p>
            </div>
        </div>
    );
};

export default NotificationBlock;