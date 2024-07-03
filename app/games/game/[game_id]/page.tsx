import React from 'react'
import MyGame from '../../_src/_game_1'
import Game_1 from '../../_src/_game_1/_components/_ui'
import { redirect } from 'next/navigation';

const Game = ({params}:{ params:{game_id:string} }) => {

    const { game_id } = params;

    return (
        (game_id === "1") ? (<div><Game_1 /></div>) : redirect('/') 
  )
}

export default Game