'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import NotificationBlock from '@/app/ui/notifications/NotificationBlock';
import { Notification } from '@/app/interfaces';
import { FetchNotification } from '@/app/utils/fetches';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    FetchNotification().then((data) => {
      console.log(data);
      setNotifications(data);
    })
  },[])

  return (
    <div className="flex flex-col md:ml-20 p-10 w-full md:mt-0 mt-10 h-full overflow-auto">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <div className="flex flex-col items-center justify-center border-t-2 py-4 w-full">
            {notifications.map((notification, index) => {
                return (
                    <NotificationBlock key={index} notification={notification} />
                )
            })}
        </div>
    </div>
  );
}