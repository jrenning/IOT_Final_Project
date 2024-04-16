import React from 'react'

function TypeSummary() {
  return (
    <div className='rounded-md bg-slate-100 py-8 justify-center flex space-x-6'>

        <div className='flex flex-col'>
            <div className='text-2xl font-semibold flex justify-center'>486</div>
            <div>Birds Fed</div>
        </div>

        <div className='flex flex-col'>
            <div className='text-2xl font-semibold flex justify-center'>12</div>
            <div>Squirrels Thwarted</div>
        </div>
    </div>
  )
}

export default TypeSummary