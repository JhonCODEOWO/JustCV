import type { NotificationType } from "../types/NotificationType";

export interface CreateNotificationArgs {
    title?: string;
    content: string;
    type?: NotificationType;
}