/* @flow */
'use strict';

import TrezorConnect from 'trezor-connect';
import { onResponse } from './CommonActions';

console.log("TrezorConnect", TrezorConnect);

const PREFIX: string = 'tron_signtx';
export const PATH_CHANGE: string = `${PREFIX}_path_@change`;
export const TX_CHANGE: string = `${PREFIX}_tx_@change`;

export function onTransactionChange(transaction: string): any {
    return {
        type: TX_CHANGE,
        transaction
    }
}

export function onPathChange(path: string): any {
    return {
        type: PATH_CHANGE,
        path
    }
}

export function onSignTx(): any {
    return async function (dispatch, getState) {

        try {
            const { path, transaction } = getState().tronsigntx;

            const response = await TrezorConnect.tronSignTx({
                path: path,
                transaction: transaction,
            });

            dispatch( onResponse(response) );

        } catch(error) {
            console.warn(error);

            dispatch( onResponse({
                error: 'Invalid JSON'
            }) );
        }
    }
}
