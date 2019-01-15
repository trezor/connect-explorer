/* @flow */
'use strict';

import { LOCATION_CHANGE } from 'react-router-redux';
import { TX_CHANGE, PATH_CHANGE } from '../../actions/methods/HyconSignTxActions';

type MethodState = {
    +js: string;
    +fields: Array<string>;

    path: string;
    transaction: string;
}

const defaultTx: string = 
`{
    fee: '0.000000001',
    amount: '0.000000001',
    nonce: 1024,
    to: 'H497fHm8gbPZxaXySKpV17a7beYBF9Ut3'
}`;

const initialState: MethodState = {
    js: 'TrezorConnect.hyconSignTransaction',
    fields: ['path', 'transaction'],

    path: "m/44'/1397'/0'/0/0",
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