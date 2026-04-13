import { useState } from "react"
import type { NotificationInterface } from "../interfaces/notification.interface";
import {v4 as uuid} from "uuid"
import type { CreateNotificationArgs } from "../interfaces/create.interface";

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);

    const addNotification = ({title, content, type = 'success'}: CreateNotificationArgs) => {
        setNotifications(prev => [...prev, {id: uuid(), title, content, type}]);
    }

    const deleteNotification = (id: string) => {
        setNotifications(prev => [...prev.filter(n => n.id != id)]);
    }

    return {notifications, addNotification, deleteNotification};
}