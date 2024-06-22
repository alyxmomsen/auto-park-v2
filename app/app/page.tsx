'use client'

import React, { useEffect, useReducer } from 'react'

interface MainDispatchState {
    data: any;
    context: string;
}

const initialState:MainDispatchState = {
    data: 'foo bar',
    context: 'context context' ,
}


type tData = 'regular'|'modern'


type Action<T , D> = {
    type: T;
    payload: D;
}

const setData = (string:string):Action<string , string> => { 
    return {
        type: 'foo',
        payload:string ,
    }
}


type ActionType = typeof setData;

type ActionCreator<T> = () => Action<string , string>;

const mainReducer = (state: MainDispatchState, action: ReturnType<typeof setData>) => {
    
    switch (action.type) {
        case 'hello':
            return {
                ...state, 
                context:action.payload ,
            }
        default: return state;
    }
}

const App = () => {

    const [state, dispatch] = useReducer(mainReducer, initialState);
    
    useEffect(() => {
        dispatch({
            type: 'hello', 
            payload:'world' ,
        })
    } , []);

    console.log(state.context);

    return (
        <div>
          {state.context}
        </div>
    )
}

export default App