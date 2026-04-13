import { NotificationsContext } from "./contexts/notification-context.context";
import { useNotifications } from "./hooks/notifications.hook";

interface NotificationsProviderComponentProps{
    children: React.ReactNode;
}

function NotificationProviderComponent({children}: NotificationsProviderComponentProps) {
    const {notifications, addNotification, deleteNotification} = useNotifications();
    return (
        <NotificationsContext.Provider value={{notifications, create: addNotification, deleteNotification: deleteNotification}}>
            {children}
        </NotificationsContext.Provider>
    );
}

export default NotificationProviderComponent;