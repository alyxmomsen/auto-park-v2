import Link from 'next/link'
import React from 'react'

const layout = ({children}: {children:React.ReactNode}) => {
  return (
      <div>
          <div>
              <Link href={`games/game/1`} className={``}>link</Link>
              <Link href={`games/game/2`} className={``}>link</Link>
              <Link href={`games/game/3`} className={``}>link</Link>
          </div>
          {children}
      </div>
  )
}

export default layout