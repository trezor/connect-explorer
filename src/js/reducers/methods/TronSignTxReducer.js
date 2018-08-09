/* @flow */
'use strict';

import { LOCATION_CHANGE } from 'react-router-redux';
import { TX_CHANGE, PATH_CHANGE } from '../../actions/methods/TronSignTxActions';

type MethodState = {
    +js: string;
    +fields: Array<string>;

    path: string;
    transaction: string;
}

const defaultTx: string = `5A68080112640A2D747970652E676F6F676C65617069732E636F6D2F70726F746F636F6C2E5472616E73666572436F6E747261637412330A154169D78AAC0544126C5199CFF1E1BDC94B15FE9E0012154169D78AAC0544126C5199CFF1E1BDC94B15FE9E0018C096B102`

const initialState: MethodState = {
    js: 'TrezorConnect.tronSignTx',
    fields: ['path', 'transaction'],

    path: "m/44'/60'/0'",
    transaction: defaultTx,

};

export default function method(state: MethodState = initialState, action: any): any {

    switch (action.type) {

        case LOCATION_CHANGE :
            return initialState;

        case PATH_CHANGE :
            return {
                ...state,
                path: action.path
            };

        case TX_CHANGE :
            return {
                ...state,
                transaction: action.transaction
            };

        default:
            return state;
    }
}
