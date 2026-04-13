import { useContext } from "react"
import { NotificationsContext } from "../contexts/notification-context.context";

export const useNotificationsContext = () => {
    const context = useContext(NotificationsContext);
    if(!context) throw new Error(`You should use notification context only inside a NotificationProviderComponent`);
    return context;
}