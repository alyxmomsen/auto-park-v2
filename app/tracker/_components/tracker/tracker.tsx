'use client'

import React, { useEffect, useReducer, useState } from 'react';
import TrackerEntity from '../tracker-entity';
import { TextInput } from '../text-input';
import { io, Socket, SocketOptions } from 'socket.io-client';

interface Message {
  Id: string,
  value:string ,
}


interface TrackerState {
  pendingMessages: Message[],
  postedMessages:Message[],
  socket: {
    instance:Socket|null ,
    connection: {
      state: boolean;
    };
    messanger: {
      last: string|undefined;
      all: string[];
    }
  }
}

// type ActionType = 'SET_MESSAGE'|'UPDATE_CONNECTION';

const PUSH_PENDING_MESSAGE = 'PUSH_PENDING_MESSAGE';
const UPDATE_CONNECTION = 'UPDATE_CONNECTION';
const PURGE_PENDING_MESSAGES = 'PURGE_PENDING_MESSAGES';
const UPDATE_POSTED_MESSAGES = 'UPDATE_POSTED_MESSAGES';

export type TrackerAction = {
  type: 'PUSH_PENDING_MESSAGE';
  payload: {
    Id: string,
    value:string ,
  };
} | {
  type: 'UPDATE_CONNECTION';
  payload: {
    instance: Socket | null;
    connection: boolean;
  }
} | {
  type: 'PURGE_PENDING_MESSAGES';
  payload: {Ids:string[]};
}| {
  type: typeof UPDATE_POSTED_MESSAGES;
  payload: {messages:Message[]};
}

export function pushPendingMessage(message:Message):TrackerAction {
  return {
    type: PUSH_PENDING_MESSAGE,
    payload:message ,
  }
}

export function purgePendingMessages(messages:string[]):TrackerAction {
  return {
    type: PURGE_PENDING_MESSAGES,
    payload: {
      Ids:[...messages] ,
    }
  }
}

export function updatePostedMessages(messages:Message[]):TrackerAction {
  return {
    type: UPDATE_POSTED_MESSAGES,
    payload: {messages}
  }
}

const trackerReducer = (state: TrackerState, action: TrackerAction):TrackerState => {
  
  switch (action.type) {
    case UPDATE_POSTED_MESSAGES:
      return {
        ...state,
        postedMessages:[...action.payload.messages] ,
      }
    case PUSH_PENDING_MESSAGE:
      return {
        ...state,
        pendingMessages:[...state.pendingMessages , action.payload],
        socket: {
          ...state.socket,
        }
      }
    case UPDATE_CONNECTION:
      return {
        ...state,
        socket: {
          ...state.socket,
          connection: {
            ...state.socket.connection,
            state:action.payload.connection ,
          },
          instance:action.payload.instance ,

        }
      }
    case PURGE_PENDING_MESSAGES:
      return {
        ...state,
        pendingMessages:[...state.pendingMessages.filter(elem => !(!!action.payload.Ids.find(el => el === elem.Id)))],
      }
    default: return state;
  }

}

const Tracker = () => {

  const weburl = 'http://85.234.106.173:3333/';
  const url = 'http://85.234.106.173:3003/';

  const [trackerState, dispatchTrackerState] = useReducer<(state: TrackerState, action: TrackerAction) => TrackerState>(trackerReducer, {
    pendingMessages: [],
    postedMessages:[] ,
    socket: {
    instance:null ,
    connection: {
      state: false ,
    } ,
    messanger: {
      last: undefined ,
      all: [] ,
    }
  }
} );
  
  useEffect(() => {
    
    const socket = io(url);

    socket.on('connect', () => {
      console.log('socket connected');
      dispatchTrackerState({
        type: 'UPDATE_CONNECTION',
        payload: {
          instance: socket,
          connection:true ,
        } ,
      })
    });

    socket.on('disconnect', () => {
      
      dispatchTrackerState({
        type: 'UPDATE_CONNECTION',
        payload: {
          instance: socket,
          connection:false ,
        }
      });


    });

    socket.on('message report', (payload) => {
      
      console.log({ payload });
      
      dispatchTrackerState(purgePendingMessages(payload));

    });

    socket.on('message_updated', (payload) => {

      dispatchTrackerState(updatePostedMessages([...payload]));

      console.log({update:payload});
    });

  }, []);
  

  useEffect(() => {
    
    if (trackerState.socket.instance) {

      if (trackerState.pendingMessages.length) {
        
        trackerState.socket.instance.emit('message', {
          messages:trackerState.pendingMessages ,
        });
      }

    }


  }, [trackerState.pendingMessages]);
  

  useEffect(() => {

    // console.log({state:trackerState.postedMessages});

  } , [trackerState.postedMessages]);

	return (
		<div>
			<h1>The Tracker</h1>
			<div>
				<TrackerEntity />
        <TextInput dispatch={dispatchTrackerState} readonly={false} />
        <div className={ 'messenger-root' }>
          <div className={'messenger-root__controller'}>
            <div>
            {
              trackerState.socket.connection.state ? 'connected' : 'no connected'
            }
            </div>
            <div>
              {
                trackerState.pendingMessages.map(message => <div><div>{ message.Id }</div><div>{ message.value }</div></div>)
              }
            </div>
          </div>
          <div className={'messenger-root__chat'}>
            {
              trackerState.postedMessages.map(message => <div className={'message'}><div>{ message.value }</div></div>)
              }
          </div>
        </div>

			</div>
		</div>
	);
};

export default Tracker;


function sendMessage(socket:Socket) {
  


}
