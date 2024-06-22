import Link from 'next/link'
import React from 'react'

const HelpPage = () => {
    
    return (
    <div className=''>
        <Link href={'/dashboard'}>to back</Link>
        <div>help page</div>
    </div>
  )
}

export default HelpPage