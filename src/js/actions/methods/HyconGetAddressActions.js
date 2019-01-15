'use strict';

import TrezorConnect from 'trezor-connect';
import { onResponse } from './CommonActions';

const PREFIX: string = 'hycon_getaddress';
export const PATH_CHANGE: string = `${PREFIX}_path_@change`;
export const CONFIRMATION_CHANGE: string = `${PREFIX}_confirmation_@change`;

export function onConfirmationChange(showOnTrezor: boolean): any {
    return {
        type: CONFIRMATION_CHANGE,
        showOnTrezor
    }
}

export function onPathChange(path: string): any {
    return {
        type: PATH_CHANGE,
        path
    }
}

export function onGetAddress(tx: string): any {
    return async function (dispatch, getState) {

        console.log("TrezorConnect", TrezorConnect);

        const bundled = getState().common.params.path.split(';');
        let response;
        if (bundled.length > 1) {
            const bundle = bundled.map(b => {
                return {path: b, showOnTrezor: getState().common.params.showOnTrezor}
            });
            response = await TrezorConnect.hyconGetAddress({bundle});
        } else {
            response = await TrezorConnect.hyconGetAddress(getState().common.params);
        }

        dispatch(onResponse(response));
    }
}