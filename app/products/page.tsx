import axios from 'axios';
import { cookies, headers } from 'next/headers'
import React from 'react'

const Products = () => {
  return (
    <div className={`page-base`}>
      <div className={`product`}>
        <MyImage 
          url='https://i.pinimg.com/564x/22/5e/38/225e387a10c06a4d79e8ccc13de90731.jpg' 
        />
        <MyImage 
          url='https://school.oblakoz.ru/static/media/heart.58d6694822882d2e5d949c258a95f695.svg' 
        />
      </div>
        <h1>Products</h1>
        <div>content</div>
    </div>
  )
}

export default Products


function MyImage ( {url}:{url:string}) {
  return <img 
    className='image-wrapper--flex-container--flex-item'
    src={url}
    alt='no alt' 
    width={200} 
    height={200} 
  />
}