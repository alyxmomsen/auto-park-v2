'use client';

import React, { useState } from 'react';
import { pushPendingMessage, TrackerAction } from '../tracker/tracker';
import { v4 as uuid } from 'uuid'



export const TextInput = ({ readonly = false, text = '' , dispatch }: { readonly?: boolean; text?: string; dispatch:React.Dispatch<TrackerAction> }) => {
    const [state, setState] = useState('');
    
	return (
        <input
            onKeyUp={(e) => {
                if (e.key === 'Enter') {

                    dispatch(pushPendingMessage({
                        Id: uuid(),
                        value:state ,
                    }))
                    setState('');
                }
            }}
			readOnly={readonly}
			disabled={readonly}
			style={{ color: readonly ? 'ghostwhite' : 'black' }}
			onChange={readonly ? (f) => f : (e) => setState(e.currentTarget.value)}
			type='text'
			value={readonly ? text : state}
		/>
	);
};
