import { createAPIActionCreator, fetcher } from "../../utils"

import { Discipline } from '../../models/discipline'

export const ActionTypes = {
    
}

export const APIActionTypes = {
    FETCH_SESSIONS: "SESSION/FETCH_SESSIONS",
    FETCH_SESSIONS_SUCCESS: "SESSION/FETCH_SESSIONS_SUCCESS",
    FETCH_SESSIONS_FAILURE: "SESSION/FETCH_SESSIONS_FAILURE"
}

// export const fetchSessions: (info: { }) => any
// = createAPIActionCreator( 
//     info => "/sessions", 
//     null,
//     'GET',
//     APIActionTypes.FETCH_SESSIONS,
//     APIActionTypes.FETCH_SESSIONS_SUCCESS,
//     APIActionTypes.FETCH_SESSIONS_FAILURE
// )

export function fetchSessions(disciplines: Discipline[]) {
    return dispatch => {
        let resultList = []
        let receivedFetch = 0;
        for(var index=0; index < disciplines.length; index++ ) {
            let currentId = disciplines[index].id
            fetcher('/sessions?discipline=' + currentId )
            .then(res => {
                receivedFetch++;
                resultList.push({
                    fetchResult: res,
                    disciplineId: currentId
                });
                if(receivedFetch==disciplines.length) {
                    dispatch({
                        type: APIActionTypes.FETCH_SESSIONS_SUCCESS,
                        payload: resultList
                    });
                }
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: APIActionTypes.FETCH_SESSIONS_FAILURE,
                    payload: error
                })
            });
        }
    }
}

// export const fetchSessionsWithDiscipline: (info: {
//     disciplineIds: string[]
// }) => any
// = createAPIActionCreator(
//     info => "/sessions",
//     null,
//     'GET",
//     '
// )