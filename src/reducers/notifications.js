import { NOTIFICATION_OPEN, NOTIFICATION_CLOSE } from '../actions/notifications';

const defaultState = {
    visible: false,
    content: ''
};

export default function notifications(state = defaultState, action) {
    switch (action.type) {
    case NOTIFICATION_OPEN:
        return Object.assign({}, state, {
            visible: true,
            content: action.messageContent,
            icon: action.icon
        });
    case NOTIFICATION_CLOSE:
        return Object.assign({}, state, {
            visible: false,
            content: '',
            icon: null
        });
    default:
        return state;
    }
}
