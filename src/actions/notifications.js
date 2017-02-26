export const NOTIFICATION_OPEN = 'NOTIFICATION_OPEN';
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';

export function notifySuccess(message) {
    return notify(message, 'SUCCESS');
}

export function notifyError(message) {
    return notify(message, 'ERROR');
}

export function notify(messageContent, icon) {
    return (dispatch) => {
        dispatch(notificationOpen(messageContent, icon));
        setTimeout(() => dispatch(notificationClose()), 3000);
    };
}

export function notificationOpen(messageContent, icon) {
    return {
        type: NOTIFICATION_OPEN,
        icon,
        messageContent
    };
}

export function notificationClose() {
    return {
        type: NOTIFICATION_CLOSE
    };
}
