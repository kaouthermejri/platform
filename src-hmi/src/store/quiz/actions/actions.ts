import * as fetch from 'isomorphic-fetch'

import { Action, createAPIActionCreator } from '../../../utils'
import { ActionTypes, APIActionTypes, AnswerAction, ChooseAction, SignalAction} from './actionTypes'

export function chooseAction(id: number, choice: any): Action<ChooseAction> {
    return { type: ActionTypes.CHOOSE, payload: { id, choice } }
}

export const answerAction: (endpointInfo: any, payload: { id: number, choice: any}) => any
= createAPIActionCreator( 
    ((endpointInfo) => 'http://localhost/app_dev.php/api/mcq_answers'), 
    'GET',
    APIActionTypes.ANSWER,
    APIActionTypes.ANSWER_SUCCESS,
    APIActionTypes.ANSWER_FAILURE
)

export const signalStateAction: (endpointInfo: any, payload: { state: number }) => any
= createAPIActionCreator( 
    ((endpointInfo) => 'localhost/signalState'), 
    'POST',
    APIActionTypes.SIGNAL_STATE,
    APIActionTypes.SIGNAL_STATE_SUCCESS,
    APIActionTypes.SIGNAL_STATE_FAILURE
)

export const commentAction: (endpointInfo: any, payload: { text: string }) => any
= createAPIActionCreator( 
    ((endpointInfo) => 'localhost/comment'), 
    'POST',
    APIActionTypes.SIGNAL_STATE,
    APIActionTypes.SIGNAL_STATE_SUCCESS,
    APIActionTypes.SIGNAL_STATE_FAILURE
)