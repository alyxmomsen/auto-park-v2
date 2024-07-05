import React from 'react'

import style from './styles/index.module.css';
import Link from 'next/link';

const MainMenu = () => {
  return (
    <div className=''>
          <div className={style.main}>
              <Link className={style.menu__item} href={'/'}>home</Link>
              <Link className={style.menu__item} href={'/login'}>login</Link>
              <Link className={style.menu__item} href={'/registration'}>registration</Link>
              <Link className={style.menu__item} href={'/algorithm'}>algorithm</Link>
              <Link className={style.menu__item} href={'/app'}>app</Link>
              <Link className={style.menu__item} href={'/dashboard'}>dashboard</Link>
              <Link className={style.menu__item} href={'/effector'}>effector</Link>
              <div className={``}>
                <Link className={style.menu__item} href={'/games'}>games</Link>
                <div className={`${style.menu__item} ${style.menu__item_wrapper}`}>
                  <Link href={`/games/game/1`} className={``}>1</Link>
                  <Link href={`/games/game/2`} className={``}>2</Link>
                  <Link href={`/games/game/3`} className={``}>3</Link>
                </div>
              </div>
              <Link className={style.menu__item} href={'/products'}>products</Link>
              <Link className={style.menu__item} href={'/myredux'}>myredux</Link>
              <Link className={style.menu__item} href={'/tracker'}>tracker</Link>
        </div>
    </div>
  )
}

export default MainMenu