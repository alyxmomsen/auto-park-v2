'use client';

import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import MyGame from '../..';

interface IGameState {
	canvasContext: CanvasRenderingContext2D | null;
}

interface IContextState {
	gameState: IGameState;
	dispatch: React.Dispatch<any> | null;
}

const gameState: IGameState = {
	canvasContext: null,
};

const UPDATE_CANVAS_CONTEXT = 'UPDATE_CANVAS_CONTEXT';

type Action = {
	type: 'UPDATE_CANVAS_CONTEXT';
	payload: CanvasRenderingContext2D | null;
};

const updateCanvasContext = (ctx: CanvasRenderingContext2D | null): Action => {
	return {
		type: UPDATE_CANVAS_CONTEXT,
		payload: ctx,
	};
};

export const GameGlobalContext = createContext<IContextState>({ gameState, dispatch: null });

const gameReducer = (state: IGameState, action: Action): IGameState => {
	switch (action.type) {
		case UPDATE_CANVAS_CONTEXT:
			return {
				...state,
				canvasContext: action.payload,
			};
		default:
			return state;
	}
};

const Game_1 = () => {
	const [context, setCtx] = useReducer<(state: IGameState, action: any) => IGameState>(gameReducer, gameState);

	const [game, setGame] = useState<MyGame | null>(null);

	useEffect(() => {
		(() => {
			const gameInstance = MyGame.instanceGame();
			gameInstance?.setEnemy();
		})();

		setGame(MyGame.instanceGame());

		if (context.canvasContext && game) {
			window.addEventListener('keydown', (e) => {
				game.keyObserver.setKey(e.key);
			});

			window.addEventListener('keyup', (e) => {
				game.keyObserver.removeKey(e.key);
			});

			const ctx = context.canvasContext;

			const update = () => {
				console.log(`${game.keyObserver.getAllKeys().toLocaleString()}`);

				ctx.fillStyle = 'ghostwhite';
				ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

				game.update();
				game.render(context.canvasContext);

				window.requestAnimationFrame(update);
			};

			window.requestAnimationFrame(update);
		}
	}, [context.canvasContext, game]);

	return (
		<GameGlobalContext.Provider value={{ gameState: context, dispatch: setCtx }}>
			<div>
				<MyCanvas />
			</div>
		</GameGlobalContext.Provider>
	);
};

export default Game_1;

const MyCanvas = () => {
    
	const canvasref = useRef<HTMLCanvasElement>(null);
	const ctx = useContext(GameGlobalContext);

	useEffect(() => {
		const canvasContext = canvasref.current?.getContext('2d');

		if (canvasContext && ctx.dispatch) {
			ctx.dispatch(updateCanvasContext(canvasContext));
		}
	}, []);

    const aspectRatioCoeff = 1080 / 1920; 
    const width = 800;
    const height = width * aspectRatioCoeff;
	return <canvas ref={canvasref} width={width} height={height}></canvas>;
};
