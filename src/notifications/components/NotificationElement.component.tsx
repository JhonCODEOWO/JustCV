import { useEffect, useRef, useState } from "react";
import type { NotificationInterface } from "../interfaces/notification.interface";
import type { NotificationType } from "../types/NotificationType";
import "./../animations.css"

interface NotificationElementComponentProps {
    notification: NotificationInterface;
    onRemoveElement: (id: string) => void;
}

const colorType: Record<NotificationType, string> = {
    error: 'alert-error',
    success: 'alert-success',
    warning: 'alert-warning',
}

function NotificationElementComponent({notification, onRemoveElement}: NotificationElementComponentProps) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isRemoving, setIsRemoving] = useState<boolean>(false);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            console.log(timerRef.current);
            setIsRemoving(true);
        }, 5000)

        return () => {
            if(timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    const startTimer = () => {
        timerRef.current = setTimeout(() => {
            setIsRemoving(true);
        }, 5000)
    }

    useEffect(() => {
        const ref = divRef;
        if(!divRef) return;

        ref.current?.addEventListener('animationend', (e) => {
            if(e.animationName === 'slideLeftOut') onRemoveElement(notification.id);
        })
    }, [notification, onRemoveElement])

    const removeElement = () => {
        if(timerRef.current) clearTimeout(timerRef.current);
        setIsRemoving(true);
    }

    const handleMainMouseEnter = () => {
        if(timerRef.current) clearTimeout(timerRef.current);
    }

    return (
        <div className={`${!isRemoving? 'slideLeft': 'slideLeftOut'}`} ref={divRef} onMouseLeave={startTimer} onMouseEnter={handleMainMouseEnter}>
            <div className={`alert ${colorType[notification.type]} alert-soft flex justify-between`}>
                {notification.title && <h4>{notification.title}</h4>}
                <span>{notification.content}</span>
                <button onClick={removeElement} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l2.9-2.9l-2.9-2.875q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l2.9 2.9l2.875-2.9q.275-.275.7-.275t.7.275q.3.3.3.713t-.3.687L13.375 12l2.9 2.9q.275.275.275.7t-.275.7q-.3.3-.712.3t-.688-.3z"/></svg>
                </button>
            </div>
        </div>
    );
}

export default NotificationElementComponent;