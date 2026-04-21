import { createPortal } from "react-dom";
import { useNotificationsContext } from "../hooks/useNotificationsContext.hook";
import NotificationElementComponent from "./NotificationElement.component";

function NotificationsListComponent() {
    const {notifications, deleteNotification} = useNotificationsContext();
    
    return createPortal(
        <div className="px-3 py-5 flex flex-col gap-y-2 top-0 left-[50%] translate-x-[-50%] fixed z-50">
            {notifications
                .map(n => (
                    <NotificationElementComponent key={n.id} notification={n} onRemoveElement={deleteNotification}/>
                ))}
        </div>
    , document.body);
}

export default NotificationsListComponent;