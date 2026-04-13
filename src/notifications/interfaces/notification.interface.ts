import type { NotificationType } from "../types/NotificationType";

export interface NotificationInterface {
    id: string;
    title?: string;
    content: string;
    type: NotificationType
}