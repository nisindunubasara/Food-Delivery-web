import React from "react";

const Title = ({text}) => {
   return (
      <div className='inline-flex gap-2 items-center mb-3'>
         <p className='text-gray-700 text-2xl font-bold tracking-normal'>{text} </p>
      </div>
   )
}

export default Title