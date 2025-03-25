import React from 'react'
import s from './Error.module.scss'

const Error = () => {
  return (
<>
<section className={s.error}>
    <div className="container">
       
            <div className={s.wrapp}>
            <img src="/404.png" alt="" />
            <p>The page does not exist or has not created yet</p>
            <button>Back to main page</button>

            </div>
    
    </div>
</section>




</>
  )
}

export default Error