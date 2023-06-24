import {NotificationManager} from "react-notifications";

export const createNotification = (type, title, message) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message, title);
            break;
        case 'success':
            NotificationManager.success(message, title);
            break;
        case 'warning':
            NotificationManager.warning(message, title);
            break;
        case 'error':
            NotificationManager.error(message, title);
            break;
    }
};