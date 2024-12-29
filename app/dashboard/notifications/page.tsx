import React from 'react';
import NotificationBlock from '@/app/ui/notifications/NotificationBlock';
import { Notification } from '@/app/interfaces';

export default function NotificationsPage() {
  const created_at = new Date();
  const notif: Notification = {
    id: '1',
    title: 'Notification Title',
    notification_type: 'Notification type',
    message: 'you are a dick',
    is_read: false,
    created_at: created_at
  }

  return (
    <div className="flex flex-col md:ml-20 p-10 w-full md:mt-0 mt-10">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <div className="flex flex-col items-center justify-center border-t-2 py-4 w-full">
            <NotificationBlock notification={notif}/>
            <NotificationBlock notification={notif}/>
        </div>
    </div>
  );
}