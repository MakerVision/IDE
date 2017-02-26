import ga from '../ga';
import axios from 'axios';
import { notifySuccess, notifyError } from './notifications';

// Action Types
export const REQUEST_EMAIL_WHEN_READY = 'REQUEST_EMAIL_WHEN_READY';

// Action Creators
export function requestEmailWhenReady(email) {
    ga('send', 'event', 'RequestEmailWhenReady', 'RoboticArm');
    return (dispatch) => {
        dispatch(emailRequestedBy(email));
        sendEmailToServer(email).then(() => {
            dispatch(notifySuccess('Thanks!  We\'ll let you know when it\'s available.'));
        }).catch(() => {
            dispatch(notifyError('Yikes! your email wasn\'t be added for some reason.'));
        });
    };
}

function emailRequestedBy(email) {
    return {
        type: REQUEST_EMAIL_WHEN_READY,
        email
    };
}


// Helper functions

function sendEmailToServer(email) {
    const options = {
        method: 'put',
        url: 'https://nrl3h4h8pj.execute-api.us-east-2.amazonaws.com/prod/arm-notification',
        data: {
            email,
            product: 'Robotic Arm'
        }
    };
    return axios(options);
}
