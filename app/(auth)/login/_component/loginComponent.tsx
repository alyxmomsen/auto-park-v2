
import React, { Suspense } from 'react'

const LoginComponent = () => {
  return (
      <div>
          <div>login component</div>
          <Suspense fallback={<div>loading..</div> }>  
              <OntherCOmponentn timeout={1000}  />
          </Suspense>
          <Suspense fallback={<div>loading..</div> }>  
              <OntherCOmponentn timeout={4000}  />
          </Suspense>
          <Suspense fallback={<div>loading..</div> }>  
              <OntherCOmponentn timeout={2000}  />
          </Suspense>
    </div>
  )
}

export default LoginComponent


async function OntherCOmponentn({ timeout}:{timeout:number}) {
    await new Promise((res, rej) => {
        setTimeout(() => {
            res('resolved');
        } , timeout);
    })
    return <div>LOADED</div>
}