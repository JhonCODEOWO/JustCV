import { createContext } from "react";
import type { NotificationInterface } from "../interfaces/notification.interface";
import type { CreateNotificationArgs } from "../interfaces/create.interface";

interface NotificationContextType {
    notifications: NotificationInterface[];
    deleteNotification: (id: string) => void;
    create: (args: CreateNotificationArgs) => void;
}

export const NotificationsContext = createContext<NotificationContextType | null>(null);